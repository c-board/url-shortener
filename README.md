
# URL Shortener

A modern URL shortening service built with React, TypeScript, and Express. Features a clean UI using shadcn/ui components and a PostgreSQL database for URL storage.

## Features

- Shorten long URLs into manageable links
- Copy shortened URLs with one click
- Mobile-responsive design
- Real-time validation and error handling
- Modern, clean UI using shadcn/ui components

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui components
- Axios for API calls

### Backend

- Express.js
- PostgreSQL
- Node.js
- nanoid for URL generation

## Project Structure

📦 url-shortener

├── fe/                   # Frontend application

│   ├── src/

│   │   ├── components/   # React components

│   │   ├── lib/          # Utility functions

│   │   └── app/          # Page components

│   └── package.json

│

└── api/                  # Backend application

   ├── src/

   │   ├── controllers/  # Request handlers

   │   ├── routes/       # API routes

   │   └── db.ts         # Database configuration
    
   └── package.json
