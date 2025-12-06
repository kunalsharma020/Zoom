# Zoom App - Production Deployment Setup Guide

## Current Status
- ✅ Code deployed to GitHub: https://github.com/kunalsharma020/Zoom-Clon
- ✅ Backend deployed to Render: https://zoombackend-xd0f.onrender.com
- ❌ 503 Errors occurring - Missing Environment Variables

## Problem
Your Render backend is returning 503 errors because the MongoDB connection string is missing from the Render environment variables.

## Solution - Set Environment Variables in Render Dashboard

### Step 1: Go to Render Dashboard
1. Open: https://dashboard.render.com
2. Login with your account
3. Click on your **zoombackend** service

### Step 2: Add Environment Variables
1. Go to the **Environment** tab
2. Click **Add Environment Variable**
3. Add these two variables:

#### Variable 1:
- **Key:** `MONGO_URI`
- **Value:** 
```
mongodb+srv://kunalsharmakp031_db_user:p3A1tAZEmrgGaBxd@cluster0.ekltmdy.mongodb.net/Zoom?retryWrites=true&w=majority
```

#### Variable 2:
- **Key:** `PORT`
- **Value:** `8000`

### Step 3: Deploy
1. Click **Save** (or **Deploy** if prompted)
2. Render will automatically restart your backend with the new environment variables
3. Wait 2-3 minutes for the deployment to complete

### Step 4: Verify It Works
1. Open your Render backend URL in browser: https://zoombackend-xd0f.onrender.com
2. Try logging in from your frontend
3. Check that the 503 error is gone

## Frontend Configuration

Your frontend is already configured to use:
```
REACT_APP_API_URL=https://zoombackend-xd0f.onrender.com
```

This is correct and points to your Render backend.

## MongoDB Connection Details (Reference)
- **Cluster:** cluster0.ekltmdy.mongodb.net
- **Database:** Zoom
- **User:** kunalsharmakp031_db_user
- **IP Whitelist:** 0.0.0.0/0 (Active ✅)

## After Deployment Checklist
- [ ] Environment variables set in Render
- [ ] Backend restarted on Render
- [ ] Login/Register API calls returning 200 (not 503)
- [ ] Frontend successfully authenticates users
- [ ] MongoDB collections created in Atlas

## If Issues Persist

### Check Render Logs:
1. Go to Render dashboard
2. Click your backend service
3. Go to **Logs** tab
4. Look for connection messages

### Verify MongoDB is Running:
1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Check cluster0 is running
3. Verify IP whitelist includes 0.0.0.0/0

### Test MongoDB Connection Locally:
```bash
cd backend
npm install
node src/app.js
```
Should show: `✓ MONGO Connected`

## Need Help?
Contact MongoDB support or Render support if environment variables still don't connect.
