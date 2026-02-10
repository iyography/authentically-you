# Admin Dashboard Setup

## Overview
The admin dashboard at `/admin` displays all quiz results from the Camera Confidence Zone Quiz.

## Features
- **Overview Dashboard**: Statistics, zone distribution, and recent responses
- **All Results**: Detailed view of every quiz submission with filtering and sorting
- **Export**: Download quiz results as CSV
- **Authentication**: Basic auth protection

## Local Development

1. The dashboard is accessible at `http://localhost:3000/admin` (or your dev port)
2. Login credentials:
   - Username: `admin`
   - Password: Set in `.env.local` as `ADMIN_PASSWORD` (default: `authenticallyYou2025!`)

## Production Deployment

### For Vercel:

1. **Set Environment Variable**:
   ```bash
   vercel env add ADMIN_PASSWORD
   # Enter your secure password when prompted
   ```

2. **Ensure Data Persistence**:
   - The `data/` directory will be created automatically
   - Quiz results are stored in `data/quiz-results.json`
   - For Vercel, this will persist only during the function execution
   - Consider upgrading to a database for permanent storage in production

### For Other Hosts:

1. Set the environment variable `ADMIN_PASSWORD` to a secure password
2. Ensure the `data/` directory has write permissions
3. Consider setting up a proper database for production use

## Security

- Basic HTTP authentication protects both the dashboard and API endpoints
- Change the default password before deploying to production
- Consider implementing more robust authentication for high-security environments

## Data Storage

Currently uses file-based storage (`data/quiz-results.json`) for simplicity. For production with high traffic, consider:

- PostgreSQL with Supabase (already configured in the project)
- MongoDB
- SQLite for simpler deployments

## API Endpoints

- `POST /api/quiz/submit` - Submit quiz results (public)
- `GET /api/admin/quiz-results` - Get all results (protected)
- `GET /api/admin/quiz-results?stats=true` - Get statistics (protected)

## Access

Visit `/admin` and use the credentials:
- Username: `admin`  
- Password: Your `ADMIN_PASSWORD` environment variable