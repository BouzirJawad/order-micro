# Order Microservice

This microservice handles **orders** for the e-commerce platform. It is **fully decoupled** from Cart and Product services. All data about items and total amounts are expected to be passed from the API Gateway or orchestrator.

---

## Project Structure

```bash
order-service/
├── config/
│ └── db.js # MongoDB connection
├── controllers/
│ └── order.controller.js # CRUD logic for orders
├── models/
│ └── Order.js # Order schema
├── routes/
│ └── order.routes.js # API routes
├── middlewares/
│ └── validation.middleware.js # Express validator error handler
├── validators/
│ └── orderValidator.js # Validation rules for orders
├── .env
├── package.json
└── server.js
```

---

## Features
  - Create new orders
  - Get all orders
  - Get order by ID
  - Get orders for a specific user
  - Update order status
  - Delete order

> **Note:** This service does **not** fetch Cart or Product data directly. It expects the API Gateway to send fully prepared order data.

---

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Validator
- dotenv

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/BouzirJawad/order-micro.git
cd order-micro
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file based on .env.example:
```bash
PORT=ur-choice
MONGO_URI=mongodb://localhost:27017/name-of-ur-choice
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

1. Create Order
```bash
URL: POST /api/orders
```

Body:
```bash
{
  "userId": "string",
  "items": [
    {
      "productId": "string",
      "name": "string",
      "price": 0,
      "quantity": 1
    }
  ],
  "totalAmount": 100
}
```

Success Response: 201 Created
```bash
{
  "message": "Order created successfully",
  "order": { ... }
}
```

2. Get All Orders
```bash
URL: GET /api/orders
```

Success Response: 200 OK
```bash
[
  { ... },
  { ... }
]
```

3. Get Order By ID
```bash
URL: GET /api/orders/:orderId
```

Success Response: 200 OK

```bash
{
  "_id": "orderId",
  "userId": "string",
  "items": [...],
  "totalAmount": 100,
  "status": "pending",
  "createdAt": "...",
  "updatedAt": "..."
}
```

4. Get Orders for a User
```bash
URL: GET /api/orders/user/:userId
```

Success Response: 200 OK
```
[
  { ... },
  { ... }
]
```

5. Update Order Status
```bash
URL: PUT /api/orders/:orderId/status
```

Body:
```bash
{
  "status": "shipped"
}
```

Success Response: 200 OK
```bash
{
  "message": "Order status updated",
  "order": { ... }
}
```
6. Delete Order
```bash
URL: DELETE /api/orders/:orderId
```

Success Response: 200 OK
```bash
{
  "message": "Order deleted"
}
```

Notes

The service is fully decoupled. It does not communicate directly with Cart or Product services.

For creating orders, the API Gateway or orchestrator must provide:

items array

totalAmount

userId (or guestId if supporting guests)

--- 

📧 Author

Jawad Bouzir
Full Stack JavaScript Developer
