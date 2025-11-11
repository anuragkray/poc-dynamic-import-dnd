import { useState } from 'react';
import Tab from './components/Tab';
import './styles.css';

// All possible sidebar tabs for all roles
const allTabs = [
  { id: 1, label: 'Overview' },
  { id: 2, label: 'Projects' },
  { id: 3, label: 'Documents' },
  { id: 4, label: 'Calendar' },
  { id: 5, label: 'Reports' },
  { id: 6, label: 'Tasks' },
  { id: 7, label: 'Team' },
  { id: 8, label: 'Messages' },
  { id: 9, label: 'Resources' },
  { id: 10, label: 'Settings' }
];

const Sidebar = ({ role, visibleTabs }) => {
  const [activeTab, setActiveTab] = useState(visibleTabs[0]);

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
