'use client';

import { useTenant } from '@/context/TenantContext';

export default function TenantHeader() {
  const { tenant, tenantData } = useTenant();

  return (
    <header style={{
      backgroundColor: tenantData.color || '#333',
      color: 'white',
      padding: '16px 24px',
      borderBottom: `4px solid ${tenantData.color || '#333'}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '24px' }}>{tenantData.logo}</span>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {tenantData.name}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>
            Tenant ID: {tenant}
          </div>
        </div>
      </div>
      
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        Viewing as: <strong>{tenant}</strong>
      </div>
    </header>
  );
}
