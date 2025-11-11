import { useState } from 'react';
import Tab from '../common/Tab';

// Higher-Order Component for Sidebar
const withSidebar = (tabs) => {
  return function Sidebar({ visibleTabs }) {
    const [activeTab, setActiveTab] = useState(visibleTabs[0]);

    const displayTabs = tabs.filter(tab => visibleTabs.includes(tab.id));

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
};

export default withSidebar;
