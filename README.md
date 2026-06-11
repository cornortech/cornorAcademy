# Cornor Academy

A Learning Management System (LMS) platform for managing courses, students, teachers, enrollments, and certificates.

## Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** Tailwind CSS v4, Radix UI, shadcn/ui
- **State & Data:** TanStack React Query, Axios
- **Forms:** React Hook Form, Zod
- **Auth:** Firebase
- **Charts:** Recharts
- **Other:** Lucide Icons, Sonner (toasts), date-fns

### Backend
- **Runtime:** Node.js, TypeScript
- **Framework:** Express.js with ts-rest
- **Database:** PostgreSQL + Prisma ORM + Mongoose
- **Auth:** Firebase Admin, JWT, bcrypt
- **File Storage:** Cloudinary
- **Payments:** Khalti
- **Docs:** Swagger (swagger-jsdoc, swagger-ui-express)
- **Email:** Nodemailer
- **Other:** Zod validation, PDFKit (certificates)

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
 
# CORS — comma-separated list of allowed origins
WHITE_LISTED_ORIGINS=http://localhost:3000,https://yourdomain.com
 
# Default Admin Credentials
DEFAULT_ADMIN_EMAIL=admin@yourdomain.com
DEFAULT_ADMIN_PASSWORD=your_secure_password
 
# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
 
# SMTP (Email) — example uses Gmail App Password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
 
# Cloudinary — https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
 
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
```

## Folder Structure

```
cornorAcademy/
├── backend/
│   ├── prisma/              # Schema, migrations, seed
│   ├── src/
│   │   ├── contract/        # ts-rest API contract definitions
│   │   ├── libs/            # Shared utilities (db, etc.)
│   │   ├── middleware/       # Auth & other middleware
│   │   ├── modules/         # Feature modules (auth, course, student, teacher, etc.)
│   │   ├── routes/          # Express route handlers
│   │   ├── services/        # Business logic services
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Entry point
│   └── package.json
│
├── frontend/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/          # Authentication pages
│   │   ├── (dashboard)/     # Dashboard (admin, student, teacher)
│   │   └── (public)/        # Public pages (about, contact, etc.)
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── shared/          # Shared components (header, footer)
│   │   ├── features/        # Feature-specific components
│   │   └── dashboard/       # Dashboard-specific components
│   ├── contexts/            # React contexts (Settings, etc.)
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utility libraries
│   └── types/               # TypeScript type definitions
│
└── README.md
```

## API Endpoints

Base URL: `http://localhost:4000`

Swagger docs available at `/api-docs`.

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | None | Register a new student account |
| POST | `/auth/register/teacher` | None | Register a new teacher account |
| POST | `/auth/login` | None | Login and get role/redirect info |
| POST | `/auth/verify-email` | None | Verify email with token |
| POST | `/auth/resend-verification` | None | Resend email verification link |
| GET | `/auth/me` | Bearer Token | Get authenticated user profile |
| PUT | `/update` | Bearer Token | Update own profile details |
| POST | `/legal-agreement` | Bearer Token | Upload legal agreement document |
| POST | `/auth/test-email` | None | Test SMTP configuration |

### Students

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/student` | None | Get all students |
| GET | `/student/:studentId` | None | Get student by ID |
| POST | `/student` | None | Create a student (sends welcome email) |
| PUT | `/student/:studentId` | None | Update a student |
| DELETE | `/student/:studentId` | None | Delete a student |

### Teachers

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/teacher` | None | Get all teachers |
| GET | `/teacher/:teacherId` | None | Get teacher by ID |
| POST | `/teacher` | None | Create a teacher |
| PUT | `/teacher/:teacherId` | Bearer Token (admin) | Update a teacher |
| DELETE | `/teacher/:teacherId` | Bearer Token (admin) | Delete a teacher |

### Courses

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/course` | None | Get all courses |
| GET | `/course/:courseId` | None | Get course by ID |
| GET | `/course/category/:category` | None | Get courses by category |
| GET | `/course/teacher/:teacherId` | None | Get courses by teacher |
| GET | `/course/status/:status` | None | Get courses by status |
| GET | `/course/search/:query` | None | Search courses by title/description |
| POST | `/course` | None | Create a course |
| POST | `/agreement/:studentId` | None | Create course agreement for student |
| PUT | `/course/:courseId` | None | Update a course |
| PATCH | `/course/status/:id` | None | Update course status only |
| DELETE | `/course/:courseId` | None | Delete a course |

### Teacher Course Management

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/teacher/course` | Bearer Token (teacher) | Teacher creates a course |

### Course Media

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/course-media/:courseId` | None | Get all media for a course |
| GET | `/course-media/:mediaId` | None | Get media file by ID |
| POST | `/course-media` | None | Upload/create a media record |
| PUT | `/course-media/:mediaId` | None | Update a media record |
| DELETE | `/course-media/:mediaId` | None | Delete a media file |
| POST | `/api/upload` | Bearer Token | Upload file to Cloudinary |

### Announcements

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/course/:courseId/announcement` | None | Get announcements for a course |
| POST | `/:teacherId/courses/:courseid/announcement` | None | Create an announcement |
| PUT | `/course/:announcementId` | None | Update an announcement |
| DELETE | `/course/:announcementId` | None | Delete an announcement |

### Enrollments

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/enrollement/` | None | Get all enrollment requests |
| POST | `/enrollement` | None | Create an enrollment request |
| PUT | `/enrollement` | None | Approve/reject enrollment |
| GET | `/enrolled/:studentId` | None | Get enrolled courses for a student |

### Lessons

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/lessons/:courseId` | Bearer Token | Get all lessons for a course |
| GET | `/api/lesson/:id` | Bearer Token | Get a lesson by ID |

### Progress

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/progress/:courseId` | Bearer Token | Get course progress |
| POST | `/api/progress/complete` | Bearer Token | Mark lesson as complete |

### Certificates

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/certificates/:id` | Bearer Token | Get certificate by ID |
| GET | `/api/certificates/verify/:certId` | None | Publicly verify a certificate |


### Settings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/settings/` | None | Get system settings |
| POST | `/settings/` | Bearer Token (admin) | Update system settings |

### Misc

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | None | API info and available endpoint groups |
| GET | `/api-docs` | None | Swagger UI documentation |

## Features

### Company Info Management
Manage platform-wide settings through an admin panel, including:
- **Platform Details:** Name, support email, support phone
- **Social Links:** Facebook, Instagram URLs
- **Course Settings:** Certificate requirements, auto-archiving
- **Payment Settings:** Currency, tax rate, refund policy
- Settings are fetched globally via `SettingsContext` and used across the app (footer, contact page, pricing, etc.)

### Teacher Management
Admin panel for managing teacher accounts, including:
- **Verification:** Approve or revoke teacher verification — only verified teachers can create courses
- **CRUD:** Create, edit, view, and delete teacher profiles
- **Filter & Search:** Search by name/email, filter by status
- **Course Creation:** Teachers choose between **Live Class** (scheduled with meeting link) or **Video Course** (multi-part with Cloudinary uploads)

### Course Management
Full-featured course lifecycle supporting two distinct course types:
- **Live Classes:** Scheduled sessions with meeting URLs, dates and times
- **Video Courses:** Multi-part recorded courses with curriculum and progress tracking
- **Course Creation:** Title, description, requirements, learning outcomes
- **Category Classification:** Web Development, UI/UX, Data Science, Digital Marketing
- **Difficulty Levels:** Beginner, Intermediate, Advanced
- **Thumbnail Upload:** Via Cloudinary integration
- **Status Lifecycle:** Upcoming → Active → Completed
- **Duration & Pricing:** Configurable course duration and pricing
- **Search & Filtering:** By category, status, and teacher

### Student Management
Comprehensive learner registration, enrollment and progress tracking:
- **Registration:** Student registration with personal details
- **Profile Management:** Education, qualification, address details
- **Profile Image Upload:** Via Firebase Storage
- **Student Listing:** Search and filter capabilities for admins
- **Email Verification:** Tracking of verified student accounts

### Analytics & Reporting
Insightful analytics dashboards tailored for each user role:

**Admin Analytics:**
- **Stats Overview:** Total Users, Active Courses, Monthly Revenue, Completion Rate
- **Monthly Enrollments & Revenue:** 6-month rolling bar chart
- **User Distribution:** Pie chart (students vs teachers)
- **Per-Course Payment Statistics:** Revenue breakdown by course

**Teacher Analytics:**
- **Dashboard Stats:** Total courses, students, videos, active courses
- **Student Progress Tracking:** Per-course progress monitoring
- **Upcoming Classes:** Widget with meeting links
- **Course Management:** My Courses list with management options
- **Announcements:** Manage announcements per course
- **Resources:** Material management per course

**Student Analytics:**
- **Enrollment Stats:** Enrolled courses, completed courses, in-progress courses
- **Learning Hours:** Total learning hours tracked
- **Per-Course Progress:** Progress percentages for each enrolled course

## Conclusion

Cornor Academy is a full-featured Learning Management System built with Next.js and Express.js. It provides end-to-end course management, student/teacher administration, enrollment workflows, payment processing, lesson tracking, progress monitoring, and automated certificate generation — all secured with Firebase authentication and backed by PostgreSQL and Cloudinary for scalable file storage.
