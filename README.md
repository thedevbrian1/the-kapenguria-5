# Mazingira 360

Mazingira 360 is a full-stack web application built with React and React Router for reporting environmental incidents and tracking user actions towards conservation. It features a complete authentication system, a user dashboard, and server-side rendering.

## Features

-   **Full-Stack with React Router**: Modern React Router with file-based routing, data loaders, and actions.
-   **Server-Side Rendering (SSR)**: Fast initial page loads and improved SEO.
-   **User Authentication**: Secure user login and session management powered by [Supabase](https://supabase.com/).
-   **Dashboard**: A dedicated dashboard for users to view their profile, actions, and reports.
-   **Incident Reporting**: A complete form for users to report environmental incidents with details and evidence uploads.
-   **Modern Styling**: Styled with [Tailwind CSS](https://tailwindcss.com/) for a utility-first approach.
-   **Type-Safe**: Written entirely in [TypeScript](https://www.typescriptlang.org/).

## Tech Stack

-   **Framework**: [React Router](https://reactrouter.com/)
-   **UI Library**: [React](https://react.dev/)
-   **Backend & Auth**: [Supabase](https://supabase.com/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Language**: TypeScript

## Getting Started

### 1. Prerequisites

-   Node.js (v18 or higher)
-   npm
-   A Supabase account for database and authentication.

### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone <your-repository-url>
cd the-kapenguria-5
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
