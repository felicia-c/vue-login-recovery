
# 🚀 Vue.js Authentication System with MongoDB Backend

## 🛠 Technologies

- **Frontend:**
    - [Vue.js](https://vuejs.org/)
    - [Vue Router](https://router.vuejs.org/)
    - [Axios](https://axios-http.com/)

- **Backend:**
    - [Node.js](https://nodejs.org/)
    - [Express.js](https://expressjs.com/)
    - [MongoDB](https://www.mongodb.com/)
    - [Mongoose](https://mongoosejs.com/)
    - [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)
    - [JSON Web Token (JWT)](https://jwt.io/)
    - [nodemailer](https://nodemailer.com/)

## 📝 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/) (v4.x or later)

### Install Dependencies
#### Backend
Navigate to the backend directory and install the required dependencies:
```
cd backend
npm install
```
#### Frontend
Navigate to the frontend directory and install the required dependencies:
```
cd frontend
yarn
or
npm install
```
### Configure Environment Variables
Create a .env file in the root directory and configure the following environment variables:
```
# Development environment variables
VUE_APP_BASE_URL=http://localhost:3000/

# MongoDB connection string
VUE_APP_MONGODB_URI=mongodb://localhost:27017/vue-auth

# JWT secret key
VUE_APP_JWT_SECRET=your_jwt_secret

# Server port
VUE_APP_PORT=3000

#Password reset email
VUE_APP_PASSWORD_RESET_SENDER=passwordreset@yourdomain.com

#Nodemailer credentials (mail client account credentials)
VUE_APP_EMAIL_SERVICE='Gmail'
VUE_APP_YOUR_EMAIL=your-email@gmail.com
VUE_APP_YOUR_EMAIL_PWD=your-email-password
```
### Start the Application
#### Start the Backend Server
```
cd backend
npm start
```
#### Start the Frontend Development Server
```
cd frontend
npm run serve
```
## Access the Application

### Frontend
http://localhost:8080
### Backend
http://localhost:3000


## 🤝 Contributing
Contributions are welcome! 
If you have any improvements or fixes, feel free to submit a pull request or open an issue.