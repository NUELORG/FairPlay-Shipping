# FairPlay Shipping

Professional logistics website. Send packages, track shipments, manage status from admin.

## Setup (2 minutes)

### 1. Install
```bash
npm install
```

### 2. Database (when deployed)
Uses **Vercel Blob** — add from your Vercel dashboard, no external signup.

1. Deploy to [Vercel](https://vercel.com)
2. Project → **Storage** → **Create Database** → **Blob**
3. Connect to your project — token auto-added ✓

**Local dev?** Uses a local file. No setup needed.

### 3. Run
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy (Vercel)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add Blob storage (Storage tab) — token auto-added
4. Deploy

## Pages

- `/` — Home
- `/send` — Create shipment
- `/track/[id]` — Track package
- `/ticket/[id]` — Receipt after creating
- `/admin` — Change status (footer link)
- `/about`, `/services`, `/contact`
