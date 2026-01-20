'use client';

import { useTenant } from '@/context/TenantContext';

export default function TenantActions() {
  const { tenant, tenantData } = useTenant();

  // Different actions per tenant type
  const tenantActions = {
    parlet: [
      { label: '🎯 View Campaigns', action: () => alert('Parlet campaigns') },
      { label: '📊 Analytics', action: () => alert('Parlet analytics') },
      { label: '⚙️ Settings', action: () => alert('Parlet settings') }
    ],
    mango: [
      { label: '🛍️ Shop Products', action: () => alert('Mango shop') },
      { label: '📦 Orders', action: () => alert('Mango orders') },
      { label: '👥 Customers', action: () => alert('Mango customers') }
    ],
    wordcell: [
      { label: '✍️ New Post', action: () => alert('Wordcell new post') },
      { label: '📚 Library', action: () => alert('Wordcell library') },
      { label: '📝 Drafts', action: () => alert('Wordcell drafts') }
    ]
  };

  const actions = tenantActions[tenant] || [
    { label: '📋 Dashboard', action: () => alert(`${tenant} dashboard`) },
    { label: '⚙️ Settings', action: () => alert(`${tenant} settings`) }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '12px',
      marginTop: '20px'
    }}>
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={action.action}
          style={{
            backgroundColor: tenantData.color || '#666',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'opacity 0.2s',
            opacity: 1
          }}
          onMouseOver={(e) => e.target.style.opacity = '0.8'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
