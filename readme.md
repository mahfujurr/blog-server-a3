# Assignment-3: Blog Project

## Live URL

[Live Application] (https://blog-server-a3.vercel.app/)

---

## Overview

This project is a backend for a blogging platform featuring role-based access control, secure authentication, and a public API for blog management. Users can create, update, and delete blogs, while Admins have additional capabilities to manage users and their blogs.

---

## Features

### User Roles

- **Admin:**
  - Delete any blog.
  - Block users.
  - Cannot update blogs.
- **User:**
  - Register and log in.
  - Create, update, and delete their blogs.

### Blog Management

- Public API to fetch blogs with search, sort, and filter capabilities.
- Secure CRUD operations for blog posts.

### Authentication & Authorization

- JWT-based authentication.
- Role-based access control to restrict actions based on user roles.

---

## Technologies Used

- **Backend:** Node.js with Express.js.
- **Database:** MongoDB with Mongoose.
- **Validation:** Zod for schema validation.
- **Language:** TypeScript for strong typing and scalability.

---

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   NODE_ENV=development
   PORT=5001
   BCRYPT_SALT=10
   DATABASE_URL=MongodbURL
   DEFAULT_PASSWORD=p123456
   JWT_ACCESS_SECRET=secret
   JWT_REFRESH_SECRET=secret
   JWT_ACCESS_EXPIRES_IN=1d
   JWT_REFRESH_EXPIRES_IN=30d
   ```

4. **Run the server:**

   ```bash
   npm run start:dev
   ```

5. **Access the application:**
   - Open [http://localhost:5001](http://localhost:5001) in your browser or API client.

---

## API Endpoints

### **Authentication Routes:**

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register a new user.   |
| POST   | `/api/auth/login`    | Login and get a token. |

### **Blog Routes:**

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| POST   | `/api/blogs`     | Create a new blog.        |
| PATCH  | `/api/blogs/:id` | Update a blog by ID.      |
| DELETE | `/api/blogs/:id` | Delete a blog by ID.      |
| GET    | `/api/blogs`     | Fetch all blogs (public). |

### **Admin Routes:**

| Method | Endpoint                     | Description            |
| ------ | ---------------------------- | ---------------------- |
| PATCH  | `/api/admin/users/:id/block` | Block a user by ID.    |
| DELETE | `/api/admin/blogs/:id`       | Delete any blog by ID. |

---
