# 🔗 Full Stack URL Shortener

A production-ready **full stack URL shortener** built using the MERN stack with performance optimizations like Redis caching and robust features such as authentication, analytics, and rate limiting.


## 🚀 Features

### 🔐 Authentication

* User Registration & Login
* JWT-based authentication
* Protected routes

### ✂️ URL Shortening

* Generate short URLs using **nanoid**
* Optional custom short links (if implemented)
* URL expiry support

### ⚡ Performance Optimization

* Redis caching for ultra-fast redirects
* Reduced database load

### 📊 Analytics

* Click tracking (async)
* Dashboard showing:

  * Total clicks
  * Created links

### 🛡️ Security & Stability

* Rate limiting to prevent abuse
* Secure environment variables handling

---

## 🧱 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Redis
* JWT (Authentication)
* nanoid

### Frontend

* React (Vite)
* Context API (Auth state management)
* Axios (API calls)

---


## 🛠️ Installation & Setup

### 1. Clone the repository

```
git clone <your-repo-url>
cd url_shortener
```

### 2. Setup Backend

```
cd BACKEND
npm install
npm run dev
```

### 3. Setup Frontend

```
cd FRONTEND
npm install
npm run dev
```

---

## 🌐 API Endpoints (Sample)

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### URL

* `POST /api/url/shorten`
* `GET /:shortId` → Redirect
* `GET /api/url/user` → User dashboard links

---

## 📌 Key Highlights

* 🚀 Redis caching drastically improves redirect speed
* 🔄 Async click tracking ensures fast response time
* 🔐 Secure JWT authentication system
* 📊 Real-time dashboard insights
* 🛡️ Rate limiting protects backend from abuse


## 👨‍💻 Author

Built as a full-stack learning project with production-level practices.

---

## ⭐️ Show your support

If you found this project useful, consider giving it a ⭐ on GitHub!
