# Smart Campus Management System

A MERN stack app with role-based access (student / faculty / admin), notices, and a complaint tracking system.

## Folder Structure

```
smart-campus-management-system/
├── backend/
│   ├── config/db.js
│   ├── controllers/        (business logic)
│   ├── middleware/auth.js  (JWT verification + role guard)
│   ├── models/              (Mongoose schemas)
│   ├── routes/               (Express routers)
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js          (pre-configured axios instance)
    │   ├── context/AuthContext.jsx (global login state)
    │   ├── components/            (Navbar, ProtectedRoute)
    │   ├── pages/                 (Login, Register, StudentDashboard, AdminDashboard)
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 1. Install prerequisites

- **Node.js + npm** — download the LTS version from https://nodejs.org. Verify with:
  ```
  node -v
  npm -v
  ```
- **MongoDB** — two options:
  - **MongoDB Atlas (recommended, no local install)**: create a free cluster at https://www.mongodb.com/cloud/atlas, create a database user, whitelist your IP (or 0.0.0.0/0 for hackathon convenience), and copy the connection string.
  - **Local MongoDB**: install from https://www.mongodb.com/try/download/community and run `mongod` in a terminal to start it.
- **Editor**: VS Code (https://code.visualstudio.com) — install the extensions "ES7+ React/Redux/React-Native snippets" and "MongoDB for VS Code" for convenience.

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` — your Atlas connection string, or `mongodb://127.0.0.1:27017/smart_campus` for local
- `JWT_SECRET` — any long random string

Run it:
```bash
npm run dev
```
Server starts on `http://localhost:5000`. You should see "MongoDB connected" and "Server running on port 5000" in the terminal.

## 3. Frontend setup

Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
App runs on `http://localhost:5173`. It's already configured to call the backend at `http://localhost:5000/api`.

## 4. Try it out

1. Go to `http://localhost:5173/register`, create an account with role "admin"
2. Log out, register a second account with role "student"
3. Log in as admin → post a notice, view complaints once the student raises one
4. Log in as student → see the notice, raise a complaint, watch its status

## API Reference

| Method | Route | Access | Description |
|---|---|---|---|
| POST | /api/auth/register | Public | Create account |
| POST | /api/auth/login | Public | Login, returns JWT |
| GET | /api/notices | Logged in | List notices |
| POST | /api/notices | Admin | Create notice |
| DELETE | /api/notices/:id | Admin | Delete notice |
| GET | /api/complaints | Logged in | List complaints (own, or all if admin) |
| POST | /api/complaints | Student/Faculty | Raise a complaint |
| PATCH | /api/complaints/:id/status | Admin | Update complaint status |
| GET | /api/complaints/stats | Admin | Counts for dashboard |

## Notes

- Passwords are hashed with bcrypt before storage — never stored in plain text.
- JWT is stored in `localStorage` on the frontend and attached to every request automatically via the axios interceptor in `src/api/axios.js`.
- This is intentionally a "basic but complete" build matching the hackathon scope — extend from here (e.g. add a Faculty-specific view, deep analytics) if time allows.
