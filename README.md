# ShopCart Server

This repository contains the server-side code for the ShopCart project. The server is built using Express.js and establishes connections to MongoDB.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Connection to MongoDB](#connection-to-mongodb)
3. [Main Server](#main-server)
4. [Routes](#routes)
5. [Frontend File](#frontend-file)


## Technologies Used

- **Server:**
  - Express.js
  - MongoDB
  - Cors (Cross-Origin Resource Sharing)

## Connection to MongoDB

The `Controller` directory contains a `connection.js` file that establishes a connection to the MongoDB database for the ShopCart project.

## Main Server

The `server.js` file is the main server script. It sets up an Express.js server, establishes middleware, and listens for incoming requests.

## Routes

The `route` directory contains separate files for different routes:

- `user.js`: Manages user-related operations.
- `product.js`: Handles product-related operations.
- `cart.js`: Manages shopping cart functionality.
- `order.js`: Deals with order-related operations.

Each route file encapsulates the logic for handling requests related to its respective domain.

## Technologies Used

- **Server:**
  - Express.js
  - MongoDB
  - Cors (Cross-Origin Resource Sharing)

## Frontend File

The Frontend file is hosted separately on GitHub. You can find it [https://github.com/Jeniya14/Shopcart-fullstack-project](https://github.com/Jeniya14/Shopcart-fullstack-project).

Feel free to explore the code and contribute to the project!
