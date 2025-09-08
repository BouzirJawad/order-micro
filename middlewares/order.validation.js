const { body } = require("express-validator")

exports.validateProduct = [
    body("userId").notEmpty().withMessage("userId is required"),
    body("items").isArray({ min: 1 }).withMessage("items must be a non-empty array"),
    body("totalAmount").isNumeric().withMessage("totalAmount is required and must be a number"),
]