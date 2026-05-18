# Deployment Guide for HireFlow

This guide provides instructions for deploying HireFlow using free hosting services.

## Zero-Cost Deployment Options

### Backend (Server) - Render.com
1. Create account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Click "New +" → "Web Service"
4. Select your repository
5. Configure:
   - Name: `hireflow-api`
   - Runtime: Node
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
6. Add Environment Variables:
   - `MONGODB_URI` - Get free MongoDB Atlas database at [mongodb.com](https://www.mongodb.com/atlas)
   - `JWT_SECRET` - Generate random string
   - `CLOUDINARY_CLOUD_NAME` - From Cloudinary dashboard
   - `CLOUDINARY_API_KEY` - From Cloudinary dashboard
   - `CLOUDINARY_API_SECRET` - From Cloudinary dashboard
7. Deploy (free tier includes 750 hours/month)

### Frontend (Client) - Choose One:

#### Option 1: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project root
3. Follow prompts
4. Update `client/.env.production` with your Render backend URL
5. Redeploy: `vercel --prod`

#### Option 2: Netlify
1. Create account at [netlify.com](https://www.netlify.com)
2. Connect GitHub repository
3. Configure build settings (auto-detected from netlify.toml)
4. Add environment variable:
   - `VITE_API_URL` = Your Render backend URL
5. Deploy

### Free Services Required:
- **MongoDB Atlas** (Database): [mongodb.com/atlas](https://www.mongodb.com/atlas) - 512MB free
- **Cloudinary** (Image hosting): [cloudinary.com](https://cloudinary.com) - 25GB free
- **Render** (Backend): [render.com](https://render.com) - 750 hours/month free
- **Vercel/Netlify** (Frontend): Unlimited for personal projects

## Quick Deploy Commands

### Deploy Backend to Render:
```bash
git add .
git commit -m "Deploy to Render"
git push origin main
```

### Deploy Frontend to Vercel:
```bash
cd client
vercel --prod
```

### Deploy Frontend to Netlify:
```bash
netlify deploy --prod --dir=client/dist
```

## Post-Deployment Setup

1. Update CORS settings in `server/src/index.js` with your frontend URL
2. Update `client/.env.production` with backend URL
3. Test all features: authentication, job posting, applications
4. Monitor logs in hosting dashboards

## Important Notes
- Render free tier may sleep after 15 minutes of inactivity (cold start ~30s)
- Use environment variables for sensitive data
- Enable HTTPS on all services (automatic on these platforms)
- Set up GitHub Actions for automatic deployment (optional)