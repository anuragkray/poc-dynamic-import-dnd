import { useState } from 'react';
import Tab from '../common/Tab';

const BasicSidebar = ({ visibleTabs }) => {
  const [activeTab, setActiveTab] = useState(visibleTabs[0]);

  // Only Basic user sidebar tabs - IDs 1, 3, 6, 9
  const allTabs = [
    { id: 1, label: 'Overview' },
    { id: 3, label: 'Documents' },
    { id: 6, label: 'Tasks' },
    { id: 9, label: 'Resources' }
  ];

  const displayTabs = allTabs.filter(tab => visibleTabs.includes(tab.id));

  console.log('🔶 BASIC SIDEBAR - Loaded and Rendering:');
  console.log('  → Only Basic sidebar tabs code downloaded');
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

export default BasicSidebar;
