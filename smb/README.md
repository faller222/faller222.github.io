# JWT Authentication API

A simple Node.js API with JWT authentication using Express.

## Features

- User login with JWT token generation
- Protected routes that require valid JWT token
- Token validation middleware

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret_key_here
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. API Endpoints:

   - **Login**: `POST /api/auth/login`
     ```json
     {
       "username": "user1",
       "password": "password1"
     }
     ```
     Response:
     ```json
     {
       "token": "your_jwt_token"
     }
     ```

   - **Access Protected Route**: `GET /api/protected`
     Headers:
     ```
     x-auth-token: your_jwt_token
     ```
     Response:
     ```json
     {
       "message": "You have access to protected data",
       "userId": 1,
       "timestamp": "2023-01-01T00:00:00.000Z"
     }
     ```

   - **Get User Profile**: `GET /api/protected/profile`
     Headers:
     ```
     x-auth-token: your_jwt_token
     ```
     Response:
     ```json
     {
       "id": 1,
       "username": "user1",
       "email": "user1@example.com",
       "role": "user"
     }
     ```

## Testing with Postman or cURL

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "user1", "password": "password1"}'
```

### Access Protected Route
```bash
curl -X GET http://localhost:3000/api/protected \
  -H "x-auth-token: your_jwt_token"
```

### Get User Profile
```bash
curl -X GET http://localhost:3000/api/protected/profile \
  -H "x-auth-token: your_jwt_token"
``` 