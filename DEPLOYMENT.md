# Deployment Guide for IITR Finance App

## 🚀 **Quick Deployment Options**

### **Option 1: Vercel (Recommended - Easiest)**

#### **Step 1: Prepare Your Code**
1. Create a `.env.local` file in your root directory:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   ```

2. Create a `vercel.json` file in your root directory:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server/server.js",
         "use": "@vercel/node"
       },
       {
         "src": "package.json",
         "use": "@vercel/static-build"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/server/server.js"
       },
       {
         "src": "/(.*)",
         "dest": "/dist/$1"
       }
     ]
   }
   ```

#### **Step 2: Deploy to Vercel**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Set environment variables in Vercel dashboard:
   - `MONGODB_URI` (get from MongoDB Atlas)
   - `JWT_SECRET` (generate a secure random string)
   - `JWT_EXPIRE=30d`
   - `NODE_ENV=production`

#### **Step 3: Set Up MongoDB Atlas**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Add it to Vercel environment variables

### **Option 2: Separate Frontend & Backend**

#### **Backend Deployment (Railway/Render)**
1. **Deploy server folder separately**
2. **Set environment variables:**
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRE`
   - `PORT` (auto-assigned)

#### **Frontend Deployment (Vercel/Netlify)**
1. **Set environment variable:**
   - `VITE_API_URL=https://your-backend-url.railway.app`

## 🔧 **Environment Variables Setup**

### **For Development (.env.local)**
```
VITE_API_URL=http://localhost:5003
```

### **For Production (Vercel/Railway/etc.)**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/iitr-finance
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRE=30d
NODE_ENV=production
```

## 📋 **Pre-Deployment Checklist**

- [ ] ✅ Environment variables configured
- [ ] ✅ MongoDB Atlas cluster created
- [ ] ✅ JWT secret is secure and random
- [ ] ✅ Frontend uses environment variables for API URL
- [ ] ✅ All hardcoded localhost URLs removed
- [ ] ✅ CORS configured for production domain
- [ ] ✅ Error handling for network failures

## 🌐 **Free Hosting Options**

### **Frontend:**
- **Vercel** (recommended) - Free tier
- **Netlify** - Free tier
- **GitHub Pages** - Free

### **Backend:**
- **Vercel** - Free tier (serverless)
- **Railway** - Free tier
- **Render** - Free tier
- **Heroku** - Paid (no free tier)

### **Database:**
- **MongoDB Atlas** - Free tier (512MB)

## 🚨 **Important Notes**

1. **Never commit `.env` files to GitHub**
2. **Use strong JWT secrets in production**
3. **Enable CORS for your production domain**
4. **Test authentication flow after deployment**
5. **Monitor your MongoDB Atlas usage**

## 🔗 **After Deployment**

1. Test login/signup functionality
2. Verify protected routes work
3. Check console for any errors
4. Test on different devices/browsers

Your app will be live and accessible to anyone with the URL! 🎉
