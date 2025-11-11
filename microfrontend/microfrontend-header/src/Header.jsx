import { useState } from 'react';
import Tab from './components/Tab';
import { ALL_HEADER_TABS, getVisibleItems } from '../../shared/config/navigationConfig';
import './styles.css';

const Header = ({ role, visibleTabs, username, onLogout }) => {
  const [activeTab, setActiveTab] = useState(visibleTabs[0]);

  const displayTabs = getVisibleItems(ALL_HEADER_TABS, visibleTabs);

  return (
    <header className="header">
      <div className="header-logo">
        <h1>Dynamic App (MFE-V2)</h1>
      </div>
      <nav className="header-nav">
        {displayTabs.map((tab) => (
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

export default Header;
