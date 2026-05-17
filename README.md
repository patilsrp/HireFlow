# HireFlow - Full-Stack Job Portal (MERN Stack)

A role-based job portal where recruiters can post jobs and manage applications, while candidates can browse opportunities and track their application status.

## Tech Stack
- **Frontend:** React + Vite, Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **Deployment:** AWS EC2 + GitHub Actions

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- Cloudinary account (optional, for file uploads)

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Update `.env` file with your credentials:
```
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hireflow
JWT_SECRET=your_secret_key_here
```

3. Install dependencies and run:
```bash
npm install
npm run dev
```

Server will start on http://localhost:5000

### Frontend Setup

1. In a new terminal, navigate to client directory:
```bash
cd client
```

2. Install dependencies and run:
```bash
npm install
npm run dev
```

Frontend will start on http://localhost:5173

## Test Flow

1. **Register as Recruiter:**
   - Go to http://localhost:5173/register
   - Select "Recruiter" role
   - Enter company name
   - Post 2-3 test jobs

2. **Register as Candidate:**
   - Open incognito window
   - Register with different email
   - Select "Candidate" role
   - Browse and apply to jobs

3. **Manage Applications:**
   - Log back in as Recruiter
   - View applications
   - Update application status

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Jobs (Public)
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID

### Jobs (Recruiter Only)
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `GET /api/jobs/recruiter/my-jobs` - Get recruiter's jobs

### Applications (Candidate Only)
- `POST /api/applications` - Apply to job
- `GET /api/applications/my` - Get my applications

### Applications (Recruiter Only)
- `GET /api/applications/job/:jobId` - Get job applications
- `PATCH /api/applications/:id/status` - Update application status

## Project Structure
```
hireflow/
├── server/
│   ├── src/
│   │   ├── models/       # MongoDB schemas
│   │   ├── controllers/  # Business logic
│   │   ├── routes/       # API routes
│   │   └── middleware/   # Auth middleware
│   └── package.json
├── client/
│   ├── src/
│   │   ├── pages/        # React pages
│   │   ├── components/   # Reusable components
│   │   ├── context/      # Auth context
│   │   └── api/          # Axios instance
│   └── package.json
└── README.md
```

## Features
- JWT-based authentication
- Role-based access control (Recruiter/Candidate)
- Job posting and management
- Application tracking system
- Real-time status updates
- Responsive design with Tailwind CSS

## License
MIT