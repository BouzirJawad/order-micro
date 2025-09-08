const express = require("express")
const connectDB = require("./config/db")
const orderRoutes = require("./routes/order.routes")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 7465

app.use(express.json())

connectDB()

app.use("/api/orders", orderRoutes)

app.listen(PORT, ()=> {
    console.log(`Order micro-service is running on port ${PORT}`)
})