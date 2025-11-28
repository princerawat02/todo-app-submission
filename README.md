# Full Stack Todo Assignment — Submission README

This repository implements a full-stack Todo app (React + TypeScript front-end and Express + TypeScript back-end) built to meet the assignment requirements. The content below is concise and covers the key details needed for running, testing, and submitting the project.

## Required features (implemented)

- User management with JWT authentication: signup, sign-in, logout
- Forgot / Reset password
- Todo management: create, update, list, delete, toggle complete
- Proper backend error handling and logging to MongoDB

## Backend requirements and notes

- Language: TypeScript only (no compiled JS source committed)
- Framework: Express
- DB: MongoDB (Atlas or local) via Mongoose
- Auth: JWT stored in cookies
- Error logs: saved to a `logs` collection in MongoDB

Server packages (main): `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `cookie-parser`, `dotenv`, `ts-node-dev`

Env variables (create `server/.env`):

- `MONGO_URI` (required)
- `JWT_SECRET` (recommended)
- `PORT` (optional, default `4000`)

Default CORS origin used in dev: `http://localhost:5173`

## Frontend requirements and notes

- Language: TypeScript + React (no plain JS files)
- Routing: `react-router-dom`
- Global state: `zustand`
- Data fetching: `@tanstack/react-query` with `zod` schemas
- Forms: `react-hook-form` + `@hookform/resolvers`

Key client packages (main): `react`, `react-dom`, `vite`, `@tanstack/react-query`, `zod`, `react-hook-form`, `zustand`, `axios`, `tailwindcss`

Client files to check: `client/src/api/*`, `client/src/pages/*`, `client/src/store/*`

## Install & run (short)

From repository root:

```bash
# client
cd client
pnpm install
pnpm run dev

# server (new terminal)
cd server
pnpm install
# create server/.env with MONGO_URI and JWT_SECRET
pnpm run dev
```

Ports: client `5173`, server `4000` (defaults)

