Ticket Booking API
A robust ticket booking system built with Node.js, Express, TypeScript, and PostgreSQL. The API provides functionality for user management, ticket creation, and seat reservations with automatic expiration.
🚀 Features

User Management: User registration and authentication
Ticket Management: Create and fetch tickets for events
Seat Booking: Reserve specific seats with duplicate prevention
Automatic Expiration: Pending bookings automatically expire after 2 minutes
Concurrent Booking Protection: Prevents double-booking with database transactions
Input Validation: Comprehensive validation using Zod schemas
JWT Authentication: Secure API endpoints with JWT tokens

🛠️ Technology Stack

Backend: Node.js with Express.js
Language: TypeScript
Database: PostgreSQL with Sequelize ORM
Validation: Zod
Authentication: JWT (JSON Web Tokens)
Job Scheduling: Node-cron
UUID Generation: uuid v4

📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v16 or higher)
PostgreSQL (v12 or higher)
npm or yarn package manager

Postman Collection
You can find the Postman collection for testing the API [here](https://documenter.getpostman.com/view/29411191/2sB2x3oYuZ).


