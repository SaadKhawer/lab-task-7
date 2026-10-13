# Lab 07 — Book Management REST API

## Overview
A simple REST API developed using **Node.js** and **Express.js** to manage books. It supports CRUD operations and uses JSON for data storage.

## Technologies
- Node.js
- Express.js
- JSON
- Postman

## Installation and Run
1. Open the project folder in VS Code.
2. Install dependencies:
   ```bash
   npm install express
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Open Postman and test:
   `http://localhost:3000/books`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get a book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

## Book Fields
- `id`
- `title`
- `author`
- `price`

## Testing
All endpoints can be tested using Postman. The API validates input and returns appropriate HTTP status codes, such as `200`, `201`, `400`, and `404`.

## Files
- `server.js`
