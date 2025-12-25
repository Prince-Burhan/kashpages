# KashPages Admin Guide

## Admin Access

As admin, you have full control over:
- 📝 Creating and managing landing pages
- 💳 Payment status and expiry tracking
- 👥 User management
- ⚙️ Global platform settings

---

## Admin Dashboard

### Access
- **URL**: `https://kashpages.in/admin`
- **Requires**: Admin role in Firestore

### Navigation
- **Pages**: Manage all landing pages
- **Users**: View all registered users
- **Settings** (future): Global notices, SEO defaults

---

## Creating a Landing Page

### Step-by-Step

1. **Navigate to Admin Panel**
   - Go to `/admin/pages`
   - Click "Create Page"

2. **Basic Information**
   - **Title**: Business name ("MITC Store", "Kashmir Designs", etc.)
   - **Slug**: URL slug ("mitc", "kashmir-designs") - auto-generated from title
   - **Plan**: basic / standard / custom

3. **Content**
   - **HTML Content**: Full HTML of landing page
   - Can include:
     - Hero section with images
     - Product/service listings
     - Testimonials
     - Contact form HTML
     - Custom CSS styling

4. **SEO Metadata**
   ```json
   {
     "title": "MITC – Premium Laptop Store Srinagar",
     "description": "Trusted laptop and IT solutions since 2013",
     "keywords": ["MITC", "Laptop Store", "Srinagar"],
     "ogImage": "https://example.com/image.jpg"
   }
   ```

5. **Contact Information**
   - **Phone**: "+919876543210"
   - **WhatsApp**: "919876543210"
   - **Instagram**: "business_handle"
   - **Google Maps URL**: Full maps link

6. **Save**
   - Click "Save as Draft"
   - Page is created but not visible

---

## Publishing a Page

### Status Workflow

```
Draft → Published (Unpaid) → Published (Paid) → Active
                          ✓ Auto-expires
```

### Publish Steps

1. **Go to Pages List**
   - Navigate to `/admin/pages`

2. **Find Draft Page**
   - Click "Edit" on desired page

3. **Review Content**
   - Verify HTML renders correctly
   - Check contact info
   - Preview on mobile

4. **Publish**
   - Click "Publish"
   - Page goes live at `https://kashpages.in/slug`
   - Temporary notice appears for customers

### Temporary Notice

When page is published but unpaid:
```
"This page is temporarily published for review.
It will be unpublished within 24 hours if not approved.
If you are the business owner, please contact us."
```

---

## Managing Payments

### Payment Status

**Unpaid Published**
- Page is live
- Shows temporary notice modal
- Customer sees warning

**Paid Published**
- Page is live
- No notice
- Full access

### Set Payment Status

1. **Go to Pages List**
   - Find published page

2. **Mark as Paid**
   - Set `isPaid = true`
   - Set `purchaseDate` (today)
   - Set `expiryDate` (1 year from today for Basic/Standard)

3. **Save**
   - Notice disappears
   - Page fully active

### Payment Details

**Basic Plan - ₹1,999/year**
- Expiry: purchaseDate + 365 days
- Example: Jan 1, 2025 → Dec 31, 2025

**Standard Plan - ₹4,999/year**
- Expiry: purchaseDate + 365 days
- Same year-based expiry

**Custom Plan**
- Varies by agreement
- Set custom dates as agreed

---

## Managing Expiry

### Auto-Expiry

When `expiryDate` passes:
- Status becomes "expired"
- Page auto-unpublished (in future versions)
- Currently: shows expiry notice

### Manual Renewal

1. **Find Expired Page**
   - Go to Pages List
   - Filter by status = "expired"

2. **Update Expiry**
   - Edit page
   - Set new `expiryDate`
   - Optionally update `purchaseDate`
   - Save

3. **Re-publish (if needed)**
   - If status changed to draft, publish again

---

## Managing Users

### View Users

1. **Go to `/admin/users`**
2. **See all registered users**
   - Name
   - Email
   - Role (user or admin)
   - Number of pages
   - Join date

### User Information

Each user has:
- **uid**: Firebase authentication ID
- **role**: "user" (owner) or "admin"
- **ownedPages**: Array of page IDs they own
- **createdAt**: Registration date

### Promote to Admin

**Firestore**:
1. Go to `users` collection
2. Find user document
3. Edit `role` field from "user" to "admin"
4. Save
5. User can now access admin panel on next login

---

## Best Practices

### Page Creation

✅ **DO:**
- Validate HTML before saving
- Use descriptive slugs ("mitc", "kashmir-designs")
- Include all contact methods
- Add SEO metadata for better rankings
- Test on mobile devices
- Save as draft first, then publish

❌ **DON'T:**
- Use unsafe HTML/JavaScript
- Set expired dates in the past
- Duplicate slugs
- Leave blank contact info
- Publish without testing

### Payment Management

✅ **DO:**
- Set payment status immediately after confirmed
- Use consistent date formats
- Track payments in separate system (if needed)
- Set realistic expiry dates (1 year typical)

❌ **DON'T:**
- Forget to mark as paid (users see notice)
- Set expiry in past
- Double-charge users
- Ignore payment status

### User Management

✅ **DO:**
- Review new user signups regularly
- Maintain admin access for emergencies
- Communicate status updates
- Keep user emails updated

❌ **DON'T:**
- Delete active user pages
- Change role without approval
- Share admin credentials

---

## Common Tasks

### Task: Create MITC Store Page

```javascript
// Page Data
{
  title: "MITC Store",
  slug: "mitc",
  html: "<full html content>",
  meta: {
    title: "MITC – Premium Laptop Store Srinagar",
    description: "Trusted laptop and IT solutions in Srinagar, Kashmir",
    keywords: ["MITC", "Laptop Store", "Srinagar", "IT Solutions"],
    ogImage: "https://kashpages.in/images/mitc.jpg",
    phone: "+919876543210",
    whatsapp: "919876543210",
    instagram: "mitc_srinagar",
    mapUrl: "https://maps.google.com/?q=MITC+Srinagar"
  },
  status: "draft",
  plan: "standard",
  ownerId: "owner_uid"
}
```

### Task: Publish & Mark as Paid

```javascript
// Step 1: Publish
{ status: "published", isPaid: false }

// Step 2: Mark Paid (after payment confirmed)
{
  status: "published",
  isPaid: true,
  purchaseDate: "2025-01-15",
  expiryDate: "2026-01-15"
}
```

### Task: Handle Expired Page

```javascript
// Check expiry
const isExpired = new Date(expiryDate) < new Date()

// If expired, either:
// 1. Unpublish
{ status: "draft" }

// 2. Or renew
{
  expiryDate: "2027-01-15" // New year
}
```

---

## Troubleshooting

### Issue: Page not live after publishing

**Causes:**
- Page status is "draft"
- User not logged in as admin
- Firestore rules blocking access

**Fix:**
- Verify status = "published"
- Re-login and check role
- Check Firestore security rules

### Issue: Notice modal still showing for paid page

**Causes:**
- isPaid not updated
- Firestore sync delay
- Browser cache

**Fix:**
- Verify `isPaid: true` in Firestore
- Hard refresh (Ctrl+Shift+R)
- Wait 5-10 seconds for sync

### Issue: Cannot access admin panel

**Causes:**
- Not logged in
- User role is not "admin"
- Firestore rules denying access

**Fix:**
- Log in with admin account
- Check Firestore `users` > `role: admin`
- Verify Firestore rules deployment

---

## Future Enhancements

- [ ] CSV import for bulk pages
- [ ] Page templates/builder
- [ ] Email notifications for new pages
- [ ] Advanced analytics
- [ ] Automated expiry warnings
- [ ] Payment integration (if needed)
- [ ] Page versioning/history

---

**Questions? Contact: burhan@kashpages.in**
