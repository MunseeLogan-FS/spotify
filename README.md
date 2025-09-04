# Spotify Project

## Project Overview

This project is a full-stack Spotify-like app using Node.js (Express) for the backend and Svelte + Vite for the frontend. It authenticates users via Spotify OAuth 2.0 and lets them interact with their Spotify account.

**Key Features:**

- Secure OAuth login with Spotify
- RESTful API structure using Express
- Environment variable management for sensitive credentials
- Svelte frontend with Vite proxy for seamless API calls

### Current Features

- **User Dashboard:**
  - Displays your Spotify profile info
  - Shows four sections: My Albums, My Tracks, My Playlists, My Artists (all fetched from the backend via Spotify API)
- **Login Flow:**
  - Login with Spotify and access your content

### Upcoming Features

- **Search Function:** Search for items from Spotify
- **Enhanced User Content:** More details and actions for albums, tracks, playlists, and artists

## Prerequisites

Before running the project, ensure you have:

- **Node.js**: v18 or later
- **npm**: v10 or later
- **Spotify Developer Account**: [Create one here](https://developer.spotify.com/dashboard)
- **MongoDB Compass**: V1.4 or later
- **Docker (optional)**: v28 or later

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MunseeLogan-FS/spotify.git
cd spotify
npm install
```

### 2. .env setup

1. Copy `.env.dist` to `.env`
2. Fill in all variables with your credentials (Spotify client ID/secret, MongoDB URI, etc.)

### Docker (Optional)

You can use Docker to run this app without installing Node.js.

To start the app with Docker:

```bash
docker compose up --build
```

### Local Development (without Docker)

#### Start the backend:

```bash
cd api
npm install
npm run dev
```

#### Start the frontend:

```bash
cd frontend/spotify-app
npm install
npm run dev
```

## Usage

1. Open your browser and go to: `http://127.0.0.1:5173`
2. Click "Login with Spotify" and follow the authentication flow
3. After login, view your albums, tracks, playlists, and artists on the dashboard

## Project Structure

- `api/` - Express backend, handles authentication and Spotify API requests
- `frontend/spotify-app/` - Svelte frontend, displays user content

## Important URLs

- **Frontend:** http://127.0.0.1:5173 || https://myspotapp.netlify.app/
- **Backend API:** http://127.0.0.1:3001 || https://spotify-project-d1c7ecedaee7.herokuapp.com/
- **Database:** http://localhost:27017 || Atlas
- **Deployed App:** https://spotify-project-d1c7ecedaee7.herokuapp.com/ && https://myspotapp.netlify.app/
