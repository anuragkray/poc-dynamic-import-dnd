import { useState } from 'react';
import Tab from '../common/Tab';

const PremiumHeader = ({ visibleTabs, username, onLogout }) => {
  const [activeTab, setActiveTab] = useState(visibleTabs[0]);

  // All tabs for Premium users - IDs 1-10
  const allTabs = [
    { id: 1, label: 'Dashboard' },
    { id: 2, label: 'Analytics' },
    { id: 3, label: 'Reports' },
    { id: 4, label: 'Settings' },
    { id: 5, label: 'Users' },
    { id: 6, label: 'Products' },
    { id: 7, label: 'Orders' },
    { id: 8, label: 'Inventory' },
    { id: 9, label: 'Billing' },
    { id: 10, label: 'Support' }
  ];

  const displayTabs = allTabs.filter(tab => visibleTabs.includes(tab.id));

  console.log('🔷 PREMIUM HEADER - Loaded and Rendering:');
  console.log('  → All Premium tabs code downloaded');
  console.log('  → Rendering Tabs:', displayTabs.map(t => `${t.id}: ${t.label}`));

  return (
    <header className="header">
      <div className="header-logo">
        <h1>MyApp</h1>
      </div>
      <nav className="header-nav">
        {displayTabs.map(tab => (
          <Tab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={setActiveTab}
          />
        ))}
      </nav>
      <div className="header-user">
        <span className="username">👤 {username}</span>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default PremiumHeader;
