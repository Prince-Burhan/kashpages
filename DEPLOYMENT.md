# KashPages Deployment Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Git account (GitHub)
- Firebase project
- Netlify account (free)
- GoDaddy account (for kashpages.in domain)

---

## Step 1: Firebase Setup

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create Project"
3. Name: `kashpages`
4. Disable Google Analytics (optional)
5. Click "Create"

### 1.2 Enable Authentication

1. Go to **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** (OAuth)
   - Add your Netlify domain to authorized redirect URIs

### 1.3 Create Firestore Database

1. Go to **Firestore Database**
2. Click **Create Database**
3. Select **Production mode** (we'll add security rules)
4. Select region: `asia-south1` (Delhi) for Kashmir latency
5. Create

### 1.4 Deploy Security Rules

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (in project root)
firebase init

# Select Firestore
# Use existing project: kashpages
# Accept defaults for other options

# Deploy rules
firebase deploy --only firestore:rules
```

### 1.5 Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll to **Your apps**
3. Click **Web** (</>) if not created
4. Copy config object
5. Create `.env` file:

```env
VITE_FIREBASE_API_KEY=xxxxx
VITE_FIREBASE_AUTH_DOMAIN=kashpages-xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=kashpages-xxx
VITE_FIREBASE_STORAGE_BUCKET=kashpages-xxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxx
VITE_FIREBASE_APP_ID=xxxxx
VITE_APP_URL=https://kashpages.in
VITE_DOMAIN=kashpages.in
```

---

## Step 2: Create Admin User

### 2.1 Manual Creation

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Enter your email and password
4. Go to **Firestore** → **users** collection
5. Add document with your Firebase UID:

```json
{
  "uid": "your-uid",
  "email": "your-email@example.com",
  "name": "Admin",
  "role": "admin",
  "ownedPages": [],
  "createdAt": "2025-01-01T00:00:00Z"
}
```

---

## Step 3: Netlify Deployment

### 3.1 Connect GitHub

1. Go to [Netlify](https://netlify.com)
2. Sign up with GitHub
3. Click **Add new site**
4. **Import an existing project**
5. Authorize GitHub
6. Select `kashpages` repository
7. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - Click **Deploy site**

### 3.2 Add Environment Variables

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Add all variables from `.env`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - (etc.)

### 3.3 Custom Domain

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter: `kashpages.in`
4. Verify ownership (add DNS record)
5. Proceed to DNS configuration

---

## Step 4: DNS Configuration (GoDaddy)

### 4.1 Update Nameservers

1. Log into [GoDaddy](https://godaddy.com)
2. Go to **Manage My Domains**
3. Click on `kashpages.in`
4. Go to **Nameservers**
5. Click **Change**
6. Select **Custom**
7. Replace with Netlify nameservers:
   ```
   dns1.p09.nsone.net
   dns2.p09.nsone.net
   dns3.p09.nsone.net
   dns4.p09.nsone.net
   ```
8. Save changes (may take 24-48 hours to propagate)

### 4.2 Verify in Netlify

1. Back in Netlify, click **Verify**
2. Once verified, SSL is auto-provisioned (Let's Encrypt)
3. Your site is now live at `https://kashpages.in`

---

## Step 5: Google OAuth Setup

### 5.1 Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Go to **APIs & Services** → **OAuth consent screen**
4. Create external app
5. Fill in:
   - App name: `KashPages`
   - User support email: `burhan@kashpages.in`
   - Developer contact: your email
6. Go to **Credentials**
7. Create **OAuth 2.0 Client ID** (Web application)
8. Authorized JavaScript origins:
   ```
   https://kashpages.in
   http://localhost:5173
   ```
9. Authorized redirect URIs:
   ```
   https://kashpages.in
   http://localhost:5173
   ```
10. Copy Client ID

### 5.2 Firebase Console

1. Go to Firebase **Authentication** → **Sign-in method**
2. Click **Google**
3. Paste Client ID from Google Cloud
4. Add to authorized domains:
   - `kashpages.in`
5. Save

---

## Step 6: Initial Setup Verification

### 6.1 Test Login

1. Visit `https://kashpages.in/login`
2. Test email/password signup
3. Test Google OAuth
4. Navigate to `/dashboard`
5. Verify you see your profile

### 6.2 Test Admin Panel

1. Log in as admin user
2. Visit `https://kashpages.in/admin`
3. You should see:
   - Pages list (empty initially)
   - Users list (showing you)

### 6.3 Test SEO

1. Visit `https://kashpages.in/robots.txt`
2. Visit `https://kashpages.in/sitemap.xml`
3. Check meta tags:
   ```bash
   curl -I https://kashpages.in
   ```

---

## Step 7: Create Your First Page

### 7.1 Admin Creates Page

1. Log in as admin
2. Go to `/admin/pages`
3. Click **Create Page**
4. Fill in:
   - Title: "MITC Store"
   - Slug: "mitc"
   - HTML content (sample HTML)
   - Meta title, description, keywords
   - Contact info (phone, WhatsApp, etc.)
5. Save as draft

### 7.2 Publish Page

1. Click **Publish**
2. Page appears at `https://kashpages.in/mitc`
3. Shows temporary notice (unpaid)

### 7.3 Mark as Paid

1. Admin marks `isPaid = true`
2. Sets `purchaseDate` and `expiryDate`
3. Notice disappears
4. Page is fully live

---

## Step 8: Production Monitoring

### 8.1 Netlify Analytics

- Visit Netlify dashboard
- Monitor deploy logs
- Check build status
- View analytics

### 8.2 Firebase Console

- Monitor Firestore usage
- Check Authentication logs
- View error reporting
- Monitor performance

### 8.3 Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `kashpages.in`
3. Verify with DNS record
4. Submit sitemap: `https://kashpages.in/sitemap.xml`
5. Monitor indexing

---

## Troubleshooting

### SSL Certificate Issues

```bash
# Check cert
digitalocean.com/tools/can-i-use

# Force HTTPS
# Netlify does automatically
```

### DNS Propagation

```bash
# Check DNS
nslookup kashpages.in
dig kashpages.in

# May take 24-48 hours
```

### Firebase Rules Errors

```bash
# Test rules
firebase emulators:start

# Deploy again
firebase deploy --only firestore:rules
```

### Build Failures

```bash
# Local build
npm run build

# Check for errors
npm run lint
```

---

## Maintenance

### Regular Tasks

- [ ] Monitor Firebase usage (free tier limits)
- [ ] Check for expired pages
- [ ] Review Netlify deploy logs
- [ ] Update dependencies monthly
- [ ] Test backups

### Scaling

- Firebase free tier: 1GB storage, 50K daily read/writes
- Upgrade if needed to Blaze (pay-as-you-go)
- Netlify free tier: 100GB bandwidth/month

---

## Support & Resources

- [Firebase Docs](https://firebase.google.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [React Router Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Deployment complete! 🎆**
