import { useState } from 'react';
import Tab from './components/Tab';
import './styles.css';

// All possible tabs for all roles
const allTabs = [
  { id: 1, label: 'Dashboard' },
  { id: 2, label: 'Analytics' },
  { id: 3, label: 'Reports' },
  { id: 4, label: 'Settings' },
  { id: 5, label: 'Projects' },
  { id: 6, label: 'Products' },
  { id: 7, label: 'Team' },
  { id: 8, label: 'Users' },
  { id: 9, label: 'Billing' },
  { id: 10, label: 'Help' }
];

const Header = ({ role, visibleTabs, username, onLogout }) => {
  const [activeTab, setActiveTab] = useState(visibleTabs[0]);

  const displayTabs = allTabs.filter(tab => visibleTabs.includes(tab.id));

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
