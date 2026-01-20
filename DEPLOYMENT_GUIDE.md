# Multi-Tenant Vercel Deployment Guide

## Option 1: Prefix-Based Routing (Easiest)

This uses Vercel's automatic subdomain feature.

### Local Testing

```bash
npm run dev
```

Test with curl:
```bash
curl http://localhost:3000 -H "Host: parlet-app.vercel.app"
curl http://localhost:3000 -H "Host: mango-app.vercel.app"
```

Expected output: Tenant page with tenant name

### Deployment

1. Push to GitHub
2. Connect to Vercel
3. Deploy

After deployment, visit:
```
https://parlet-yourapp.vercel.app
https://mango-yourapp.vercel.app
```

No additional DNS setup needed.

---

## Option 2: True Subdomains (Production)

This uses your custom domain with wildcard DNS.

### Prerequisites

- Custom domain (e.g., `biscuit.com`)
- DNS access

### Setup

1. **Add domain in Vercel:**
   - Dashboard → Domains → Add `biscuit.com`

2. **Add wildcard CNAME at DNS provider:**
   ```
   Type: CNAME
   Name: *
   Value: cname.vercel-dns.com
   ```

3. **Test after DNS propagates (5-30 min):**
   ```
   https://parlet.biscuit.com
   https://mango.biscuit.com
   ```

---

## Local Testing with Subdomains

Your OS automatically resolves `*.localhost` to `127.0.0.1`, so just use:

```
http://parlet.localhost:3000
http://mango.localhost:3000
```

No hosts file or DNS setup needed.

---

## How Middleware Routes Work

The middleware in `middleware.ts` automatically detects:

| Environment | Example | Detection |
|---|---|---|
| Localhost | `parlet.localhost:3000` | Subdomain extraction |
| Vercel Preview | `parlet-app.vercel.app` | Prefix extraction |
| Custom Domain | `parlet.biscuit.com` | Subdomain extraction |

Same code, different environments.

---

## Adding More Tenants

1. Add to `app/_sites/[tenant]/page.js` `tenantData` object:

```javascript
const tenantData = {
  parlet: { ... },
  mango: { ... },
  yournewtenant: {
    name: "Your New Tenant",
    color: "purple",
    description: "...",
    logo: "🎨"
  }
};
```

2. No code changes needed. Middleware handles it.

3. Visit: `https://yournewtenant.yourdomain.com` or `https://yournewtenant-app.vercel.app`

---

## Database Integration (Production)

Instead of hardcoding tenant data:

```javascript
// ❌ Current (hardcoded)
const tenantData = { parlet: { ... }, mango: { ... } };

// ✅ Production (database)
const data = await db.getTenant(tenant);
```

Supports:
- Unlimited tenants
- Dynamic data loading
- Per-tenant customization
- Real SaaS scaling

---

## Security Notes

- Middleware validates all requests
- Tenant extraction happens server-side
- Client never sees other tenant data
- Use database queries filtered by tenant
- Implement auth checks per tenant

---

## Troubleshooting

**Issue:** `localhost.localdomain:3000` not resolving
- Solution: Use `parlet.localhost:3000` instead (built into OS)

**Issue:** Vercel showing wrong tenant
- Check middleware extraction logic
- Verify hostname format

**Issue:** Custom domain not working
- Wait 30+ minutes for DNS propagation
- Verify CNAME record in DNS provider
- Check Vercel domain settings

