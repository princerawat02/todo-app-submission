# Todo Submission

This repository contains a small full-stack Todo application split into two folders: `client` (a Vite + React + TypeScript front-end) and `server` (an Express + TypeScript API). The README explains how to install, configure, and run the project locally.

**Contents**

- `client/` — Vite + React TypeScript app (UI, pages, API client)
- `server/` — Express TypeScript API (authentication, todos, MongoDB)

## Features

- User authentication (signup, login, logout)
- Create, read, update, delete todos
- Toggle todo completion
- Password reset endpoints (forgot / reset)

## Tech stack

- Client: Vite, React, TypeScript, Tailwind (UI components)
- Server: Node.js, Express, TypeScript, Mongoose, JWT
- Database: MongoDB (external instance or local)

## Prerequisites

- Node.js (v16 or newer recommended)
- pnpm installed globally (recommended) — or use `npm`/`yarn` if you prefer
- A MongoDB connection string (MongoDB Atlas or local)

## Environment variables

Server (create a `.env` file in `server/`):

- `MONGO_URI` — MongoDB connection string (required)
- `JWT_SECRET` — secret used to sign JWTs (recommended)
- `PORT` — port to run the server (defaults to `4000`)
- `NODE_ENV` — set to `production` in prod environments

Client:

- The client is a Vite app. If you need environment variables for the client, use `VITE_*` prefixed names in a `.env` file inside `client/`.

Note: The server uses CORS with origin `http://localhost:5173` by default.

## Install

Install dependencies for both projects. From the repository root run:

```bash
cd client
pnpm install

cd ../server
pnpm install
```

If you don't use `pnpm`, run `npm install` or `yarn` in each folder.

## Run (development)

Start the server and client in separate terminals.

Server (in `server/`):

```bash
pnpm run dev
```

This uses `ts-node-dev` to run the TypeScript server with automatic reload. The server will start on `http://localhost:4000` by default.

Client (in `client/`):

```bash
pnpm run dev
```

Vite will serve the client on `http://localhost:5173` by default. The client is configured to talk to the server at `http://localhost:4000` (CORS and API client expect that origin).


After building, serve the built client assets from a static host or integrate them with the server if you add static hosting.

## API Endpoints (overview)

Base path: `/api`

Auth (`/api/auth`):

- `POST /signup` — create a new account
- `POST /login` — login and receive auth cookie/token
- `POST /logout` — clear auth cookie
- `POST /forgot` — request password reset
- `POST /reset/:token` — reset password using token
- `GET /me` — return current user (requires auth)

Todos (`/api/todos`) — all protected by authentication middleware:

- `GET /api/todos/` — list todos for the authenticated user
- `POST /api/todos/` — create a new todo
- `PUT /api/todos/:id` — update an existing todo
- `DELETE /api/todos/:id` — delete a todo
- `PATCH /api/todos/:id/toggle` — toggle completion state

There is also a simple root route on the server at `/` that responds with a health message.

## Database

Provide a valid `MONGO_URI` pointing to a MongoDB instance. The server will refuse to start if `MONGO_URI` is missing.

