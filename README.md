# Akothee Safaris – Travel Website & Management System

A modern **travel and tour management system** built with **React** and powered by **Firebase Authentication** and **Cloud Firestore**.  
The platform serves as both a **public-facing website** for clients and an **internal staff dashboard** for Admins and Tour Operators.

---

## Table of Contents

- [Features](#features)  
- [Technologies](#technologies)  
- [Project Structure](#project-structure)  
- [Installation & Setup](#installation--setup)  
- [Firebase Configuration](#firebase-configuration)  
- [Usage](#usage)  
- [Roles & Permissions](#roles--permissions)  
- [Dynamic Data](#dynamic-data)  
- [Future Enhancements](#future-enhancements)

---

## Features

### Public Website
- Dynamic Hero carousel (images, titles, subtitles from Firestore)
- Search & filter travel services:
  - Tour Packages
  - Hotels
  - Flights
  - Visa Applications
  - Passport Applications
  - Transfers
- Top Destinations & Hot Deals (auto-rotating)
- Visa & Passport services sections
- Booking modals for each service
- Why Choose Us section (editable by Admin)
- Responsive, modern e-commerce style UI

### Staff Dashboard
- Role-based access: Admin & Tour Operator
- Modules:
  - Packages
  - Hotels
  - Flights
  - Visas
  - Passports
  - Transfers
  - Inquiries & Bookings
  - Reports
  - Staff Management (Admin only)
- Real-time data updates using Firestore
- Upload and manage images with Firebase Storage
- Approval workflow for posts
- Export reports to PDF or Excel
- Staff activity logs

---

## Technologies

- **Frontend:** React, Tailwind CSS / Material UI
- **Backend / Auth / Database:** Firebase Authentication, Cloud Firestore, Firebase Storage
- **Deployment:** Firebase Hosting
- **Optional:** Firebase Functions for emails, reports, and workflow automation

---

## Project Structure

akothee-safaris/
│
├── public/ # Static files
├── src/
│ ├── components/ # Reusable React components (Cards, Navbar, Modals, Carousel)
│ ├── pages/ # Pages (Home, Destinations, About Us, Dashboard)
│ ├── context/ # React context for auth & global state
│ ├── firebase/ # Firebase config & utils
│ ├── hooks/ # Custom React hooks
│ ├── styles/ # Tailwind / global styles
│ └── App.jsx
│
├── package.json
└── README.md

yaml
Copy code

---

## Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/akothee-safaris.git
cd akothee-safaris
Install dependencies

bash
Copy code
npm install
Set up Firebase

Create a Firebase project: https://console.firebase.google.com

Enable:

Authentication (Email/Password)

Firestore Database

Storage (for images)

Copy your Firebase config

Configure Firebase in your project

Create src/firebase/config.js:

javascript
Copy code
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
Start development server

bash
Copy code
npm start
Your app should now run at http://localhost:3000.

Roles & Permissions
Admin

Full access to all modules

Can approve posts from Tour Operators

Manage staff

Generate reports

View activity logs

Tour Operator

Can create packages, hotels, flights, visas, passports, transfers

Manage their inquiries & bookings

Cannot approve posts or manage staff

Can generate only their own reports

Public Users

Can browse packages and services

Submit inquiries

Book services via modals

Dynamic Data
All content on the website is fetched from Firestore:

Hero slides

Packages & Hotels (with multiple images)

Flights, Visa, Passport, Transfers

Top Destinations & Hot Deals

Inquiries & Bookings

About Us / Why Choose Us content

No content is hard-coded.

Future Enhancements
Push notifications for staff

Multi-language support

Payment gateway integration

Mobile app version (React Native)

Advanced reporting and analytics dashboard

SEO optimizations

License
This project is proprietary. All rights reserved to OpenDesk.