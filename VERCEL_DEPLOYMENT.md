# 🚀 Deploying Tech Gallery 2027 to Vercel

This repository is pre-configured so that **both the React frontend and the FastAPI backend are hosted together on Vercel**, connecting directly to your **Supabase PostgreSQL database**. No separate backend server (like Render, Railway, or VPS) is required.

---

## 📁 How the Unified Vercel Setup Works

- **Frontend**: Built from `frontend/` into `frontend/dist` via Vite, served globally across Vercel's Edge CDN.
- **Backend API**: Serverless Python FastAPI functions executed via `api/index.py` on AWS Lambda under the hood.
- **Database**: Cloud PostgreSQL hosted on **Supabase** (Mumbai region `ap-south-1`).
- **Routing**: `vercel.json` automatically routes `/api/*` requests to the Python serverless function and all other routes to the React SPA (`index.html`).

---

## ⚡ Step-by-Step Vercel Deployment

### Step 1: Push Code to GitHub / GitLab / Bitbucket
Ensure your latest changes are pushed to your Git repository:
```bash
git add .
git commit -m "Configure unified Vercel deployment with Supabase"
git push origin main
```

### Step 2: Import into Vercel
1. Log in to [vercel.com](https://vercel.com).
2. Click **"Add New..."** -> **"Project"**.
3. Select your Git repository and click **Import**.
4. Leave **Root Directory** as `./` (the root of the repo).
5. Vercel will automatically read `vercel.json` and detect:
   - Build Command: `npm --prefix frontend install && npm --prefix frontend run build`
   - Output Directory: `frontend/dist`

### Step 3: Add Environment Variables in Vercel
Before clicking **Deploy**, open the **Environment Variables** section in the Vercel dashboard and add the following keys:

| Key | Value | Description |
|---|---|---|
| `DATABASE_URL` | `postgresql+psycopg2://postgres.enpoeroxfzkzfnitdgmn:Swamiswami01@aws-0-ap-south-1.pooler.supabase.com:5432/postgres` | Supabase pooled PostgreSQL URL |
| `SUPABASE_URL` | `https://enpoeroxfzkzfnitdgmn.supabase.co` | Supabase Project URL |
| `SUPABASE_KEY` | `sb_publishable_mOkB3Z6Cz0qaHiVm1x7XCg_nB3Nh1JL` | Supabase Anon / Publishable Key |
| `ADMIN_EMAIL` | `admin@techgallery2027.edu` | Master Admin Login Email |
| `ADMIN_PASSWORD` | `admintech2027` | Master Admin Login Password |
| `JWT_SECRET` | `techgallery2027_super_secure_jwt_secret_key_change_in_production` | JWT signing secret |

*(Optional)* You can also add frontend environment variables for Vite if needed:
- `VITE_SUPABASE_URL`: `https://enpoeroxfzkzfnitdgmn.supabase.co`
- `VITE_SUPABASE_ANON_KEY`: `sb_publishable_mOkB3Z6Cz0qaHiVm1x7XCg_nB3Nh1JL`

### Step 4: Click Deploy!
Vercel will build the frontend assets, bundle the Python serverless functions, and generate your live production URL (e.g. `https://techgallery2027.vercel.app`).

---

## 🛠 Local Development
To run everything locally:
1. **Backend**:
   ```bash
   python -u backend/run.py
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   The local Vite dev server proxies `/api` calls directly to `http://localhost:8000`.
