# Food App System

Minimal food ordering web app (menu, order, track). Backend: Node.js + Express + MongoDB Atlas. Frontend: Vite + React + TailwindCSS.

## Structure

- `backend/` – REST API (menu, orders, users), seed script, Dockerfile.
- `client/` – Vite React UI with TailwindCSS, Dockerfile.

## Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas connection string

## Backend

```bash
cd backend
cp .env.example .env  # set MONGODB_URI, JWT_SECRET, CLIENT_URL, PORT
npm install
npm run dev           # hot reload
npm start             # production mode
npm run seed          # seed sample menu items
```

## Frontend

```bash
cd client
cp .env.example .env  # set VITE_API_BASE (e.g., http://localhost:5001/api)
npm install
npm run dev           # start Vite dev server
npm run build         # production build
```

## Docker

Backend

```bash
cd backend
docker build -t food-backend .
docker run -p 5001:5001 --env-file .env food-backend
```

Frontend

```bash
cd client
docker build -t food-frontend .
docker run -p 4173:80 --env-file .env food-frontend
```

## API

- `GET /api/menu`
- `POST /api/orders` – create order (customer info + items)
- `GET /api/orders/:id` – fetch single order
- `GET /api/orders?email=...` – list orders by email
- `POST /api/users/register`, `POST /api/users/login` – optional auth, returns JWT

## Notes

- Orders accept optional JWT (Bearer token) to associate with a user, but guests can order without it.
- Tailwind is preconfigured; adjust theme in `tailwind.config.js`.
