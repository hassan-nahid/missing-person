# ManusherKhoj

ManusherKhoj is a web-based platform designed to help people find missing individuals efficiently. The platform allows users to report missing persons, provide updates, and share relevant information to assist in reunification efforts.

## Live Website

🔗 [ManusherKhoj Live](https://manusherkhoj.vercel.app/)

## Features

- **User Authentication**: Secure login and registration system.
- **Post Missing Person Reports**: Users can submit details about missing individuals.
- **Search Functionality**: Easily search for missing persons by name, location, or other criteria.
- **Real-time Updates**: Users can update or comment on reported cases.
- **Responsive Design**: Fully optimized for mobile and desktop devices.
- **Admin Panel**: Manage reports and users effectively.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Hosting**: Vercel

## Installation

To run the project locally, follow these steps:

### Prerequisites

- Node.js installed
- MongoDB database setup

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/hassan-nahid/manusherkhoj.git
   cd manusherkhoj
   ```
2. Set up environment variables:
   Create a `.env` file and add the required variables (e.g., database URI, JWT secret, etc.).

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```

### Dashboard Setup

1. Navigate to the dashboard directory:
   ```bash
   cd dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dashboard server:
   ```bash
   npm run dev
   ```

## Project Structure

### Frontend

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.7.9",
    "cloudinary": "^2.5.1",
    "firebase": "^11.1.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-firebase-hooks": "^5.1.1",
    "react-hot-toast": "^2.5.1",
    "react-icons": "^5.4.0",
    "react-router-dom": "^7.1.1",
    "sweetalert2": "^11.15.10"
  }
}
```

### Backend

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.9.5",
    "nodemon": "^3.1.9"
  }
}
```

### Dashboard

```json
{
  "name": "dashboard",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.7.9",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hot-toast": "^2.5.1",
    "react-icons": "^5.4.0",
    "react-router-dom": "^7.1.3",
    "sweetalert2": "^11.15.10"
  }
}
```

## Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or support, reach out to:

- **Developer**: Hassan Nahid
- **Email**: [scientisthassannahid@gmail.com](mailto:scientisthassannahid@gmail.com)

