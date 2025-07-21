# 🎬 Cinetechnuru: Movie Recommendation App

Welcome to **Cinetechnuru**, a full-featured movie recommendation platform where you can discover, search, and save your favorite movies!

## 🚀 Live Demo

- **Frontend:** [cinetechnuru.vercel.app](https://cinetechnuru.vercel.app)
- **Backend API:** [cinetechnuru.onrender.com](https://cinetechnuru.onrender.com)

---

## 📌 Objective

Cinetechnuru enables users to:

- Discover, search, and view movie details
- Save favorite movies and build watchlists
- Register, log in, and manage profiles

---

## 🧑‍💻 Core Features

### User Authentication

- User registration and login
- Secure password handling (bcrypt)
- JWT token-based authentication

### Movie Discovery

- Search by title, genre, or year
- Filter by rating, release date, and popularity
- View detailed movie information
- Get personalized recommendations

### User Features

- Save favorite movies
- Create custom watchlists
- Rate and review movies
- Manage user profile

---

## 🛠 Technical Stack

- **Frontend:** React (with modern UI components)
- **Backend:** Express.js (RESTful API)
- **Database:** MongoDB (via Mongoose)
- **External API:** TMDB (The Movie Database)
- **Authentication:** JWT (JSON Web Tokens)
- **Responsive Design:** Mobile & Desktop support
- **Deployment:**
  - Frontend: Vercel
  - Backend: Render

---

## 📦 Project Structure

```
cinetechnuru/
├── frontend/      # React app
├── backend/       # Express.js API
└── README.md
```

---

## 🏁 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB database (local or cloud)
- TMDB API key

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cinetechnuru.git
cd cinetechnuru
```

### 2. Setup Backend

```bash
cd backend
npm install
# Create a .env file with your MongoDB URI, JWT secret, and TMDB API key
npm start
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
# Create a .env file with your backend API URL
npm start
```

---

## ☁️ Deployment

- **Frontend:** [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
- **Backend:** [Render](https://render.com) or [Heroku](https://heroku.com)
- Optionally set up a CI/CD pipeline for automated deployments.

---

## 📅 Timeline

| Week | Focus                              |
| ---- | ---------------------------------- |
| 14   | Setup & Basic Features             |
| 15   | Advanced Features & Authentication |
| 16   | Polish UI & Fullstack Deployment   |

---

## 🎯 Stretch Goals

- Movie trailer integration

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is for educational purposes as part of the 3MTT Capstone Project.

---

## 🙏 Acknowledgements

- [TMDB API](https://www.themoviedb.org/documentation/api)
- [React](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Vercel](https://vercel.com/)
- [Render](https://render.com/)

---

Enjoy discovering movies with Cinetechnuru! 🎥🍿
