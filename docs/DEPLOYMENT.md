# Deployment Guide

## Frontend → Vercel

1. Push `frontend/` to a GitHub repo (or the monorepo root, set root dir to `frontend`).
2. Import the repo in Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`. Output dir: `dist`.
5. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
6. Deploy.

## Backend → Render

1. Push `backend/` to a GitHub repo (or set root dir to `backend` in a monorepo).
2. New Web Service on Render.
3. Build command: `npm install`. Start command: `npm start`.
4. Add environment variables from `backend/.env.example`:
   - `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL`,
     `CLOUDINARY_*`, `SMTP_*`, `NOTIFY_EMAIL`.
5. Set `CLIENT_URL` to your deployed Vercel URL (for CORS).
6. Deploy. Note the resulting URL (e.g. `https://vinayak-api.onrender.com`).
7. Go back to Vercel and set `VITE_API_URL` to `https://vinayak-api.onrender.com/api`, then redeploy frontend.

## Backend → Railway (alternative)

1. New Project → Deploy from GitHub repo → select `backend` folder.
2. Add the same environment variables as above.
3. Railway auto-detects `npm start`. Confirm start command is `node src/server.js`.
4. Deploy and copy the generated public URL into the frontend's `VITE_API_URL`.

## MongoDB Atlas Setup

1. Create a free cluster at https://www.mongodb.com/cloud/atlas.
2. Database Access → add a user with a strong password.
3. Network Access → Add IP Address → Allow Access From Anywhere (`0.0.0.0/0`) for simplicity, or restrict to your hosting provider's IPs.
4. Get the connection string (Drivers → Node.js), replace `<username>`, `<password>`, and add `/portfolio` as the database name.
5. Paste into `MONGO_URI` in your backend `.env`.

## Cloudinary Setup (optional, for image uploads)

1. Create a free account at https://cloudinary.com.
2. Dashboard → copy `Cloud Name`, `API Key`, `API Secret`.
3. Paste into `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

## Gmail SMTP Setup (optional, for contact form email notifications)

1. Enable 2-Step Verification on your Google account.
2. Generate an App Password: Google Account → Security → App Passwords.
3. Use your Gmail address as `SMTP_USER` and the generated app password as `SMTP_PASS`.
4. `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`.

## Seeding the Database

After setting `MONGO_URI` in `backend/.env`, run once:

```bash
cd backend
npm run seed
```

This creates an admin account (see console output for credentials) and sample
projects/skills so the admin panel and API aren't empty on first run.
