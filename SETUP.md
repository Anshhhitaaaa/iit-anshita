# IITR Finance App - Setup Instructions

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

## Setup Instructions

### 1. Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd server
npm install
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The app will connect to `mongodb://localhost:27017/iitr-finance`

#### Option B: MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a cluster
3. Get your connection string
4. Update the `MONGODB_URI` in `server/server.js` or create a `.env` file in the server directory

### 3. Environment Variables (Optional)

Create a `.env` file in the `server` directory with:
```
MONGODB_URI=mongodb://localhost:27017/iitr-finance
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d
PORT=5003
NODE_ENV=development
```

### 4. Start the Application

#### Start Backend Server
```bash
cd server
npm run dev
```
The server will run on `http://localhost:5003`

#### Start Frontend (in a new terminal)
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

## Authentication Flow

### For Non-Authenticated Users:
- Can access: Landing Page, About Us, Contact Us
- Can access: Login and Sign Up pages
- Will be redirected to Dashboard after successful login/signup

### For Authenticated Users:
- Can access: All pages (Dashboard, Add Transaction, Forecast, Goals, Profile)
- Can access: About Us, Contact Us (public pages)
- Will be redirected to Dashboard if trying to access Login/Signup
- Can access Profile by clicking on their name/user icon in navbar
- Can logout from the navbar

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

## Features Implemented

✅ MongoDB connection with Mongoose
✅ JWT-based authentication
✅ Password hashing with bcrypt
✅ Protected routes
✅ Authentication context
✅ Conditional navigation
✅ User registration and login
✅ Automatic token management
✅ Logout functionality
✅ Profile page with user information

## Testing the Authentication

1. Start both frontend and backend servers
2. Navigate to `http://localhost:5173`
3. Try to access `/dashboard` - should redirect to login
4. Create a new account via `/signup`
5. Login with your credentials
6. Access protected routes like `/dashboard`
7. Test logout functionality
