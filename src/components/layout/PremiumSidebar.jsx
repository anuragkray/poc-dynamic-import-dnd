import { useState } from 'react';
import Tab from '../common/Tab';

const PremiumSidebar = ({ visibleTabs }) => {
  const [activeTab, setActiveTab] = useState(visibleTabs[0]);

  // All sidebar tabs for Premium users - IDs 1-10
  const allTabs = [
    { id: 1, label: 'Overview' },
    { id: 2, label: 'Statistics' },
    { id: 3, label: 'Documents' },
    { id: 4, label: 'Calendar' },
    { id: 5, label: 'Messages' },
    { id: 6, label: 'Tasks' },
    { id: 7, label: 'Projects' },
    { id: 8, label: 'Team' },
    { id: 9, label: 'Resources' },
    { id: 10, label: 'Help' }
  ];

  const displayTabs = allTabs.filter(tab => visibleTabs.includes(tab.id));

  console.log('🔶 PREMIUM SIDEBAR - Loaded and Rendering:');
  console.log('  → All Premium sidebar tabs code downloaded');
  console.log('  → Rendering Tabs:', displayTabs.map(t => `${t.id}: ${t.label}`));

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      <nav className="sidebar-nav">
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
    </aside>
  );
};

export default PremiumSidebar;
