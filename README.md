# GunOrNot Backend

This is the backend application for the GunOrNot project. It is built using Node.js and Express.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: You need to have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm is the package manager for Node.js. It is installed automatically with Node.js.
- **MongoDB**: You need to have MongoDB installed and running. You can download it from [mongodb.com](https://www.mongodb.com/).

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kezdetphia/gunornot-back
   cd gunornot-back
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the App

To run the app in development mode, use the following command:
bash
node server.js
npm start

This will start the server using `nodemon`, which will automatically reload the server if you make changes to the code.

## Project Structure

Here is an overview of the project's structure:

├── src/ # Source code
│ ├── controllers/ # Controller modules
│ ├── models/ # Mongoose models
│ ├── routes/ # Route definitions
│ ├── middleware/ # Middleware functions
│ ├── utils/ # Utility functions
│ ├── app.js # Main app file
│ └── ... # Other files
├── .gitignore # Git ignore file
├── package.json # npm package configuration
├── README.md # Project documentation
└── ... # Other files

## Environment Variables

To run the app, you need to set up a `.env` file in the root directory of the project. This file should contain the following environment variables:

```
MONGO_URI=<your-mongodb-uri>
PORT=<your-port>
JWT_SECRET=<your-jwt-secret>
```

Replace `<your-mongodb-uri>`, `<your-port>`, and `<your-jwt-secret>` with your MongoDB connection URI, the port number you want the server to run on, and your JWT secret key, respectively.

Example `.env` file:
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
PORT=3001
JWT_SECRET=your_jwt_secret_key
