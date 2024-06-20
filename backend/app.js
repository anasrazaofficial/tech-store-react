require('dotenv').config()
require('./config/database').connect()

const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const Cart = require('./model/cart')
const Order = require('./model/order')
const Product = require('./model/product')
const User = require('./model/user')
const auth = require('./middleware/auth')

const { PORT, SECRET_KEY } = process.env

const app = express()

app.use(express.json())
app.use(cookieParser())

// User routes
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
            { user_id: user._id, userName, email },
            SECRET_KEY,
            { expiresIn: "24h" }
        );
        user.token = token;
        user.password = undefined;

        res.cookie('token', token, {
            expires: new Date(Date.now() + (5 * 24 * 60 * 60)),
            httpOnly: true
        });

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
    }
});

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

        let token = jwt.sign({ user_id: user._id, userName, email: user.email },
            SECRET_KEY,
            { expiresIn: "24h" }
        )
        user.token = token
        user.password = undefined

        res.cookie('token', token, {
            expires: new Date(Date.now() + (5 * 24 * 60 * 60)),
            httpOnly: true
        })

        return res.status(200).json(user)
    } catch (error) {
        console.error(error);
    }
})



// Product routes
app.get('/products', async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).send(product)
    } catch (error) {
        console.log(error);
    }
})

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



// Cart Routes
app.post('/addToCart', async (req, res) => {
    try {
        const { products } = req.body
        if (!products) {
            return res.status(404).send("Product not found")
        }

        let existingProduct = await Cart.find({})
        console.log(existingProduct);
        if (existingProduct.length == 1) {
            await Cart.deleteMany({})
        }

        const cart = await Cart.create({ products })
        return res.status(200).send("Product added to cart successfully\n" + cart)
    } catch (error) {
        console.log(error);
    }
})



// Orders
app.post('/placeOrder', auth, async (req, res) => {
    try {
        const { userId, products, amount, paymentMethod } = req.body
        if (!(userId, products, amount, paymentMethod)) {
            return res.status(401).send("All fields are required")
        }

        const order = await Order.create({
            userId: req.user.user_id,
            products, amount, paymentMethod
        })

        await Cart.deleteMany({})
        res.status(200).send("Order has been placed successfully\n" + order)
    } catch (error) {
        console.log(error);
    }

})


app.listen(PORT, () => console.log(`Server is Listening on ${PORT}`))