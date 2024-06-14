const mongoose = require('mongoose')

const { MONGO_URL } = process.env


exports.connect = () => {
    mongoose.connect(MONGO_URL).then(() => {
        console.log("DB CONNECTED SUCCESSFULLY")
    }).catch(err => {
        console.log("DB CONNECTION FAILED")
        console.error(err)
        process.exit(1)
    })
}