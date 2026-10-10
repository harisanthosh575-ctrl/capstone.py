# CreatorMarket

CreatorMarket is a Django REST Framework API and React/Vite application for
creators to post jobs and freelancers to browse and apply for them.

## Local setup

Requirements: Python 3.13 or newer, Node.js/npm, and Git.

From the repository root in PowerShell:

```powershell
py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
$env:DEBUG = "True"
$env:SECRET_KEY = (& python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())")
$env:ALLOWED_HOSTS = "localhost,127.0.0.1"
$env:CORS_ALLOWED_ORIGINS = "http://localhost:5173,http://127.0.0.1:5173"
$env:CSRF_TRUSTED_ORIGINS = "http://localhost:5173,http://127.0.0.1:5173"
python manage.py migrate
python manage.py runserver
```

For the frontend, open a second PowerShell window:

```powershell
Set-Location frontend
npm ci
$env:VITE_API_URL = "http://127.0.0.1:8000"
npm run dev
```

Local development uses SQLite when `DATABASE_URL` is unset. Production requires
`DATABASE_URL` and will not fall back to SQLite.

## Environment variables

Copy the variable names from `.env.example` into your local environment or
deployment provider. The example intentionally contains no values or secrets.

| Variable | Purpose |
| --- | --- |
| `SECRET_KEY` | Django signing key; required in production. Generate a unique value and keep it secret. |
| `DEBUG` | Set to `False` in production. |
| `ALLOWED_HOSTS` | Comma-separated backend hostnames, without schemes. |
| `DATABASE_URL` | PostgreSQL connection URL in production; optional locally. |
| `CORS_ALLOWED_ORIGINS` | Comma-separated exact frontend origins, including `https://` in production. |
| `CSRF_TRUSTED_ORIGINS` | Comma-separated trusted browser origins, including `https://` in production. |
| `VITE_API_URL` | Backend base URL baked into the Vite build, with no required trailing slash. Required for production builds. |

The frontend uses credentialed requests and Django session authentication. Keep
the production CORS and CSRF origins limited to the actual frontend URL. Secure
session and CSRF cookies are enabled in production; their `SameSite=None`
setting allows credentialed requests between separately hosted Render services.
CSRF protection remains enabled for unsafe requests.

## Tests and production build

From the repository root:

```powershell
python manage.py test
python manage.py check
python manage.py makemigrations --check --dry-run
```

From `frontend`:

```powershell
npm run lint
$env:VITE_API_URL = "http://127.0.0.1:8000"
npm run build
```

## Render deployment

`render.yaml` defines the Django web service and the static React site. Import
the Blueprint in Render; the blueprint does not enable automatic deploys.
Create a persistent PostgreSQL database in Render and set the backend
`DATABASE_URL` to its **internal** connection URL. Set the backend `SECRET_KEY`
to a newly generated secret in Render's environment settings; do not commit it
or place it in this file.

The blueprint uses these service URLs:

- Frontend: `https://creatormarket-web.onrender.com`
- Backend: `https://creatormarket-api.onrender.com`

Set `DATABASE_URL` and `SECRET_KEY` when Render prompts for the backend's
unsynced environment variables. If Render assigns different service URLs or
you use custom domains, update `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`,
`CSRF_TRUSTED_ORIGINS`, and the frontend `VITE_API_URL` to the exact deployed
hosts before building/deploying. Do not use SQLite for production; its storage
on a Render web service is ephemeral.

The backend build installs requirements, collects static files, and applies
migrations; Gunicorn serves `config.wsgi:application`. The frontend build runs
`npm ci` and `npm run build`, and its rewrite rule supports direct navigation
to React routes.

## Known feature gaps

The dashboard links to `/applications` and `/portfolio`, but the React router
does not currently define those pages. Backend APIs exist for viewing
applications attached to a creator-owned job and for listing/creating a
freelancer's portfolio. There is no frontend integration for either workflow,
and there is no API endpoint for a freelancer-wide “my applications” list.
These links remain visible; completing those workflows requires separate
feature work.