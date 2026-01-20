# Multi-Tenant Next.js App (Subdomains & Vercel)

A production-ready multi-tenant SaaS architecture using subdomains and Vercel deployment.

## Quick Start

```bash
npm install
npm run dev
```

Visit:
- `http://parlet.localhost:3000` → Parlet's site
- `http://mango.localhost:3000` → Mango's site
- `http://localhost:3000` → Root site

## How It Works

```
parlet.localhost:3000
    ↓
[Middleware extracts subdomain: "parlet"]
    ↓
[Internally rewrites to: /_sites/parlet]
    ↓
[Tenant page renders with data]
    ↓
[URL stays the same in browser]
```

## Project Structure

```
app/
├── page.js                    # Root home page
├── layout.js                  # Root layout
├── globals.css                # Global styles
└── _sites/
    └── [tenant]/
        └── page.js            # Tenant-specific page

middleware.ts                  # Subdomain → path conversion
package.json
next.config.js
```

## Key Files

### [middleware.ts](middleware.ts)
Converts subdomain/prefix into internal path:
- Extracts subdomain: `parlet.localhost` → `parlet`
- Rewrites to: `/_sites/parlet`
- Supports Vercel prefix routing: `parlet-app.vercel.app` → `parlet`

### [src/app/_sites/[tenant]/page.js](src/app/_sites/[tenant]/page.js)
Dynamic tenant page:
- Receives tenant ID from params
- Loads tenant-specific data
- Renders customized content

## Deployment to Vercel

### Option 1: Prefix-Based (Easiest)

```bash
git push
```

After deployment:
```
https://parlet-yourapp.vercel.app
https://mango-yourapp.vercel.app
```

No DNS setup needed.

### Option 2: Custom Domain

1. Add domain in Vercel Dashboard
2. Add wildcard DNS: `*.yourdomain.com` → `cname.vercel-dns.com`
3. Visit: `https://parlet.yourdomain.com`

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for details.

## Testing

### Local (all three):
```bash
# Subdomains
http://parlet.localhost:3000
http://mango.localhost:3000

# Vercel prefix simulation (with curl)
curl http://localhost:3000 -H "Host: parlet-app.vercel.app"
```

### After Vercel deployment:
```
https://parlet-yourapp.vercel.app
https://mango-yourapp.vercel.app
```

## Adding New Tenants

1. Edit `src/app/_sites/[tenant]/page.js`
2. Add to `tenantData` object:

```javascript
const tenantData = {
  parlet: { name: "Parlet", color: "blue", ... },
  mango: { name: "Mango", color: "orange", ... },
  newtenant: { name: "New Tenant", color: "green", ... }
};
```

3. Visit: `http://newtenant.localhost:3000`

That's it. No database setup needed initially.

## Production Scale

For unlimited tenants, fetch from database:

```javascript
export default async function TenantPage({ params }) {
  const data = await db.getTenant(params.tenant);
  // render with data
}
```

## Mental Model

> **Middleware converts subdomains/prefixes into internal paths, so one Next.js app serves infinite tenants.**

| Layer | Handles |
|-------|---------|
| DNS / Vercel | Routes all subdomains to app |
| Middleware | Extracts tenant from host header |
| Pages | Render tenant-specific content |

## What's Possible

✅ Multi-tenant SaaS
✅ White-label platforms
✅ Per-client dashboards
✅ Custom landing pages
✅ API routes per tenant
✅ Auth per tenant
✅ Separate databases per tenant

## Next Steps

- Add authentication per tenant
- Connect to database (Supabase, Prisma, etc.)
- Implement per-tenant API routes
- Add custom branding
- Deploy to Vercel

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed steps.

## Questions?

- How does middleware work? → See `middleware.ts` comments
- How to add auth? → Separate endpoint per tenant
- How to use databases? → Query filtered by tenant ID
- How to deploy? → See `DEPLOYMENT_GUIDE.md`
