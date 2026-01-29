import { TenantProvider } from '@/context/TenantContext';
import TenantHeader from '@/components/TenantHeader';
import TenantActions from '@/components/TenantActions';
import Navbar from '@/components/Navbar'; // Import Navbar for 404 page

function TenantPageContent({ tenant, data }) {
  // ... (keep existing TenantPageContent logic if needed, or remove if unused for logic below)
  // For brevity, I'm keeping the original function but it might not be used if we route early.
  // Actually, let's keep it for the generic "parlet", "mango" etc. if we still want to support them as "valid" test tenants.
  return (
    <>
      <TenantHeader />
      <div style={{ padding: 40, fontFamily: "sans-serif", lineHeight: 1.6 }}>
        <h1 style={{ color: data.color, fontSize: 48 }}>
          {data.logo} {data.name}
        </h1>
        <p style={{ fontSize: 16, color: "#666" }}>{data.description}</p>
        <TenantActions />
        {/* ... rest of original content ... */}
      </div>
    </>
  );
}

import { getAllBlogs } from '@/lib/blogManager';
import BlogContainer from '@/components/Blog/BlogContainer';
import BlogHeader from '@/components/Blog/BlogHeader';
import { notFound } from 'next/navigation';

export default async function TenantPage({ params, searchParams }) {
  const { tenant } = params;
  const blogId = searchParams?.blogID;

  // 1. Define Valid Tenants
  // 'blogs' is the main one. We can keep 'parlet', 'mango' for testing if desired, or restrict strictly.
  // The user implies they want *any* other subdomain to show 404. 
  // Let's treat 'blogs' as the ONLY valid production-like tenant for now to be safe, 
  // or maybe include the test ones if they are actually used.
  // Given user said "any other subdomain rather than blogs", let's assume 'blogs' is the only "real" one.
  // However, to avoid breaking existing demos if they care, I'll keep the logic flexible.

  // Real valid tenants
  const VALID_TENANTS = ['blogs'];

  // Check if it's a valid tenant
  const isValidTenant = VALID_TENANTS.includes(tenant);

  // 2. Handle 'blogs' specifically (custom UI)
  if (tenant === 'blogs') {
    const blogs = await getAllBlogs();
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)' }}>
        <BlogHeader />
        <BlogContainer initialBlogs={blogs} initialBlogId={blogId} />
      </div>
    );
  }

  // 3. Handle Invalid Tenants -> Standard 404
  if (!isValidTenant) {
    notFound();
  }

  // 4. (Optional) Handle other "test" tenants if we want to keep them for debug?
  // If we want ONLY blogs, the above `!isValidTenant` catches everything else.
  // If the user wants to keep `parlet`/`mango` working, add them to `VALID_TENANTS`.
  // Based on "any other subdomain rather than blogs... show this screen", I will treat everything else as 404.

  return null; // Should be unreachable if logic covers all cases
}
