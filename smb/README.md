# SMB Gestion

A Node.js application for managing user data, images, and authentication with a PostgreSQL database. This application provides a secure API for user management and image tracking.

## Features

- **User Authentication**: Secure login system with JWT token generation
- **Database Integration**: PostgreSQL database for storing user data, login history, and images
- **RESTful API**: Well-structured API endpoints for user and image management
- **Responsive UI**: Bootstrap-based responsive interface for both desktop and mobile
- **Heroku Deployment**: Configured for easy deployment to Heroku

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **HTTP Client**: Axios
- **Encryption**: CryptoJS
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Deployment**: Heroku

## Project Structure

```
smb/
├── config/           # Configuration files
│   └── database.js   # Database connection setup
├── daos/             # Data Access Objects
├── middleware/       # Express middleware
├── public/           # Static files
├── routes/           # API routes
│   ├── auth.js       # Authentication routes
│   └── user.js       # User management routes
├── scripts/          # Utility scripts
│   └── init-db.js    # Database initialization
├── services/         # Business logic
├── utils/            # Utility functions
├── .env              # Environment variables
├── DDL.sql           # Database schema
├── DEPLOY.md         # Deployment guide
├── Procfile          # Heroku process file
├── package.json      # Project dependencies
└── server.js         # Main application entry point
```

## Database Schema

The application uses three main tables:

1. **Users**
   - id (Primary Key)
   - email (Unique)
   - hash (Password hash)

2. **Logins**
   - id (Primary Key)
   - userId (Foreign Key)
   - timestamp

3. **Images**
   - id (Primary Key)
   - userId (Foreign Key)
   - url
   - isActivePost (Boolean)

## API Endpoints

### Authentication
- `POST /login` - Authenticate user and return JWT token
  - Request: `{ email, password }`
  - Response: `{ token }`

### User Management
- `GET /api/user` - Get user information with associated images and login history
  - Headers: `{ Authorization: Bearer <token> }`
  - Response: User data with images and login history

- `PUT /api/user/image/:id` - Update image status
  - Headers: `{ Authorization: Bearer <token> }`
  - Request: `{ url, isActivePost }`
  - Response: Updated image data

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- Git

### Local Development

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd smb
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret_key_here
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=smb_db
   ```

4. Initialize the database
   ```bash
   npm run init-db
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

### Using Docker

You can also run the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

Data is persisted using a named volume: `smb_postgres_data`

## Deployment

This application is configured for deployment to Heroku. See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions.

Quick deployment:
```bash
./deploy.sh
```

## Authentication Flow

1. User submits login credentials
2. Server authenticates with external service
3. If authentication is successful:
   - Check if user exists in database
   - If not, create a new user
   - Record login timestamp
   - Generate and return JWT token
4. If authentication fails, return appropriate error

## UI Features

- Responsive design for mobile, tablet, and desktop
- Image grid layout (1 column on mobile, 3 on tablets, 6 on desktop)
- Bootstrap styling for consistent UI
- Login history displayed in formatted date/time (YYYY/MM/DD HH:MM:SS)

## Development Status

- [x] User authentication system
- [x] Database integration
- [x] API endpoints
- [x] Responsive UI
- [x] Heroku deployment configuration
- [x] SSL database connection
- [ ] Advanced image management features
- [ ] User profile customization

## License

ISC 