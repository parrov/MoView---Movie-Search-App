# 🎬 MoView — Movie Search App

MoView is a modern and responsive movie search application that allows users to discover, explore, and save their favorite movies in real time.

Built with a focus on performance, UX, and clean architecture, this project demonstrates real-world frontend techniques such as state management, API optimization, and scalable UI patterns.

---

## 🚀 Live Demo

👉 

---

## ✨ Features

- 🔍 **Real-time Movie Search**
  - Search movies instantly using TMDb API
  - Debounced input to reduce API calls

- 🎞️ **Movie Details**
  - View overview, rating, release date, and runtime
  - Watch official trailers (YouTube integration)

- ⭐ **Favorites System**
  - Add/remove movies from favorites
  - Persisted using localStorage

- 🔄 **Infinite Scroll**
  - Seamless pagination with Intersection Observer

- ⚡ **Optimized API Calls**
  - Request cancellation (AbortController)
  - In-memory caching
  - Deduplication of concurrent requests

- 🎨 **Modern UI/UX**
  - Skeleton loading (Netflix-style)
  - Smooth animations and transitions
  - Responsive design

- 🎛️ **Filtering & Sorting**
  - Sort by title (A–Z / Z–A)
  - Filter by rating and release date

- ⬆️ **Scroll Progress + Back to Top**
  - Persistent floating button with scroll progress indicator

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript
- **State Management:** Zustand
- **Styling:** TailwindCSS
- **HTTP Client:** Axios
- **API:** TMDb (The Movie Database)
- **Routing:** React Router
- **Icons:** Heroicons

---

## 🧠 Architecture Highlights

This project follows a modular and scalable structure:


### Key Patterns Used:

- Global state with Zustand
- Service layer for API abstraction
- Schema validation for API responses
- Separation of concerns (UI vs logic)

---

## ⚙️ Installation

# Clone the repository
git clone https://github.com/parrov/MoView---Movie-Search-App.git

# Navigate into the project
cd MoView---Movie-Search-App

# Install dependencies
npm install

# Run development server
npm run dev
