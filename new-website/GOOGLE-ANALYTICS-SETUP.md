# Google Analytics 4 (GA4) Setup Guide

## 🎯 Quick Setup

### Step 1: Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property if you haven't already
3. Navigate to: **Admin** → **Data Streams** → **Your Website Stream**
4. Copy your **Measurement ID** (looks like: `G-XXXXXXXXXX`)

### Step 2: Configure the Website

1. Open `.env.local` file in the `new-website` directory
2. Replace `G-XXXXXXXXXX` with your actual Measurement ID:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR_ACTUAL_ID
   ```

3. If `.env.local` doesn't exist, copy from the example:
   ```bash
   cp .env.local.example .env.local
   ```

### Step 3: Deploy to Netlify

For production deployment on Netlify:

1. Go to your [Netlify Dashboard](https://app.netlify.com)
2. Select your site: `punaise-equipment`
3. Go to **Site settings** → **Environment variables**
4. Add the variable:
   - **Key**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-YOUR_ACTUAL_ID`

### Step 4: Verify Installation

After deployment, verify GA4 is working:

1. Visit your website: https://punaise-equipment.netlify.app
2. Open Google Analytics Realtime view
3. You should see yourself as an active user
4. Navigate through pages to confirm page tracking

## 📊 What's Being Tracked

### Automatic Tracking:
- Page views for all pages
- User demographics and location
- Device and browser information
- Traffic sources
- Session duration

### Custom Events:
- **Contact Form Submissions**: Tracks when users submit the contact form
- **Phone/Email Clicks**: Tracks when users click contact methods
- **Product Views**: Tracks which products users are interested in
- **Quote Requests**: Tracks quote form submissions
- **Language Changes**: Tracks language preference changes

## 🔍 Debugging

### Check if GA is Loading:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Filter by "gtag"
4. You should see requests to `www.googletagmanager.com`

### Check Console for Errors:
```javascript
// In browser console, check if gtag is loaded:
typeof window.gtag
// Should return "function"
```

### Test Event Tracking:
```javascript
// Test a custom event in console:
window.gtag('event', 'test_event', {
  event_category: 'test',
  event_label: 'manual_test'
});
```

## 📈 Using GA4 Data

### Key Reports to Monitor:
1. **Acquisition**: Where your visitors come from
2. **Engagement**: Which pages get most views
3. **Conversions**: Track contact form submissions
4. **Demographics**: Understand your audience location

### Setting Up Conversions:
1. In GA4, go to **Configure** → **Conversions**
2. Mark these events as conversions:
   - `form_submit`
   - `contact`
   - `generate_lead`

### Creating Custom Audiences:
1. Go to **Configure** → **Audiences**
2. Create audiences for:
   - Users who viewed products
   - Users who submitted forms
   - Users from specific countries

## 🌍 Multi-language Tracking

The implementation automatically tracks:
- Language preference (`/zh`, `/en`, `/th`, etc.)
- Language switches
- Page views per language version

## ⚠️ Important Notes

1. **Privacy Compliance**: 
   - Consider adding a cookie consent banner
   - Update privacy policy to mention GA4
   - Comply with GDPR/CCPA requirements

2. **Development vs Production**:
   - GA only loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
   - Use different IDs for dev/staging/production if needed

3. **Data Retention**:
   - GA4 default is 2 months for events, 14 months for user data
   - Adjust in GA4 settings if needed

## 🚀 Advanced Features

### Enhanced E-commerce (Future):
```javascript
// Track product interactions
gtagProductView({
  id: 'plasma-cutter-001',
  name: 'CNC Plasma Cutter',
  category: 'Cutting Equipment',
  price: 50000
});
```

### Custom Dimensions:
Create custom dimensions in GA4 for:
- Customer type (B2B/B2C)
- Industry sector
- Product interest level

## 📞 Support

For GA4 issues:
- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Debug View](https://support.google.com/analytics/answer/7201382)
- [GA4 Community](https://support.google.com/analytics/community)

## ✅ Checklist

- [ ] Created GA4 property
- [ ] Got Measurement ID
- [ ] Added to `.env.local`
- [ ] Added to Netlify environment variables
- [ ] Deployed website
- [ ] Verified in GA4 Realtime
- [ ] Set up conversions
- [ ] Updated privacy policy