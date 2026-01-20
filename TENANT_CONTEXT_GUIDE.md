# Tenant Context & Components Guide

## Overview

The app now includes a **TenantContext** that allows any component to access the current tenant information.

## File Structure

```
src/
├── context/
│   └── TenantContext.js           ← Tenant context provider
├── components/
│   ├── TenantHeader.js            ← Header with tenant branding
│   ├── TenantBadge.js             ← Small tenant badge
│   └── TenantActions.js           ← Tenant-specific actions
└── app/
    └── _sites/
        └── [tenant]/
            └── page.js            ← Uses TenantProvider
```

---

## TenantContext

### What it does

Provides tenant information to all child components without prop drilling.

### Location

[src/context/TenantContext.js](src/context/TenantContext.js)

### Usage in a Component

```javascript
'use client';

import { useTenant } from '@/context/TenantContext';

export default function MyComponent() {
  const { tenant, tenantData } = useTenant();

  return (
    <div>
      <h1>{tenantData.name}</h1>
      <p>Tenant ID: {tenant}</p>
      <p>Logo: {tenantData.logo}</p>
      <p>Color: {tenantData.color}</p>
    </div>
  );
}
```

### Available Data

```javascript
const { tenant, tenantData } = useTenant();

// tenant = "parlet" or "mango" or any tenant ID
// tenantData = {
//   name: "Parlet",
//   color: "blue",
//   description: "...",
//   logo: "🦜"
// }
```

---

## Components

### TenantHeader

Shows tenant branding at the top of the page.

**Location:** [src/components/TenantHeader.js](src/components/TenantHeader.js)

**Features:**
- ✅ Dynamic color based on tenant
- ✅ Shows tenant logo
- ✅ Shows tenant ID
- ✅ "Viewing as" badge

**Used in:**
[src/app/_sites/[tenant]/page.js](src/app/_sites/[tenant]/page.js)

**Example:**
```javascript
import TenantHeader from '@/components/TenantHeader';

export default function Page() {
  return (
    <>
      <TenantHeader />
      <main>...</main>
    </>
  );
}
```

---

### TenantBadge

Small inline badge showing current tenant.

**Location:** [src/components/TenantBadge.js](src/components/TenantBadge.js)

**Features:**
- ✅ Compact display
- ✅ Tenant-specific color
- ✅ Logo + ID

**Example:**
```javascript
import TenantBadge from '@/components/TenantBadge';

export default function Page() {
  return (
    <div>
      <p>You are logged in as: <TenantBadge /></p>
    </div>
  );
}
```

**Renders:**
```
You are logged in as: 🦜 PARLET
```

---

### TenantActions

Tenant-specific action buttons.

**Location:** [src/components/TenantActions.js](src/components/TenantActions.js)

**Features:**
- ✅ Different actions per tenant
- ✅ Dynamically colored buttons
- ✅ Fallback for unknown tenants
- ✅ Hover effects

**How it works:**

Each tenant can have custom actions:

```javascript
const tenantActions = {
  parlet: [
    { label: '🎯 View Campaigns', action: () => { /* ... */ } },
    { label: '📊 Analytics', action: () => { /* ... */ } },
    { label: '⚙️ Settings', action: () => { /* ... */ } }
  ],
  mango: [
    { label: '🛍️ Shop Products', action: () => { /* ... */ } },
    { label: '📦 Orders', action: () => { /* ... */ } },
    { label: '👥 Customers', action: () => { /* ... */ } }
  ]
};
```

**Example:**
```javascript
import TenantActions from '@/components/TenantActions';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <TenantActions />
    </div>
  );
}
```

---

## How It Works

### Setup (in tenant page)

```javascript
import { TenantProvider } from '@/context/TenantContext';
import TenantHeader from '@/components/TenantHeader';

export default function TenantPage({ params }) {
  const { tenant } = params;
  
  const data = tenantData[tenant];

  return (
    <TenantProvider tenant={tenant} tenantData={data}>
      <TenantHeader />
      <main>...</main>
    </TenantProvider>
  );
}
```

### Access (in child components)

```javascript
'use client';

import { useTenant } from '@/context/TenantContext';

export default function ChildComponent() {
  const { tenant, tenantData } = useTenant();
  
  // Use tenant info...
}
```

---

## Real-World Example

### Scenario: Build a dashboard with tenant-specific sections

```javascript
'use client';

import { useTenant } from '@/context/TenantContext';

export default function Dashboard() {
  const { tenant, tenantData } = useTenant();

  // Render different content based on tenant
  const sections = {
    parlet: [
      { title: 'Campaigns', data: getCampaigns(tenant) },
      { title: 'Analytics', data: getAnalytics(tenant) }
    ],
    mango: [
      { title: 'Products', data: getProducts(tenant) },
      { title: 'Orders', data: getOrders(tenant) }
    ]
  };

  const myData = sections[tenant] || sections.default;

  return (
    <div>
      <h1>{tenantData.name} Dashboard</h1>
      {myData.map(section => (
        <div key={section.title}>
          <h2>{section.title}</h2>
          {/* Render section data */}
        </div>
      ))}
    </div>
  );
}
```

---

## Adding Tenant-Specific Branding

### Step 1: Define tenant colors and logos

```javascript
const tenantData = {
  parlet: {
    name: "Parlet",
    color: "#2563eb",      // Blue
    logo: "🦜",
    accentColor: "#dbeafe",
    fontFamily: "Georgia"
  },
  mango: {
    name: "Mango",
    color: "#f97316",      // Orange
    logo: "🥭",
    accentColor: "#fed7aa",
    fontFamily: "Comic Sans"
  }
};
```

### Step 2: Use in styled components

```javascript
'use client';

import { useTenant } from '@/context/TenantContext';

export default function Card() {
  const { tenantData } = useTenant();

  return (
    <div style={{
      borderLeft: `4px solid ${tenantData.color}`,
      backgroundColor: tenantData.accentColor,
      padding: 16,
      borderRadius: 8
    }}>
      {/* Content */}
    </div>
  );
}
```

---

## Adding Conditional Rendering

### Hide/show features per tenant

```javascript
'use client';

import { useTenant } from '@/context/TenantContext';

export default function Features() {
  const { tenant } = useTenant();

  return (
    <div>
      {tenant === 'parlet' && (
        <div>
          <h3>Parlet-Exclusive Feature</h3>
          {/* Only visible for Parlet */}
        </div>
      )}

      {tenant === 'mango' && (
        <div>
          <h3>Mango-Exclusive Feature</h3>
          {/* Only visible for Mango */}
        </div>
      )}
    </div>
  );
}
```

---

## Adding Tenant-Specific Routes

### Create route within tenant space

```
app/
└── _sites/
    └── [tenant]/
        ├── page.js                ← Home
        ├── dashboard/
        │   └── page.js            ← /dashboard
        └── settings/
            └── page.js            ← /settings
```

All routes under `_sites/[tenant]` will have access to tenant via context.

### Example: Settings page

```javascript
'use client';

import { useTenant } from '@/context/TenantContext';

export default function SettingsPage() {
  const { tenant, tenantData } = useTenant();

  return (
    <div>
      <h1>Settings for {tenantData.name}</h1>
      {/* Settings specific to this tenant */}
    </div>
  );
}
```

---

## API Routes with Tenant

### Create tenant-specific API

```typescript
// app/_sites/[tenant]/api/data/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { tenant: string } }
) {
  const tenant = params.tenant;

  // ✅ Query database for this tenant only
  const data = await db.query({
    tenantId: tenant
  });

  return NextResponse.json(data);
}
```

### Call from component

```javascript
'use client';

import { useTenant } from '@/context/TenantContext';
import { useEffect, useState } from 'react';

export default function DataComponent() {
  const { tenant } = useTenant();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/_sites/${tenant}/api/data`)
      .then(r => r.json())
      .then(setData);
  }, [tenant]);

  return <div>{data && JSON.stringify(data)}</div>;
}
```

---

## Testing Different Tenants

### Visit different tenant URLs

```
http://parlet.localhost:3000    → TenantHeader shows blue with "Parlet"
http://mango.localhost:3000     → TenantHeader shows orange with "Mango"
http://custom.localhost:3000    → TenantHeader shows gray with "Custom"
```

Each will:
- ✅ Show different tenant header
- ✅ Display different actions
- ✅ Use different colors
- ✅ Provide tenant info to all components via context

---

## Common Patterns

### Logging with tenant

```javascript
const { tenant } = useTenant();

console.log(`[${tenant}] User action triggered`);
```

### Analytics with tenant

```javascript
const { tenant } = useTenant();

trackEvent({
  name: 'button_clicked',
  tenant: tenant  // ✅ Always tag events with tenant
});
```

### Fetch tenant-specific data

```javascript
const { tenant } = useTenant();

useEffect(() => {
  fetchUserData(tenant);
}, [tenant]);
```

---

## Important Notes

⚠️ **Must use 'use client'** in components that call `useTenant()`

```javascript
'use client';  // ← Required!

import { useTenant } from '@/context/TenantContext';
```

✅ **Works in Server Components** if you pass tenant as prop

```javascript
// Server component (no 'use client')
export default function Page({ params }) {
  const tenant = params.tenant;
  return <ChildComponent tenant={tenant} />;
}
```

---

## Next Steps

1. ✅ Context set up and working
2. ✅ Can access tenant in any component
3. ⬜ Add database queries filtered by tenant
4. ⬜ Add auth per tenant
5. ⬜ Add more tenant-specific components
6. ⬜ Add more tenants to data

