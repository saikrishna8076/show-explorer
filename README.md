# 🎬 Show Explorer

A responsive TV show discovery web application built with **React, TypeScript, Vite, and Tailwind CSS**.

Show Explorer allows users to search and discover TV shows, explore detailed information, filter shows by genre, and save their favorite shows for later.

## 🌐 Live Demo

**[Visit Show Explorer](https://show-explorer-snowy.vercel.app/)**

## ✨ Features

- 🔍 Search TV shows
- 🎭 Filter shows by genre
- ⭐ Display show ratings
- 🖼️ Show poster images
- 📄 View detailed information about shows
- ❤️ Add shows to Favorites
- 💔 Remove shows from Favorites
- 💾 Persist Favorites using browser LocalStorage
- 🔢 Display the number of saved Favorites in the navbar
- 📱 Responsive design for desktop and mobile
- ⚡ Fast production build with Vite
- 🧭 Client-side navigation with React Router

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Data

- TVMaze API

### State & Storage

- React Context API
- React Hooks
- Browser LocalStorage

### Deployment & Version Control

- Git
- GitHub
- Vercel

## 🔌 API

Show data is provided by the **TVMaze API**.

https://www.tvmaze.com/api

The application fetches show information dynamically from the API, including:

- Show name
- Poster
- Rating
- Genres
- Language
- Status
- Premiered date
- Runtime
- Summary

## 📂 Project Structure

```text
show-explorer/
│
├── public/
│   └── favicon.svg
│
├── src/
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ShowCard.tsx
│   │   └── ShowCardSkeleton.tsx
│   │
│   ├── context/
│   │   └── FavoritesContext.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Discover.tsx
│   │   ├── Favorites.tsx
│   │   ├── ShowDetails.tsx
│   │   └── About.tsx
│   │
│   ├── utils/
│   │   └── favorites.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── README.md
