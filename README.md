# KashPages

**Contact-based landing page publishing platform for Kashmir businesses.**

A production-ready SaaS platform that allows admin-managed landing page creation for local businesses. No e-commerce, no online payments, no bookings—pure contact-driven leads via phone, WhatsApp, Instagram, and Google Maps.

## Features

✅ **Admin-Managed Pages** - Full CRUD control for admin users
✅ **SEO-Optimized** - Auto-generated sitemaps, robots.txt, meta tags, Open Graph
✅ **Contact-Based Leads** - Phone, WhatsApp, Instagram, Maps integration
✅ **Multi-Role Authentication** - Guest, User (Business Owner), Admin
✅ **Payment Tracking** - Manual admin payment status management
✅ **Expiry Management** - Auto-expiry status tracking
✅ **Temporary Notice Modal** - For unpaid published pages
✅ **Responsive Design** - Mobile-first Tailwind CSS
✅ **Production-Ready** - Deployed on Netlify + Firebase

## Tech Stack

### Frontend
- **React 18** with Vite
- **React Router v6** for navigation
- **Tailwind CSS** for styling
- **Helmet** for SEO meta tags
- **Classnames** for conditional CSS

### Backend & Data
- **Firebase Authentication** (Email + Google OAuth)
- **Firestore** for NoSQL database
- **Firebase Security Rules** for access control

### Deployment
- **Netlify** for frontend hosting (free tier)
- **Custom Domain** - kashpages.in via GoDaddy DNS

## Project Structure

```
kashpages/
├── src/
│   ├── app/                 # App shell & routing
│   ├── pages/              # Route-level pages
│   ├── components/         # Reusable React components
│   ├── firebase/           # Firebase services & auth
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── styles/             # Global styles
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── firestore.rules         # Firebase security rules
├── netlify.toml            # Netlify deployment config
├── vite.config.js          # Vite build config
├── tailwind.config.js      # Tailwind configuration
└── package.json            # Dependencies
```

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/Burhan-sheikh/kashpages.git
cd kashpages
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email + Google)
3. Create a Firestore database (Start in production mode)
4. Copy your Firebase config
5. Create `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_APP_URL=http://localhost:5173
VITE_DOMAIN=kashpages.in
```

### 4. Deploy Firestore Rules

```bash
firebase login
firebase deploy --only firestore:rules
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## Deployment

### Deploy to Netlify

1. Connect your GitHub repo to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy runs automatically on push to main

```bash
# Manual deployment
npm run build
netlify deploy --prod
```

### DNS Setup (GoDaddy → Netlify)

1. Log into GoDaddy
2. Go to DNS settings for kashpages.in
3. Update nameservers to Netlify's:
   - `dns1.p09.nsone.net`
   - `dns2.p09.nsone.net`
   - `dns3.p09.nsone.net`
   - `dns4.p09.nsone.net`

4. Netlify auto-configures SSL (HTTPS)

## User Roles & Permissions

### Guest (No Login)
- View published landing pages
- Use contact buttons
- Browse explore page
- Search engine indexing

### Business Owner (Logged In)
- View only their owned pages
- See plan details, purchase date, expiry
- Contact admin for updates
- Cannot self-edit pages

### Admin (Full Access)
- Create, read, update, delete all pages
- Manage payment status
- Set expiry dates
- Edit page HTML content
- View all users and their pages
- Manage global settings

## Firestore Data Models

### Pages Collection
```javascript
{
  id: "auto",
  title: "Business Name",
  slug: "business-slug",
  html: "<html>...</html>",
  meta: {
    title: "SEO Title",
    description: "Meta description",
    keywords: ["keyword1", "keyword2"],
    ogImage: "https://...",
    phone: "+919876543210",
    whatsapp: "919876543210",
    instagram: "business_handle",
    mapUrl: "https://..."
  },
  status: "draft|published|expired",
  plan: "basic|standard|custom",
  ownerId: "firebase_uid",
  isPaid: true|false,
  purchaseDate: Timestamp,
  expiryDate: Timestamp,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastPaymentUpdatedAt: Timestamp
}
```

### Users Collection
```javascript
{
  uid: "firebase_uid",
  name: "User Name",
  email: "email@example.com",
  role: "user|admin",
  ownedPages: ["page_id_1", "page_id_2"],
  createdAt: Timestamp
}
```

## Admin Workflow

### Creating a Page
1. Admin clicks "Create Page"
2. Enters title, slug, HTML content
3. Adds SEO metadata & contact info
4. Saves as draft
5. Publishes page (goes live with temporary notice)
6. Manually confirms payment
7. Sets purchase & expiry dates

### Payment Status
- **Unpaid Published**: Shows temporary notice modal
- **Paid Published**: Full page access
- **Expired**: Page auto-unpublished or notice shown

## SEO Implementation

- **Meta Tags**: Title, description, keywords
- **Open Graph**: Social media sharing
- **Twitter Card**: Twitter-specific preview
- **Canonical URL**: Duplicate content prevention
- **Sitemap**: `/sitemap.xml` (auto-generated)
- **Robots.txt**: `/robots.txt` (search engine rules)
- **Mobile Responsive**: Viewport meta tag
- **Schema Markup**: Ready for structured data

## Plans

### Basic Plan - ₹1,999/year
- Single-page landing page
- Subpath URL (kashpages.in/slug)
- Contact buttons
- Paid updates: ₹99/hour

### Standard Plan - ₹4,999/year
- SEO-optimized page
- Launch support
- 24-hour free changes
- Paid updates after

### Custom Plan - ₹9,999 – ₹99,999 (one-time)
- Custom domain
- Full web app
- Source code delivered
- No future responsibility

## Important Notes

- ⚠️ **No Self-Edit**: Users cannot modify their own pages
- ⚠️ **No Payments**: No payment gateway integration (admin-only manual)
- ⚠️ **No Bookings**: Contact-only platform
- ⚠️ **No E-commerce**: Not an online store builder
- ✅ **Contact-Based**: Phone, WhatsApp, Instagram, Maps only

## Development Commands

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run format     # Format with Prettier
```

## Environment Variables

See `.env.example` for template. Required variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_APP_URL`
- `VITE_DOMAIN`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT License - See LICENSE file

## Support

For issues, questions, or feature requests:
📧 burhan@kashpages.in

---

**Made with ❤️ in Kashmir**
