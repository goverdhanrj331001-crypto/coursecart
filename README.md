# BrainBridge — Learning & Coaching Platform

A full-stack learning platform built with Next.js 15, Supabase, and Tailwind CSS. Includes course management, student enrollment, payment integration (Razorpay), and an admin dashboard.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS v4
- **Payments:** Razorpay
- **Auth:** Supabase Auth
- **Animations:** Motion

## Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/goverdhanrj331001-crypto/coursecart.git
cd coursecart
npm install
```

### 2. Configure environment variables

Create a `.env` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
BB_OWNER_PASSWORD=your_admin_password
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- 🎓 Course catalog with categories and filtering
- 🛒 Checkout flow with Razorpay payment integration
- 👨‍🎓 Student dashboard with progress tracking
- 🔐 Admin dashboard (Supabase Auth protected)
- 📱 Fully responsive design
- 🌙 Study materials & brochure download

## Deployment

Deployed on [Vercel](https://vercel.com). Add environment variables in Vercel project settings before deploying.

## License

Private — All rights reserved.
