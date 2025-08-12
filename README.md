# Spotify Project

## Project Overview

Spotify is a Node.js application that uses the Spotify Web API to authenticate users via OAuth 2.0 and allow them to interact with their Spotify account.  
The project demonstrates:

- Secure OAuth login with Spotify
- Environment variable management for sensitive credentials
- RESTful API structure using Express

## Prerequisites

Before running the project, ensure you have:

- **Node.js**: v18 or later
- **npm**: v16 or later
- **Spotify Developer Account**: [Create one here](https://developer.spotify.com/dashboard)
- **Docker(optional)**: v20 or later

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MunseeLogan-FS/spotify.git
cd spotify
```

### 2. .env setup

1. Change the .env.dist file to .env
2. fill in all varibales with the appropriate information

### Docker (Optional)

You can use Docker to run this app without installing Node.js.

To start the app with Docker:

1. Install Docker on your computer.
2. Run this command in the project folder:

```bash
 docker compose up --build
```

### without docker(local machhine)

To start the server run:

```bash
npm run dev
```

## Links

Here are some important URLs related to the project when running locally:

<!-- - **Frontend (if applicable):** http://localhost:3000 -->

- **Backend API:** http://localhost:3001 (or the port your Express app runs on)

- **Deployed App** https://spotify-project-d1c7ecedaee7.herokuapp.com/
