import { useState } from 'react';
import Tab from '../common/Tab';

const StandardSidebar = ({ visibleTabs }) => {
  const [activeTab, setActiveTab] = useState(visibleTabs[0]);

  // Only Standard user sidebar tabs - IDs 1, 2, 4, 6, 8, 10
  const allTabs = [
    { id: 1, label: 'Overview' },
    { id: 2, label: 'Statistics' },
    { id: 4, label: 'Calendar' },
    { id: 6, label: 'Tasks' },
    { id: 8, label: 'Team' },
    { id: 10, label: 'Help' }
  ];

  const displayTabs = allTabs.filter(tab => visibleTabs.includes(tab.id));

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

export default StandardSidebar;
