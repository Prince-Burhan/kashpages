export const PLANS = {
  BASIC: 'basic',
  STANDARD: 'standard',
  CUSTOM: 'custom'
}

export const PLAN_DETAILS = {
  [PLANS.BASIC]: {
    name: 'Basic Plan',
    price: '₹1,999',
    period: '/year',
    features: ['Single-page', 'Subpath URL', 'Contact buttons']
  },
  [PLANS.STANDARD]: {
    name: 'Standard Plan',
    price: '₹4,999',
    period: '/year',
    features: ['SEO-optimized', 'Launch support', '24-hour free changes']
  },
  [PLANS.CUSTOM]: {
    name: 'Custom Plan',
    price: '₹9,999 – ₹99,999',
    period: 'one-time',
    features: ['Custom domain', 'Full web app', 'Source code delivered']
  }
}

export const PAGE_STATUSES = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  EXPIRED: 'expired'
}

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
}

export const TEMPORARY_NOTICE_TEXT = 'This page is temporarily published for review. It will be unpublished within 24 hours if not approved. If you are the business owner, please contact us.'
