import { useState } from 'react';
import Tab from '../common/Tab';

// Higher-Order Component for Header
const withHeader = (tabs) => {
  return function Header({ visibleTabs, username, onLogout }) {
    const [activeTab, setActiveTab] = useState(visibleTabs[0]);

    const displayTabs = tabs.filter(tab => visibleTabs.includes(tab.id));

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
};

export default withHeader;
