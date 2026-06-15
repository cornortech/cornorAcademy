# Cornor Academy
### Modern Learning Management System For Students, Teachers and Administrators

## Overview 
Cornor Academy is a full-stack Learning Management System (LMS) designed to simplify online education management for institution, traininig centers, and individual educators. The platform provides a centralized digital ecosystem where teachers can create and manage courses, students can enroll and lern and administrators can oversee the entire platform from a single dashboard.

The project supports live scheduled classes, recorded video courses with meeting integration and pre-recorded multi-part video courses, making it flexible enough for driving institutes and any education-based business. The project focuses heavily on scalability, type safety, securigy and user experience. Every module is designed independently so new features can easily be added without affecting existing functionality.

### Project Vision 
The main goal if Cornor Academy is to help educators and institution to digitilize their teaching operations without needing multiple disconnected tools. Many small and medium-sized educational institutions still rely on manual enrollment prodesses, paper-based attendance, scattered course materials and disconnected communication systems. This project solves this by offering an all in one platform that manages the complete learning lifecycle:
**Teacher registration and appporval**
**Course creation and publishing**
**Student enrollment and payment**
**Live class scheduling and attendance**
**Video course delivery and progress tracking**
**Certificate generation and verification**
**Platform analytics and reporting**

## Live Demo

**Application:** ttps://academy.cornortech.com

## Demo Video

**Project Walkthrough:** https://drive.google.com/file/d/11Cv6lB3LHNJm781id3JVgEqNG7daaNPj/view?usp=drive_link

## Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** Tailwind CSS v4, Radix UI, shadcn/ui
- **State & Data:** TanStack React Query, Axios
- **Forms:** React Hook Form, Zod
- **Auth:** Firebase
- **Charts:** Recharts

### Backend
- **Runtime:** Node.js, TypeScript
- **Framework:** Express.js with ts-rest
- **Database:** PostgreSQL + Prisma ORM + Mongoose
- **Auth:** Firebase Admin, JWT, bcrypt
- **File Storage:** Cloudinary
- **Payments:** Khalti
- **Docs:** Swagger (swagger-jsdoc, swagger-ui-express)
- **Email:** Nodemailer
- **Certificates:** PDFKit

## Run Commands

### Backend
```bash
cd backend
npm install
npm run generate   # Generate Prisma client & Zod schemas
npm run dev        # Start dev server with hot-reload
npm run build      # Compile TypeScript
npm run start      # Start production server
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # Start Next.js dev server
npm run build      # Build for production
npm run start      # Start production server
```
## Environment Variables
 
### Backend — `backend/.env`
 
Create a `.env` file in the `backend/` directory:
 
```env
# Server
PORT=4000
 
# Database
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/cornor_academy?schema=public
 
# CORS
WHITE_LISTED_ORIGINS=http://localhost:3000,https://yourdomain.com
 
# Default Admin Credentials
DEFAULT_ADMIN_EMAIL=admin@yourdomain.com
DEFAULT_ADMIN_PASSWORD=your_secure_password
 
# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
 
# SMTP (Email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
 
# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# KHALTI PAYMENT GATEWAY
KHALTI_SECRET_KEY=sk_test_xxxxxxxxx
KHALTI_BASE_URL=https://dev.khalti.com/api/v2
 
```
 
### Frontend — `frontend/.env.local`
 
Create a `.env.local` file in the `frontend/` directory:
 
```env
# Backend API base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
 
# Firebase Web SDK
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_web_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# KHALTI PAYMENT GATEWAY
NEXT_PUBLIC_KHALTI_PUBLIC_KEY=pk_test_xxxxxxxxx

```

## Folder Structure

```
cornorAcademy/
├── backend/
│   ├── prisma/              
│   ├── src/
│   │   ├── contract/        
│   │   ├── libs/            
│   │   ├── middleware/       
│   │   ├── modules/         
│   │   ├── routes/          
│   │   ├── services/        
│   │   ├── app.ts           
│   │   └── server.ts       
│   └── package.json
│
├── frontend/
│   ├── app/                 
│   │   ├── (auth)/          
│   │   ├── (dashboard)/     
│   │   └── (public)/       
│   ├── components/         
│   │   ├── ui/              
│   │   ├── shared/         
│   │   ├── features/        
│   │   └── dashboard/       
│   ├── contexts/            
│   ├── hooks/               
│   ├── lib/                
│   └── types/               
│
└── README.md
```

## API Documentation

The backend API is documented using Swagger.

After starting the backend server, visit:

```text
http://localhost:4000/api-docs
```

### Main API Modules

- Authentication
- Students
- Teachers
- Courses
- Enrollments
- Lessons
- Progress Tracking
- Certificates
- Settings

## Features

### Authentication & Authorization

* Firebase Authentication
* Email Verification
* Role-Based Access Control
* Secure JWT Authorization

### Course Management

* Create Live Classes
* Create Recorded Video Courses
* Course Categories and Levels
* Course Search and Filtering
* Cloudinary Media Uploads

### Teacher Features

* Teacher Registration
* Teacher Verification System
* Course Creation Dashboard
* Course Analytics

### Student Features

* Course Enrollment
* Learning Progress Tracking
* Profile Management

### Learning Experience

* Structured Lessons
* Video-Based Learning
* Course Announcements
* Progress Monitoring

### Payments

* Khalti Payment Integration

### Analytics Dashboard

#### Admin Dashboard

* User Statistics
* Revenue Tracking
* Enrollment Reports
* Course Performance Insights

#### Teacher Dashboard

* Student Progress Tracking
* Course Statistics
* Upcoming Classes

#### Student Dashboard

* Enrolled Courses
* Learning Hours
* Completion Statistics

### Platform Settings

* Company Information Management
* Social Media Configuration
* Payment Settings
* Course Configuration

## Screenshots

### Landing Page

![Landing Page](./frontend/public/screenshots/home.png)

### Course Details

![Course Details](./frontend/public/screenshots/course-details.png)

### Student Dashboard

![Student Dashboard](./frontend/public/screenshots/student-dashboard.png)

### Teacher Dashboard

![Teacher Dashboard](./frontend/public//screenshots//teacher-dashboard.png)

### Admin Dashboard

![Admin Dashboard](./frontend/public/screenshots/admin-dashboard.png)

## Conclusion

Cornor Academy is a full-featured Learning Management System built with Next.js and Express.js. It provides end-to-end course management, student/teacher administration, enrollment workflows, payment processing, lesson tracking, progress monitoring, and automated certificate generation — all secured with Firebase authentication and backed by PostgreSQL and Cloudinary for scalable file storage.
