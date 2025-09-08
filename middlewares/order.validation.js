const { body } = require("express-validator");

exports.validateOrder = [
  body("userId").notEmpty().withMessage("userId is required"),
  body("items")
    .isArray({ min: 1 })
    .withMessage("items must be a non-empty array"),
    
  body("items.*.productId")
    .isMongoId()
    .withMessage("Each item must have a valid productId"),

  body("items.*.name")
    .notEmpty()
    .withMessage("Each item must have a name"),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("items.*.price")
    .isFloat({ min: 0 })
    .withMessage("Price must be 0 or greater"),

  body("totalAmount")
    .isNumeric()
    .withMessage("totalAmount is required and must be a number"),
];
