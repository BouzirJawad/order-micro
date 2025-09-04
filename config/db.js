const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(()=> console.log("Cart-Manager connected"))
    } catch (error) {
        console.log("Error connecting Order database", error)
    }
}

module.exports = connectDB