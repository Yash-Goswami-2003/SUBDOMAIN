'use client';

import { TenantProvider } from '@/context/TenantContext';
import TenantHeader from '@/components/TenantHeader';
import TenantActions from '@/components/TenantActions';

function TenantPageContent({ tenant, data }) {
  return (
    <>
      <TenantHeader />
      <div style={{ padding: 40, fontFamily: "sans-serif", lineHeight: 1.6 }}>
        <h1 style={{ color: data.color, fontSize: 48 }}>
        {data.logo} {data.name}
      </h1>
      <p style={{ fontSize: 16, color: "#666" }}>{data.description}</p>
      
      <TenantActions />

      <div style={{ 
        backgroundColor: "#f0f0f0", 
        padding: 20, 
        borderRadius: 8, 
        marginTop: 20,
        marginBottom: 20
      }}>
        <p><strong>Tenant ID:</strong> <code>{tenant}</code></p>
        <p><strong>Rendering:</strong> Dynamically based on subdomain/prefix</p>
        <p><strong>Context:</strong> Available to all child components via useTenant()</p>
      </div>

      <hr style={{ margin: "30px 0", border: "none", borderTop: "1px solid #ddd" }} />
      
      <h2>🧪 Test different routes:</h2>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: 20,
        marginTop: 20
      }}>
        <div style={{ backgroundColor: "#e3f2fd", padding: 15, borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Localhost (Subdomains)</h3>
          <ul style={{ marginBottom: 0 }}>
            <li><a href="http://parlet.localhost:3000">parlet.localhost:3000</a></li>
            <li><a href="http://mango.localhost:3000">mango.localhost:3000</a></li>
            <li><a href="http://localhost:3000">localhost:3000</a></li>
          </ul>
        </div>

        <div style={{ backgroundColor: "#fff3e0", padding: 15, borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Vercel Preview (Prefix)</h3>
          <p style={{ fontSize: 12, color: "#666", marginBottom: 10 }}>
            After deployment, use:
          </p>
          <code style={{ display: "block", color: "#d32f2f" }}>
            parlet-yourapp.vercel.app
          </code>
        </div>
      </div>

      <hr style={{ margin: "30px 0", border: "none", borderTop: "1px solid #ddd" }} />
      
      <details style={{ 
        backgroundColor: "#fafafa", 
        padding: 15, 
        borderRadius: 8,
        cursor: "pointer"
      }}>
        <summary style={{ fontWeight: "bold", fontSize: 16 }}>
          📖 How this works (technical breakdown)
        </summary>
        <div style={{ marginTop: 15 }}>
          <h4>Request Flow:</h4>
          <ol>
            <li>You visit <code>parlet.localhost:3000</code></li>
            <li>Browser sends HTTP request with <code>Host: parlet.localhost:3000</code> header</li>
            <li>Next.js middleware intercepts the request</li>
            <li>Middleware reads the Host header and extracts: <code>parlet</code></li>
            <li>Request is internally rewritten to <code>/_sites/parlet</code></li>
            <li>This page renders with tenant-specific data</li>
            <li>Browser URL remains <code>parlet.localhost:3000</code> (invisible rewrite)</li>
          </ol>

          <h4>Why this matters:</h4>
          <ul>
            <li>✅ Single Next.js app serves all tenants</li>
            <li>✅ One deployment</li>
            <li>✅ Tenant isolated by subdomain/prefix, not path</li>
            <li>✅ Scales to thousands of tenants</li>
            <li>✅ No DNS setup needed for localhost</li>
          </ul>

          <h4>On Vercel:</h4>
          <ul>
            <li>Prefix-based: <code>parlet-app.vercel.app</code> → extracts "parlet"</li>
            <li>Subdomains: <code>parlet.yourdomain.com</code> → extracts "parlet"</li>
            <li>Same middleware handles both</li>
          </ul>
        </div>
      </details>
      </div>
    </>
  );
}

export default function TenantPage({ params }) {
  const { tenant } = params;

  // Tenant-specific data (in production, fetch from database)
  const tenantData = {
    parlet: {
      name: "Parlet",
      color: "blue",
      description: "The Parlet tenant site",
      logo: "🦜"
    },
    mango: {
      name: "Mango",
      color: "orange",
      description: "The Mango tenant site",
      logo: "🥭"
    },
    wordcell: {
      name: "Wordcell",
      color: "#8e44ad", 
      description: "The Wordcell tenant site",
      logo: "📝"
    }
  };

  const data = tenantData[tenant] || {
    name: tenant.charAt(0).toUpperCase() + tenant.slice(1),
    color: "gray",
    description: `The ${tenant} tenant site`,
    logo: "🏢"
  };

  return (
    <TenantProvider tenant={tenant} tenantData={data}>
      <TenantPageContent tenant={tenant} data={data} />
    </TenantProvider>
  );
}
