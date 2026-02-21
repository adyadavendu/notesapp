# Notes Taking Web App (MERN)

Production-ready Notes app using React (Vite), Node.js/Express, MongoDB/Mongoose, JWT cookie auth, and responsive minimalist UI with dark mode.

## Features

- User signup/login/logout
- JWT authentication with `httpOnly` cookie
- Protected routes (frontend + backend)
- Create/read/update/delete notes
- User-specific notes only
- Search notes (`title` + `content`)
- Note timestamps (`createdAt`, `updatedAt`)
- Minimal, modern, responsive design with dark mode

## Folder Structure

```
notesapp/
├─ docker-compose.yml
├─ notesapp/                 # Frontend (React + Vite)
│  ├─ Dockerfile
│  ├─ nginx.conf
│  ├─ src/
│  │  ├─ api/
│  │  ├─ components/
│  │  ├─ context/
│  │  └─ pages/
│  └─ .env.example
├─ server/                   # Backend (Express + MongoDB)
│  ├─ Dockerfile
│  ├─ src/
│  │  ├─ config/
│  │  ├─ controllers/
│  │  ├─ middleware/
│  │  ├─ models/
│  │  ├─ routes/
│  │  └─ utils/
│  └─ .env.example
└─ README.md
```

## Backend API Routes (Examples)

Base URL: `http://localhost:5000/api`

### Auth

- `POST /auth/signup` - create user
- `POST /auth/login` - login user
- `POST /auth/logout` - logout user
- `GET /auth/me` - get current user (protected)
- `DELETE /auth/account` - delete current user account and notes (protected)

### Notes (Protected)

- `GET /notes` - list current user notes
- `GET /notes?q=meeting` - search current user notes
- `POST /notes` - create note
- `PUT /notes/:id` - update note
- `DELETE /notes/:id` - delete note

## Setup

### 1) Backend

```bash
cd server
cp .env.example .env
```

Update `server/.env` with your values:

- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL` (default `http://localhost:5173`)

Run backend:

```bash
npm run dev
```

### 2) Frontend

```bash
cd notesapp
cp .env.example .env
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Docker (One Command)

From project root:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

Stop services:

```bash
docker compose down
```

Stop services and delete database volume:

```bash
docker compose down -v
```

Important:

- Update `JWT_SECRET` in `docker-compose.yml` before deployment.
- Current compose config is production-style for app containers (`npm start` in backend, built static frontend via Nginx).

## Production Notes

- Cookie auth uses `httpOnly` cookie.
- In production set:
  - `NODE_ENV=production`
  - `CLIENT_URL` to deployed frontend origin
  - HTTPS enabled so `secure` cookie works correctly.
