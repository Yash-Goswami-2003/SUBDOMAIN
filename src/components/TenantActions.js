'use client';

import { useTenant } from '@/context/TenantContext';
import strings from '@/data/config/strings.json';

export default function TenantActions() {
  const { tenant } = useTenant();

  // Get actions from strings.json based on tenant
  const actions = strings.tenants[tenant]?.actions || [
    { label: strings.common.dashboard, key: 'dashboard' },
    { label: strings.common.settings, key: 'settings' }
  ];

  const handleAction = (label) => {
    alert(`${label} clicked for ${tenant}`);
  };

  return (
    <div className="grid" style={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      marginTop: '2rem'
    }}>
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={() => handleAction(action.label)}
          className="button"
          style={{ padding: '1.5rem' }}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

