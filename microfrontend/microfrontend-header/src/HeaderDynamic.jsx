import { useState, useEffect } from 'react';
import Tab from './components/Tab';
import { fetchAvailableTabs } from './config/tabsConfig';
import './styles.css';

/**
 * Dynamic Header Component
 * This version fetches tabs from an API/backend instead of hardcoding them
 * The tabs are NOT bundled in the JavaScript - they come from the server
 */
const HeaderDynamic = ({ role, username, onLogout, authToken }) => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tabs from backend when component mounts or role changes
    const loadTabs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch tabs from API based on user's role/token
        const fetchedTabs = await fetchAvailableTabs(role);
        
        setTabs(fetchedTabs);
        if (fetchedTabs.length > 0) {
          setActiveTab(fetchedTabs[0].id);
        }
      } catch (err) {
        console.error('Failed to load tabs:', err);
        setError('Failed to load navigation tabs');
        // Set minimal fallback tabs
        setTabs([{ id: 1, label: 'Dashboard' }]);
        setActiveTab(1);
      } finally {
        setLoading(false);
      }
    };

    loadTabs();
  }, [role, authToken]); // Re-fetch when role or auth token changes

  if (loading) {
    return (
      <header className="header">
        <div className="header-logo">
          <h1>Dynamic App (MFE-V2)</h1>
        </div>
        <nav className="header-nav">
          <div style={{ padding: '10px', color: '#666' }}>Loading navigation...</div>
        </nav>
        <div className="header-user">
          <span className="username">👤 {username}</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header className="header">
        <div className="header-logo">
          <h1>Dynamic App (MFE-V2)</h1>
        </div>
        <nav className="header-nav">
          <div style={{ padding: '10px', color: '#d32f2f' }}>{error}</div>
        </nav>
        <div className="header-user">
          <span className="username">👤 {username}</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-logo">
        <h1>Dynamic App (MFE-V2)</h1>
      </div>
      <nav className="header-nav">
        {tabs.map((tab) => (
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

export default HeaderDynamic;
