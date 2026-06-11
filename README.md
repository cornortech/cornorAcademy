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
- **Payments:** Stripe
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
