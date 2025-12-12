🚀 BloodX – Blood Donation Application

🔗 Live Project Link: [Add your deployed URL here]

🩸 Overview

BloodX is a modern, full-stack blood donation management platform designed to connect donors, volunteers, and administrators in an efficient and transparent ecosystem.
This application showcases real-world system design, secure authentication, role-based dashboards, Stripe-powered donation handling, and fully dynamic request management.

It was built as part of a professional skill-assessment project to evaluate problem-solving, system structuring, and UI/UX decision-making.

🎯 Key Features
🔐 Authentication & Authorization

Firebase Authentication (Email/Password & Token Management)

Backend JWT Verification (Firebase Admin SDK)

Role-Based Access: Donor, Volunteer, Admin

Protected Routes (Frontend + Backend)

🧑‍💻 Donor Features

Update profile information

Create blood donation requests

Manage personal donation requests

Donate funds using Stripe Payment Integration

View donation tracking details

🤝 Volunteer Features

Access volunteer dashboard

View user, funding & donation statistics

Manage donation request statuses (Approve/Receiving/Ongoing/Delivered)

🛠️ Admin Features

Complete admin dashboard

Manage all users (role update, block/unblock)

Manage all donation requests

View detailed platform statistics

Update admin profile

📊 Dashboard Statistics

All dashboards show dynamic, real-time stats using TanStack Query:

Total Donors

Total Funds Collected

Total Blood Donation Requests

Volunteer progress overview

Admin-level system insights

💳 Fund Donation System

Stripe Checkout Session integrated in backend (Node + Express)

Secure payment workflow

Metadata storage for tracking

Automatically generated:

Transaction ID

Tracking ID

Payment Success → Data saved to database & displayed to user

🧩 Pagination & Filtering

Pagination implemented for donation requests list

Donors can filter by:

District

Upazila

Blood Group

🛠️ Tech Stack
Frontend

React.js

React Router

React Hook Form

TanStack Query

Axios

React Icons

Tailwind CSS

SweetAlert2

Backend

Node.js

Express.js

MongoDB

Firebase Admin SDK (JWT verification)

Tools

Stripe Payment Gateway

Firebase Hosting (Frontend hosting)

Vercel (Backend hosting)



🧪 Why This Project Stands Out

Clean and scalable architecture

Highly secure authentication & role control

Real-world donation workflow implementation

Stripe fund donation system

Three separate dashboards

Professional-level UI/UX with responsiveness

Clear separation of frontend & backend responsibilities

Industry-standard packages (React Query, JWT, Firebase Admin, Axios Interceptors)

🟢 Installation & Setup
Frontend
cd client
npm install
npm run dev

Backend
cd server
npm install
npm start


Environment variables needed:

FIREBASE_ADMIN_SERVICE_ACCOUNT=

MONGODB_URI=

STRIPE_SECRET_KEY=

SITE_DOMAIN=

🤝 Contributors

Developed by Shaikh Al Nahian

📌 License

This project is for practice purposes.
