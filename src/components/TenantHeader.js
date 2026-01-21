'use client';

import { useTenant } from '@/context/TenantContext';
import strings from '@/data/config/strings.json';

export default function TenantHeader() {
  const { tenant, tenantData } = useTenant();
  const tenantName = strings.tenants[tenant]?.name || tenantData.name;

  return (
    <header className="flex" style={{
      backgroundColor: 'var(--color-accent)',
      color: 'var(--color-bg)',
      padding: 'var(--spacing-lg) var(--spacing-xl)',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid var(--color-border)'
    }}>
      <div className="flex" style={{ alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <span style={{ fontSize: '2rem' }}>{tenantData.logo}</span>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
            {tenantName}
          </h1>
          <div style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase', fontWeight: '500' }}>
            {tenant}
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 'var(--spacing-xs) var(--spacing-sm)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.75rem',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        Mode: <strong>Production</strong>
      </div>
    </header>
  );
}

