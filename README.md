
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
Create a .env file in the backend directory and configure the following environment variables:
```
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/vue-auth

# JWT secret key
JWT_SECRET=your_jwt_secret

# Server port
PORT=3000
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