# Quick Reference

## File Locations (What You Changed)

```
multitenant-app/
├── middleware.ts                    ← Subdomain extraction logic
├── src/app/
│   └── _sites/
│       └── [tenant]/
│           └── page.js              ← Tenant-specific page
├── MULTITENANT_README.md            ← Main docs
├── DEPLOYMENT_GUIDE.md              ← Vercel deployment
└── TEST_SCENARIOS.md                ← Test cases
```

---

## How to Test

### Start Server
```bash
npm run dev
```

### Test URLs
```
http://parlet.localhost:3000       # Parlet tenant
http://mango.localhost:3000        # Mango tenant
http://localhost:3000              # Root page
```

### Expected Output
Shows tenant name, color, and emoji based on tenant

---

## How Middleware Works

```
Request arrives at parlet.localhost:3000
    ↓
middleware.ts reads Host header: "parlet.localhost:3000"
    ↓
Extracts hostname: "parlet.localhost"
    ↓
Splits into parts: ["parlet", "localhost"]
    ↓
First part is subdomain: "parlet"
    ↓
Rewrites to: /_sites/parlet/
    ↓
Page component receives: params.tenant = "parlet"
    ↓
Tenant page renders with parlet data
```

---

## Key Code Patterns

### Extract tenant from params (in component)
```javascript
export default function TenantPage({ params }) {
  const { tenant } = params;  // "parlet", "mango", etc
  return <h1>{tenant}</h1>;
}
```

### Detect Vercel vs localhost (in middleware)
```typescript
if (hostname.includes(".vercel.app")) {
  // Vercel: extract from prefix
} else {
  // Localhost/custom domain: extract from subdomain
}
```

### Handle all three environments
Same middleware + same page = works everywhere

| Environment | URL | Works |
|---|---|---|
| Local | `parlet.localhost:3000` | ✅ |
| Vercel Preview | `parlet-app.vercel.app` | ✅ |
| Custom Domain | `parlet.biscuit.com` | ✅ |

---

## Add New Tenant (2 Steps)

### Step 1: Edit `src/app/_sites/[tenant]/page.js`
```javascript
const tenantData = {
  parlet: { name: "Parlet", color: "blue", ... },
  mango: { name: "Mango", color: "orange", ... },
  // Add new tenant:
  newco: { name: "New Co", color: "green", logo: "🌿" }
};
```

### Step 2: Visit URL
```
http://newco.localhost:3000
```

That's it! Middleware handles everything else.

---

## Deploy to Vercel (3 Steps)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add multitenant setup"
git push
```

### Step 2: Connect to Vercel
- Go to vercel.com
- Import your repository
- Deploy (takes 1 min)

### Step 3: Test
```
https://parlet-yourapp.vercel.app
https://mango-yourapp.vercel.app
```

Done! Works with no DNS setup.

---

## Common Patterns

### Fetch data per tenant
```javascript
async function getTenantData(tenant) {
  return await db.query({ tenantId: tenant });
}
```

### API route per tenant
```typescript
// api/[tenant]/data.ts
export default async function handler(req, res) {
  const { tenant } = req.query;
  const data = await getTenantData(tenant);
  res.json(data);
}
```

### Middleware debugging
```typescript
// Add to middleware.ts
console.log(`Tenant: ${tenant}`);
console.log(`Rewrite to: /_sites/${tenant}`);
```

View logs in terminal running `npm run dev`

---

## Why This Works

| Layer | What It Does | How It Helps |
|-------|---|---|
| DNS | Routes `*.localhost` to `127.0.0.1` | Works without DNS setup |
| Middleware | Reads Host header, extracts tenant | Converts domain to path |
| Page Component | Receives tenant in params | Renders tenant-specific content |
| Next.js | Routes to `/_sites/[tenant]` | Dynamic rendering |

---

## Security Checklist

- ✅ Tenant extracted server-side (not from URL)
- ✅ Middleware runs before page component
- ✅ All queries should filter by tenant ID
- ✅ Auth should verify tenant ownership
- ✅ Don't trust client input for tenant

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `localhost:3000` works but `parlet.localhost:3000` fails | Browser supports `*.localhost` natively, but if it doesn't, use `nip.io`: `parlet.127.0.0.1.nip.io:3000` |
| Middleware not running | Restart dev server after creating `middleware.ts` |
| Vercel shows wrong tenant | Check prefix extraction: `parlet-app` → `parlet` |
| New tenant page 404 | Verify tenant data exists in `tenantData` object |

---

## Next Steps

1. ✅ Local testing works
2. ✅ Add more tenants (edit `tenantData`)
3. ✅ Deploy to Vercel (git push)
4. ⬜ Connect database (Supabase, Prisma, etc)
5. ⬜ Add auth per tenant
6. ⬜ Custom branding per tenant

See `DEPLOYMENT_GUIDE.md` and `TEST_SCENARIOS.md` for details.

