<div align="center">

<img src="./client/src/assets/PulseAskIcon.svg" alt="PulseAsk logo" width="110" />

# PulseAsk

**A peer-to-peer platform where medical knowledge meets community care.**

Ask. Answer. Earn trust. Help someone in need — one question at a time.

[![TypeScript](https://img.shields.io/badge/TypeScript-84.5%25-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)
[![Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-8E75B2?style=flat-square&logo=googlegemini&logoColor=white)](https://ai.google.dev/)

### 🌐 [**Live at pulseask.vercel.app →**](https://pulseask.vercel.app)

</div>

---

## 🌟 What is PulseAsk?

**PulseAsk** is a Stack Overflow-style Q&A platform, purpose-built for **medical knowledge sharing**. It's a place where patients, caregivers, students, and practitioners can ask health-related questions, get answers from a community of peers, and build reputation through genuine, helpful contribution — all wrapped in a real-time, richly interactive experience.

It isn't just a forum. It's a small ecosystem: questions carry AI-generated tags, good answers are rewarded with reputation and rank, users can chat directly with one another, send each other money as a token of gratitude through an in-app wallet, and stay in the loop with live notifications — all built on a modern, fully typed full-stack architecture.

---

## ✨ Feature Highlights

### 🧠 Ask & Answer, the Smart Way

- **Rich-text Q&A editor** powered by **Tiptap**, supporting formatting, images, links, and underline/color styling for detailed, readable medical questions and answers.
- **AI-powered tag generation** — every question is analyzed by **Google's Gemini 2.5 Flash** model, which extracts up to 7 precise, medically-relevant tags automatically, so knowledge stays organized and discoverable without manual tagging effort.
- **Voting system** for both questions and answers, driving the best, most trustworthy information to the top.
- **Comments** for clarifying discussions right where the context lives.

### 🏆 Reputation & Leaderboard

A carefully tuned point system rewards genuine participation and community trust:

| Action | Reputation Impact |
|---|---|
| Ask a question | +1 |
| Post a comment | +1 |
| Post an answer | +2 |
| Question gets upvoted | +4 |
| Answer gets upvoted | +5 |
| Question gets downvoted | −2 |
| Answer gets downvoted | −3 |

These scores feed a live **Leaderboard**, turning helpfulness into recognition.

<table>
<tr>
<td valign="top" width="50%">

### 💬 Real-Time Chat

Built on **Socket.IO** for instant, private peer-to-peer support:

- Direct messaging between any two users
- Persistent **contact lists** & full conversation history
- **Unread message counts** per conversation
- Live **presence tracking** (online status & last-seen)

</td>
<td valign="top" width="50%">

### 🔔 Live Notifications

An **event-driven** system that keeps everyone in the loop instantly:

- Custom internal event emitter + Socket.IO under the hood
- Instant alerts for votes, answers, and comments
- Real-time message notifications
- Zero refresh required — updates just appear

</td>
</tr>
<tr>
<td valign="top" width="50%">

### 💰 In-App Wallet & Payments

Turning gratitude into real support:

- Built-in **wallet** with live balance tracking
- Full **transaction history** for every transfer
- Send & receive funds between users
- Real payment processing via **Razorpay**

</td>
<td valign="top" width="50%">

### 🔖 Bookmarks & Search

Never lose a good answer:

- **Save questions** for later with one click
- Dedicated **search** across questions & tags
- Quickly resurface saved content anytime

</td>
</tr>
<tr>
<td valign="top" width="50%">

### 👤 Profiles & Settings

A full identity for every contributor:

- Reputation, questions asked & answers given at a glance
- Upvote / downvote history
- Social links on public profiles
- Settings for account, payments & privacy

</td>
<td valign="top" width="50%">

### 🔐 Secure Authentication

Security-first from the ground up:

- **JWT**-based sessions with secure cookies
- **bcrypt**-hashed credentials
- Email verification & recovery via **Nodemailer**
- **Helmet**-hardened HTTP headers

</td>
</tr>
</table>

### 🖼️ Media Handling

Seamless image uploads — question attachments, profile pictures, and more — powered by **Cloudinary**, with client-side image compression to keep everything fast and lightweight.

---

## 🏗️ Architecture

PulseAsk follows a clean **client–server** separation, each half independently structured and fully typed in TypeScript.

```
pulseAsk/
├── client/                 # React 19 + TypeScript SPA (Vite)
│   └── src/
│       ├── api/            # Axios-based API layer, one module per domain
│       ├── components/     # Reusable UI (common + layout)
│       ├── context/        # React context providers
│       ├── hooks/          # Custom hooks
│       ├── pages/          # Feature pages (Auth, Home, Chat, Wallet, Profile...)
│       ├── routes/         # Route definitions
│       ├── services/       # Client-side business logic
│       ├── store/          # Redux Toolkit state
│       ├── theme/          # Light/dark theming
│       ├── types/          # Shared TypeScript types
│       └── utils/          # Helpers
│
├── server/                 # Node.js + Express 5 REST + Socket API
│   └── src/
│       ├── config/         # DB, Cloudinary, mail, env, logger config
│       ├── constants/      # Status codes & shared constants
│       ├── controllers/    # Route handlers, one per domain
│       ├── emitter/        # Internal app-wide event emitter
│       ├── listeners/      # Event listeners (e.g. reputation, notifications)
│       ├── middlewares/    # Auth, validation, error handling
│       ├── models/         # Mongoose schemas
│       ├── routes/         # Express routers
│       ├── services/       # Core business logic
│       ├── socket/         # Socket.IO namespaces (chat, notifications)
│       ├── types/          # Shared TypeScript types
│       ├── utils/          # Helpers
│       └── validations/    # Request payload validation
│
├── DBModel.json                    # Exported database schema
├── PulseAsk Database Model.pdf     # Visual ER diagram of the data model
└── reputation_policy.md            # Reputation scoring rules
```

This event-driven backend design — where actions like votes and answers emit internal events consumed by dedicated listeners — keeps reputation updates, notifications, and side effects cleanly decoupled from core request handling.

---

## 🧰 Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### Frontend (`/client`)

- **React 19** + **TypeScript**
- **Vite 7** — build tooling
- **Redux Toolkit** + **React Redux** — state management
- **React Router v7** — routing
- **Tiptap** — rich-text editor
- **Socket.IO Client** — real-time chat & notifications
- **Axios** — API communication
- **DOMPurify** — sanitizing rendered HTML
- **react-hot-toast** — notifications UI
- **browser-image-compression** — client-side image optimization

</td>
<td valign="top" width="50%">

### Backend (`/server`)

- **Node.js** + **Express 5** + **TypeScript**
- **MongoDB** + **Mongoose** — data persistence
- **Socket.IO** — real-time engine
- **Google Generative AI (Gemini 2.5 Flash)** — smart tag extraction
- **JWT** + **bcrypt/bcryptjs** — authentication & security
- **Cloudinary** — media storage & delivery
- **Razorpay** — payment processing
- **Nodemailer** — transactional email
- **Helmet**, **CORS**, **Morgan** — security & logging middleware
- **Multer** — file upload handling

</td>
</tr>
</table>

---

## 🗃️ Data Model

The platform's schema spans a rich set of interconnected entities — **Users, Questions, Answers, Comments, Votes, Tags, Chats, Notifications, Bookmarks, Wallets, and Transactions** — designed to support everything from Q&A threading to real-time messaging and payments.

A full visual entity-relationship diagram is available in [`PulseAsk Database Model.pdf`](./PulseAsk%20Database%20Model.pdf), with the raw exported schema in [`DBModel.json`](./DBModel.json).

---

## 🚀 Try It Live

No setup needed — PulseAsk is deployed and ready to explore right now.

<div align="center">

### 👉 **[pulseask.vercel.app](https://pulseask.vercel.app)** 👈

Create an account, ask a question, and watch the AI tag it, the community vote on it, and the leaderboard respond in real time.

</div>

---

## 🤝 Contributing

This started as a personal project — but great ideas are always welcome. Feel free to open an issue or submit a pull request if you'd like to help make PulseAsk better.

---

## 📜 Reputation Policy

See [`reputation_policy.md`](./reputation_policy.md) for the exact scoring rules that power the leaderboard.

---

<div align="center">

*Built with care, for people looking for answers when it matters most.* 🩺💙

</div>
