# Trinetra AI — Deployment Guide

## 0. What was wrong before this could be deployed

Four contributors' work had not actually been merged into one working system.
Specifically:

1. **Two competing backends existed.** `backend/app/` had real SQLAlchemy
   models, CRUD functions, and Pydantic schemas — but its `main.py`, every
   file in `api/`, `auth/`, `middleware/`, and `services/` were empty (0
   bytes), so none of it was ever wired up or runnable. Meanwhile
   `backend/backend/` was a second, separate FastAPI app with working routes,
   but it only returned hardcoded in-memory data (nothing was ever saved to
   a database) and duplicated the same endpoints under different logic.
   Running both would conflict — **this has been removed** in favor of
   finishing `backend/app/`, which is the one with real persistence.
2. **No `requirements.txt`, `Dockerfile`, or `.env.example` existed for the
   backend at all**, and the database URL was hardcoded with a plaintext
   password (`postgresql+psycopg://postgres:Trinetra%40123@localhost...`).
3. **The frontend's API base URL was hardcoded** to `http://127.0.0.1:8000`,
   which only works on a developer's own machine.
4. **The root `.gitignore` was UTF-16 encoded** and didn't exclude `.env`
   files, risking committed secrets.
5. The AI model's `.env.example` was also corrupted (UTF-16), and its
   pinned `requirements.txt` versions are unusually new — verify they
   resolve at install time (see step 4).

All of the above has been fixed directly in this repo (see the diff / new
files). What follows is how to actually deploy the result.

## 1. Architecture

```
ai-model (Python/YOLO/OpenCV) --POST /incidents--> backend (FastAPI + Postgres) <--fetch--> frontend (TanStack Start/Vite)
                                                          |
                                                          +--webhook--> automation (n8n: email/SMS alerts)
```

- **frontend/** — TanStack Start (React 19, Vite, Nitro). Talks to the
  backend over HTTP using `VITE_API_BASE_URL`.
- **backend/app/** — FastAPI + SQLAlchemy + Postgres. Exposes `/schools`,
  `/cameras`, `/users`, `/incidents`, `/login`, `/analytics`. Also accepts
  the AI model's existing flat incident payload directly (no AI-side
  changes needed).
- **ai-model/** — YOLO/mediapipe/Roboflow-based detector that posts
  incidents to the backend via `alert_client.py`.
- **automation/** — n8n workflow JSON for email/SMS alerting.

## 2. Deploy the backend (FastAPI + Postgres)

Pick a host that gives you a managed Postgres instance and a place to run a
container/Python process — **Render**, **Railway**, or **Fly.io** are the
least fiddly for a student/small-team project.

### Using Render (or Railway — steps are nearly identical)

1. Push this repo to GitHub (with the fixes already applied).
2. Create a **Postgres** instance on the platform. Copy the connection
   string it gives you (Render/Railway both provide one already in
   `postgresql://user:pass@host:port/db` form — just change the prefix to
   `postgresql+psycopg://` for SQLAlchemy+psycopg3).
3. Create a **Web Service** pointing at this repo, root directory
   `backend/`. It will detect the `Dockerfile` automatically (or, without
   Docker, set build command `pip install -r requirements.txt` and start
   command `uvicorn app.main:app --host 0.0.0.0 --port $PORT`).
4. Set environment variables on the service:
   - `DATABASE_URL` = the connection string from step 2
   - `JWT_SECRET` = a long random string (`python -c "import secrets; print(secrets.token_hex(32))"`)
   - `CORS_ORIGINS` = your frontend's deployed URL (add it after step 3 of
     the frontend section, then redeploy)
   - `N8N_WEBHOOK_URL` = leave blank for now; fill in once you've done step
     5 below and redeploy
5. Deploy. Tables are created automatically on startup (`init_db()` in
   `app/main.py`). Visit `https://<your-backend>/docs` to confirm the
   interactive API docs load.

### Local test before deploying

```bash
cd backend
cp .env.example .env      # edit DATABASE_URL if not using the compose stack
docker compose -f ../docker-compose.yml up --build
# backend now on http://localhost:8000, Postgres on localhost:5432
```

## 3. Deploy the frontend

The project is a TanStack Start app pre-configured (via
`@lovable.dev/vite-tanstack-config`) to build for **Cloudflare** by default.

1. In `frontend/`, create `.env` from `.env.example` and set
   `VITE_API_BASE_URL` to your deployed backend URL from step 2.
2. **Cloudflare Pages** (matches the existing build target, least config):
   - Connect the repo in the Cloudflare dashboard, set root directory to
     `frontend`, build command `npm run build`, output directory per
     Nitro's Cloudflare preset (`dist/` or `.output/public` — check the
     build log the first time; Cloudflare Pages auto-detects it for Nitro
     projects in most cases).
   - Add `VITE_API_BASE_URL` as an environment variable in the Pages
     project settings.
3. **Alternative — Vercel/Netlify:** also works, but you'll likely need to
   change the Nitro preset in `vite.config.ts` (`tanstackStart.server`)
   to `vercel` or `netlify` respectively, since it currently targets
   Cloudflare's worker runtime.
4. Once deployed, copy the frontend's URL into the backend's
   `CORS_ORIGINS` env var (step 2.4) and redeploy the backend so browser
   requests aren't blocked.

## 4. Deploy the AI model

This is a Python CV pipeline (YOLO/mediapipe/Roboflow inference), not a web
service — it needs a machine with a camera/RTSP feed or video files, ideally
with a GPU for real-time performance (it will run on CPU, just slower).

1. Provision a VM (a small GPU instance, or even a CPU box for
   lower-throughput use) — e.g. an AWS EC2/GCP Compute Engine instance, or
   simply the on-premises machine connected to the cameras.
2. ```bash
   cd ai-model
   python3 -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   ```
   If any pinned version fails to resolve, relax that one line (e.g. drop
   the `==` pin) and reinstall — the versions in this file look unusually
   recent and should be spot-checked against what's actually on PyPI at
   deploy time.
3. `cp .env.example .env` and fill in:
   - `ROBOFLOW_API_KEY` — from your Roboflow account
   - `BACKEND_INCIDENT_URL` — your deployed backend's `/incidents` URL,
     e.g. `https://<your-backend>/incidents`
4. Run against a camera stream or video file:
   ```bash
   python src/main_detector.py --source rtsp://<camera-ip>/stream --camera "Main Gate" --no-show
   ```
5. For always-on production use, run it as a `systemd` service (or a Docker
   container) on the edge machine so it restarts automatically, e.g.:
   ```ini
   # /etc/systemd/system/trinetra-detector.service
   [Unit]
   Description=Trinetra AI Detector
   After=network.target

   [Service]
   WorkingDirectory=/opt/trinetra/ai-model
   EnvironmentFile=/opt/trinetra/ai-model/.env
   ExecStart=/opt/trinetra/ai-model/.venv/bin/python src/main_detector.py --source rtsp://camera-ip/stream --camera "Main Gate" --no-show
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

## 5. Deploy the automation (n8n)

1. Use **n8n Cloud** (fastest) or self-host with `docker run n8nio/n8n`.
2. Import `automation/My workflow.json` via n8n's **Import Workflow**.
3. Configure the Gmail OAuth2 (and any SMS) credentials the workflow
   references, then **activate** the workflow — n8n will show you the
   production webhook URL for the "Webhook" node.
4. Set that URL as `N8N_WEBHOOK_URL` on the backend service (step 2.4) and
   redeploy. `backend/app/api/incident.py` now POSTs
   `{"alert", "location", "severity"}` to it automatically whenever a new
   incident is created — matching exactly what the workflow's Webhook node
   expects — so no further code changes are needed here.

## 6. Post-deploy checklist

- [ ] Backend `/docs` loads and `/` returns `{"message": "Trinetra backend is running!"}`
- [ ] Frontend loads and successfully calls the backend (check the browser
      network tab for CORS errors — fix by updating `CORS_ORIGINS`)
- [ ] Posting a test incident (`curl -X POST .../incidents -d '{...}'`)
      appears via `GET /incidents`
- [ ] AI model's `.env` points at the live backend URL, not localhost
- [ ] n8n workflow is active and its credentials are filled in
- [ ] No `.env` files were committed to git (`git status` should show them
      ignored)
