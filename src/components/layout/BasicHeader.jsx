import { useState } from 'react';
import Tab from '../common/Tab';

const BasicHeader = ({ visibleTabs, username, onLogout }) => {
  const [activeTab, setActiveTab] = useState(visibleTabs[0]);

  // Only Basic user tabs - IDs 1, 3, 6, 9
  const allTabs = [
    { id: 1, label: 'Dashboard' },
    { id: 3, label: 'Reports' },
    { id: 6, label: 'Products' },
    { id: 9, label: 'Billing' }
  ];

  const displayTabs = allTabs.filter(tab => visibleTabs.includes(tab.id));

  console.log('🔷 BASIC HEADER - Loaded and Rendering:');
  console.log('  → Only Basic tabs code downloaded');
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

export default BasicHeader;
