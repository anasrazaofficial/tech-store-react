require('dotenv').config()
require('./config/database').connect()

const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { createTransport } = require('nodemailer')

const Cart = require('./model/cart')
const Order = require('./model/order')
const Product = require('./model/product')
const User = require('./model/user')
const auth = require('./middleware/auth')

const { PORT, SECRET_KEY, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

/// User routes

//Sign up
app.post('/signup', async (req, res) => {
    try {
        const { name, email, phoneNumber, userName, dob, address, password } = req.body;
        if (!(name && email && phoneNumber && userName && dob && address && password)) {
            return res.status(400).send("Any field is missing or invalid");
        }

        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(409).send("User already exists");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        let user = await User.create({
            name, email, phoneNumber, userName, dob, address,
            password: encryptedPassword
        });

        const token = jwt.sign(
            { user_id: user._id, userName, email, loyaltyPoints: user.loyaltyPoints },
            SECRET_KEY,
            { expiresIn: "30d" }
        );
        user.token = token;
        user.password = undefined;

        res.cookie('token', token, {
            expires: new Date(Date.now() + (30 * 24 * 60 * 60)),
            httpOnly: true
        });

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body
        if (!(userName && password)) {
            return res.status(401).send("All fields are required")
        }

        let user = await User.findOne({ userName })
        if (!user) {
            return res.status(401).send("User not found")
        }

        let passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).send("Invalid password")
        }

        let token = jwt.sign(
            { user_id: user._id, userName, email: user.email, loyaltyPoints: user.loyaltyPoints },
            SECRET_KEY,
            { expiresIn: "30d" }
        )
        user.token = token
        user.password = undefined

        res.cookie('token', token, {
            expires: new Date(Date.now() + (30 * 24 * 60 * 60)),
            httpOnly: true
        })


        return res.status(200).json(user)
    } catch (error) {
        console.error(error);
    }
})

// Get a specific user by passing token in the headers
app.get('/user', auth, (req, res) => {
    if (req.user) {
        return res.status(200).send(req.user)
    }
    return res.status(401).send("Sign in required")
})

// To update loyalty points of an existing user at placing order 
app.put('/user/:id', auth, async (req, res) => {
    let { loyaltyPoints } = req.body
    const id = req.params.id
    if (!id) {
        return res.status(404).send("User id not found")
    } else if (!loyaltyPoints) {
        return res.status(404).send("Loyalty Points not found")
    }

    await User.findByIdAndUpdate(id, { loyaltyPoints }, { new: true });
    return res.status(200).send("User has been updated")

})

// Get token
app.get('/token', async (req, res) => res.status(200).send(req.cookies.token))

// Forgot password
app.get('/forgetPassword', async (req, res) => {
    const { userName } = req.body
    if (!userName) {
        return res.status(404).send("Please enter your Username")
    }

    const user = await User.find({ userName })

    let otp = ""
    for (let i = 0; i < 6; i++) {
        const random = Math.floor((Math.random() * 10))
        otp += random
    }

    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: EMAIL_USERNAME,
        to: user?.email,
        subject: 'Your One-Time Password (OTP)',
        text: `Dear [User's Name],\n\tYou have requested to reset your password for your account with Tech Store. Please use the following one-time password (OTP) to proceed with the password reset process:\n${otp}\nThis OTP is valid for a single use and expires after a short period. Please do not share this OTP with anyone.\n\tIf you did not request a password reset, please ignore this email. Your account security is important to us.\n\nThank you,\nTech Store Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send(error);
        } else {
            res.send('Email sent: ' + info.response);
        }
    });
})




/// Product routes

// Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).send(products)
    } catch (error) {
        console.log(error);
    }
})

// Get product by id in query params (htt.../product?id=1251asf114v140)
app.get('/product', async (req, res) => {
    try {
        const id = req.query.id
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).send("Product not found")
        }

        return res.status(200).send(product)
    } catch (error) {
        console.log(error);
    }
})




/// Cart Routes

// Add to cart
app.post('/addToCart', async (req, res) => {
    try {
        const { products } = req.body
        if (products?.length === 0) {
            return res.status(404).send("No products were found in your cart")
        }

        let existingProduct = await Cart.find({})
        if (existingProduct.length == 1) {
            await Cart.deleteMany({})
        }

        const cart = await Cart.create({ products })
        return res.status(200).send("Product added to cart successfully")
    } catch (error) {
        console.log(error);
    }
})

// Get all the cart products
app.get('/cart', async (req, res) => {
    try {
        const cart = await Cart.find({})
        if (cart.length == 0) {
            return res.status(404).send("Cart is empty")
        }
        return res.status(200).send(cart)
    } catch (error) {
        console.log(error);
    }
})

app.delete('/logout', async (req, res) => {
    await Cart.deleteMany({})
    res.status(200).send("Cart has been cleaned successfully")
})




/// Orders

// Place order
app.post('/placeOrder', auth, async (req, res) => {
    try {
        const { userId, products, amount, paymentMethod } = req.body
        if (!(userId, products, amount, paymentMethod)) {
            return res.status(401).send("All fields are required")
        }

        await Order.create({
            userId: req.user.user_id,
            products, amount, paymentMethod
        })

        await Cart.deleteMany({})
        res.status(200).send("Order has been placed successfully")
    } catch (error) {
        console.log(error);
    }

})


app.listen(PORT, () => console.log(`Server is Listening on ${PORT}`))