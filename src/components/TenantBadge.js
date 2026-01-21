'use client';

import { useTenant } from '@/context/TenantContext';

export default function TenantBadge() {
  const { tenant, tenantData } = useTenant();

  return (
    <div className="badge" style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--spacing-xs)',
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-text-primary)',
      padding: 'var(--spacing-xs) var(--spacing-sm)',
      borderRadius: 'var(--radius-lg)',
      fontSize: '0.75rem',
      fontWeight: '600',
      border: '1px solid var(--color-border)',
      whiteSpace: 'nowrap',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }}>
      <span style={{ fontSize: '1rem' }}>{tenantData.logo}</span>
      {tenant}
    </div>
  );
}

