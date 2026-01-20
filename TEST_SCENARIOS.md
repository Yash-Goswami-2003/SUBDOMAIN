# Test Scenarios for Multi-Tenant App

## Local Testing (Localhost)

### ✅ Subdomain routing (working)

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Test each tenant
curl http://parlet.localhost:3000
curl http://mango.localhost:3000
curl http://anyname.localhost:3000  # New tenant (fallback)
```

Or open in browser:
- `http://parlet.localhost:3000`
- `http://mango.localhost:3000`
- `http://localhost:3000` (root site)

### Expected Behavior

| URL | Should Show | Tenant ID |
|-----|------------|-----------|
| `parlet.localhost:3000` | Parlet page (blue) | `parlet` |
| `mango.localhost:3000` | Mango page (orange) | `mango` |
| `custom.localhost:3000` | Generic page (gray) | `custom` |
| `www.localhost:3000` | Root page | (skipped) |
| `localhost:3000` | Root page | (skipped) |

---

## Vercel Preview Testing

### Prefix-based routing (parlet-app.vercel.app)

#### Test locally (simulate Vercel Host header)

```bash
# Start dev server
npm run dev

# In another terminal, test:
curl -H "Host: parlet-app.vercel.app" http://localhost:3000
curl -H "Host: mango-app.vercel.app" http://localhost:3000
```

Expected: Tenant pages render with correct tenant data

#### After deployment to Vercel

```
https://parlet-yourapp.vercel.app  → Parlet tenant
https://mango-yourapp.vercel.app   → Mango tenant
https://yourapp.vercel.app         → Root page
```

No DNS setup needed. Works immediately.

---

## Vercel with Custom Domain

### Setup (one-time)

1. Buy domain (e.g., `biscuit.com`)
2. Vercel Dashboard → Domains → Add `biscuit.com`
3. DNS provider → Add CNAME:
   ```
   Name: *
   Value: cname.vercel-dns.com
   TTL: 3600
   ```
4. Wait 5-30 minutes for propagation

### Test

```
https://parlet.biscuit.com   → Parlet tenant
https://mango.biscuit.com    → Mango tenant
https://biscuit.com          → Root page
```

---

## Middleware Test Cases

### Case 1: Localhost subdomain
```
Host: parlet.localhost:3000
→ Extracted: parlet
→ Rewrite: /_sites/parlet
→ Result: ✅ Tenant page
```

### Case 2: Vercel prefix
```
Host: parlet-app.vercel.app
→ Detected: .vercel.app domain
→ Prefix: parlet-app
→ Extracted: parlet
→ Rewrite: /_sites/parlet
→ Result: ✅ Tenant page
```

### Case 3: Custom domain subdomain
```
Host: parlet.biscuit.com
→ Subdomain: parlet
→ Domain: biscuit.com
→ Extracted: parlet
→ Rewrite: /_sites/parlet
→ Result: ✅ Tenant page
```

### Case 4: Root domain (no subdomain)
```
Host: localhost:3000
→ Parts: ["localhost"]
→ Length: 1 (need ≥ 2)
→ Result: ✅ Skip, show root page
```

### Case 5: www subdomain (skip)
```
Host: www.biscuit.com
→ Subdomain: www
→ Matches exclusion list
→ Result: ✅ Skip, show root page
```

---

## Network Inspection

### Using DevTools Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Visit `http://parlet.localhost:3000`
4. Look for first request

**Headers you'll see:**
```
Request Headers:
  Host: parlet.localhost:3000
  User-Agent: Mozilla/5.0 ...

Response Headers:
  x-middleware-rewrite: http://localhost:3000/_sites/parlet
```

⚠️ URL in browser stays: `http://parlet.localhost:3000` (rewrite is invisible)

---

## Adding New Tenant (Quick Test)

### Step 1: Add to data
Edit `src/app/_sites/[tenant]/page.js`:
```javascript
const tenantData = {
  parlet: { ... },
  mango: { ... },
  // Add new:
  testco: {
    name: "Test Co",
    color: "purple",
    description: "Test company tenant",
    logo: "🧪"
  }
};
```

### Step 2: Test
```
http://testco.localhost:3000
```

Expected: Shows "Test Co" page with purple color

No rebuild needed. Hot reload works.

---

## Debugging Tips

### Check middleware is running
Add console.log in `middleware.ts`:

```typescript
export function middleware(req) {
  const host = req.headers.get("host");
  console.log("Middleware intercepted:", host);
  // ... rest of code
}
```

View logs in terminal running `npm run dev`

### Test specific hostname
```bash
# Test parlet
curl -v http://localhost:3000 -H "Host: parlet.localhost:3000"

# Test mango
curl -v http://localhost:3000 -H "Host: mango.localhost:3000"

# Test Vercel prefix
curl -v http://localhost:3000 -H "Host: parlet-app.vercel.app"
```

### Verify page structure
```bash
# Check the file was created
ls src/app/_sites/[tenant]/

# Check middleware exists
ls middleware.ts

# Check it loads in page
grep "tenant" src/app/_sites/[tenant]/page.js
```

---

## Common Issues & Fixes

### Issue: localhost resolving but subdomain not working

**Symptom:**
```
http://localhost:3000  ✅ Works
http://parlet.localhost:3000  ❌ Not found
```

**Fix:**
- Modern browsers support `*.localhost` natively
- If not working, use `127.0.0.1.nip.io` instead:
  ```
  http://parlet.127.0.0.1.nip.io:3000
  ```

### Issue: Middleware not running

**Check:**
1. File is at root: `/middleware.ts` (not `src/middleware.ts`)
2. Function is exported: `export function middleware`
3. Config is set: `export const config = { matcher: [...] }`
4. Restart dev server after creating/editing

### Issue: Vercel works but showing wrong tenant

**Debug:**
1. Check prefix extraction: `parlet-app` → `parlet` ✓
2. Verify tenant data exists: Check `tenantData` object
3. Rebuild: `npm run build`

---

## Performance Notes

- ✅ Middleware runs on edge (super fast)
- ✅ Rewrite is invisible (no redirect/overhead)
- ✅ Database queries should be per-tenant (security)
- ✅ ISR/Caching works per tenant path

---

## Security Checklist

- ✅ Tenant extracted server-side (middleware)
- ✅ Client never sees other tenant data
- ✅ Database queries should filter by tenant
- ✅ Auth tokens should be tenant-scoped
- ✅ API routes should verify tenant from params
- ✅ Don't trust client-sent tenant ID

Example secure API route:

```typescript
// pages/api/[tenant]/data.ts
export default async function handler(req, res) {
  const { tenant } = req.query;
  const session = await auth(req);
  
  // ✅ Verify user owns this tenant
  if (session.tenantId !== tenant) {
    return res.status(403).json({ error: "Forbidden" });
  }
  
  // ✅ Query only this tenant's data
  const data = await db.getData({ tenantId: tenant });
  res.json(data);
}
```

