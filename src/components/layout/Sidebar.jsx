import { useState } from 'react';
import Tab from '../common/Tab';

const Sidebar = ({ visibleTabs }) => {
  const [activeTab, setActiveTab] = useState(visibleTabs[0]);

  const allTabs = [
    { id: 1, label: 'Home' },
    { id: 2, label: 'Profile' },
    { id: 3, label: 'Messages' },
    { id: 4, label: 'Notifications' },
    { id: 5, label: 'Calendar' },
    { id: 6, label: 'Tasks' },
    { id: 7, label: 'Projects' },
    { id: 8, label: 'Team' },
    { id: 9, label: 'Files' },
    { id: 10, label: 'Settings' }
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

export default Sidebar;
