# 🚨 URGENT: Fix Render Environment Variables

## Problem
Your Render backend is showing:
```
✗ MONGO Connection Failed: connect ECONNREFUSED ::1:27017
```

This means it's trying to connect to **localhost:27017** (your computer's MongoDB) instead of **MongoDB Atlas**.

**Why?** Because Render doesn't have the `MONGO_URI` environment variable set!

## Solution - 3 Simple Steps

### Step 1: Open Render Dashboard
Go to: https://dashboard.render.com

### Step 2: Click Your Backend Service
Click on **zoombackend-xd0f** service

### Step 3: Set Environment Variables
1. Click **Environment** tab (top menu)
2. Under **Environment Variables** section, add these:

| Key | Value |
|-----|-------|
| `MONGO_URI` | `mongodb+srv://kunalsharmakp031_db_user:p3A1tAZEmrgGaBxd@cluster0.ekltmdy.mongodb.net/Zoom?retryWrites=true&w=majority` |
| `PORT` | `10000` |

**IMPORTANT:** Use PORT `10000` because that's what Render is showing, not 8000!

### Step 4: Deploy
1. Click **Save** button (or **Deploy**)
2. Wait for deployment to complete (2-3 minutes)
3. You should see: `✓ MONGO Connected`

## Why This Happens
- `.env` files are in `.gitignore` (correct for security!)
- GitHub doesn't store `.env` files
- Render can't read `.env` files that don't exist
- You MUST set variables in Render's dashboard instead

## Verify It Works
After deployment, check the logs. You should see:
```
✓ MONGO Connected DB Host: cluster0.ekltmdy.mongodb.net
✓ LISTENING ON PORT 10000
```

NOT this error:
```
✗ MONGO Connection Failed: connect ECONNREFUSED
```

## 📋 Exact Values to Copy-Paste

### MONGO_URI (Full Connection String):
```
mongodb+srv://kunalsharmakp031_db_user:p3A1tAZEmrgGaBxd@cluster0.ekltmdy.mongodb.net/Zoom?retryWrites=true&w=majority
```

### PORT:
```
10000
```

---
Do this NOW and your app will start working! 🚀
