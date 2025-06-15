# Todo App Backend (User-Based, Authenticated with JWT, WIP)

This is the backend for my Todo app — it’s still a work in progress, but I wanted to put it out there.

## 🚀 Main idea:

- Users can sign up and log in
- Users can add their own todos
- JWT implementation for stateless tokens and secure authentication
- Use of MongoDB to store the users information
- Basically to implement full stack todo app which is not limited to frontend.

---

## 🎯 What it does right now

- Users can **sign up** and **sign in**
- Authenticated users can **add todos** of their own
- Authenticated users can **fetch their own todos** only
- Handles some errors, like if the DB connection fails or if someone tries to sign up with an email that already exists

---

## 😮‍💨 What I struggled with (and fixed, kinda)

- Signing up with same email twice crashed my whole server — now I catch that with `try...catch` blocks
- MongoDB connection errors sometimes happen (bad credentials, etc),so I made sure the HTTP server only starts **after** the database is connected
- Learning JWT for authentication and `Authenticated EP` protection was a bit difficult task but it’s totally worth it.
