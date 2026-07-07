# 🏨 Hotel Manager System

A Full-Stack Hotel Manager System developed using **React**, **Express.js**, and **SQLite (better-sqlite3)**. This application allows users to manage hotel rooms, guests, and bookings using REST APIs.

---

## 📌 Features

- 🏨 Room Management (CRUD)
- 👤 Guest Management (CRUD)
- 📅 Booking Management (CRUD)
- 💾 SQLite Database
- 🌐 Express REST API
- ⚛️ React Frontend
- 📮 Postman Collection Included
- 📱 Responsive User Interface

---

## 📁 Project Structure

```
Hotel-Manager-System/
│
├── backend/
│   ├── index.js
│   ├── package.json
│   └── data.db
│
├── frontend/
│   ├── App.jsx
│   ├── App.css
│   └── package.json
│
├── postman/
│   ├── Hotel-Manager-System.postman_collection.json
│   └── Hotel-Manager-System.postman_environment.json
│
└── README.md
```

---

# 🚀 Technologies Used

- React.js
- Express.js
- Node.js
- SQLite
- better-sqlite3
- CORS
- REST API
- Postman

---

# ⚙️ Backend Installation

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Required packages:

```bash
npm install express cors better-sqlite3
```

Run the server:

```bash
node index.js
```

Server runs at:

```
http://localhost:5000
```

---

# ⚙️ Frontend Installation

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React:

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

# 🗄 Database Tables

## Rooms

| Field | Type |
|-------|------|
| id | INTEGER |
| roomNumber | TEXT |
| type | TEXT |
| price | REAL |
| status | TEXT |

---

## Guests

| Field | Type |
|-------|------|
| id | INTEGER |
| name | TEXT |
| phone | TEXT |

---

## Bookings

| Field | Type |
|-------|------|
| id | INTEGER |
| guestId | INTEGER |
| roomId | INTEGER |
| checkIn | TEXT |
| checkOut | TEXT |

---

# 📡 API Endpoints

## Rooms

| Method | Endpoint |
|---------|----------|
| GET | /rooms |
| GET | /rooms/:id |
| POST | /rooms |
| PUT | /rooms/:id |
| DELETE | /rooms/:id |

---

## Guests

| Method | Endpoint |
|---------|----------|
| GET | /guests |
| GET | /guests/:id |
| POST | /guests |
| PUT | /guests/:id |
| DELETE | /guests/:id |

---

## Bookings

| Method | Endpoint |
|---------|----------|
| GET | /bookings |
| GET | /bookings/:id |
| POST | /bookings |
| PUT | /bookings/:id |
| DELETE | /bookings/:id |

---

# 📮 Testing API

Import the following files into Postman:

- Hotel-Manager-System.postman_collection.json
- Hotel-Manager-System.postman_environment.json

Test all CRUD operations for:

- Rooms
- Guests
- Bookings

---

# ▶️ Running the Project

### Start Backend

```bash
cd backend
node index.js
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Open your browser:

```
http://localhost:5173
```

---

# 📸 Project Screenshots

Add screenshots here after running the project.

Example:

- Home Page
- Rooms Management
- Guests Management
- Bookings Management

---

# 👩‍💻 Author

**Vidyashri Hosur**

---

# 📄 License

This project is created for educational purposes and learning Full-Stack Development.
