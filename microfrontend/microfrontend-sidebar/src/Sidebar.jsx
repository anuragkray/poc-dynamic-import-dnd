import { useState } from 'react';
import Tab from './components/Tab';
import { ALL_SIDEBAR_TABS, getVisibleItems } from '../../shared/config/navigationConfig';
import './styles.css';

const Sidebar = ({ role, visibleTabs }) => {
  const [activeTab, setActiveTab] = useState(visibleTabs[0]);

  const displayTabs = getVisibleItems(ALL_SIDEBAR_TABS, visibleTabs);

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
