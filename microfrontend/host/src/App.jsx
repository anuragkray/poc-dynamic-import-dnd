import { useState, lazy, Suspense } from 'react';
import LoginPage from './components/auth/LoginPage';
import { ROLES, roleConfig } from './config/roleConfig';
import './App.css';

// Dynamic imports for remote microfrontends - each component is a separate MFE
const HeaderComponent = lazy(() => import('headerMfe/Header'));
const SidebarComponent = lazy(() => import('sidebarMfe/Sidebar'));
const MainContentComponent = lazy(() => import('mainContentMfe/MainContent'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState('');

  const handleLogin = (role, user) => {
    setUserRole(role);
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUsername('');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const config = roleConfig[userRole];

  return (
    <div className="app">
      <div className="app-layout">
        {/* Header Microfrontend */}
        <Suspense fallback={<div className="loading-module">Loading Header...</div>}>
          <HeaderComponent 
            role={userRole}
            visibleTabs={config.headerTabs}
            username={username}
            onLogout={handleLogout}
          />
        </Suspense>

        <div className="app-body">
          {/* Sidebar Microfrontend */}
          <Suspense fallback={<div className="loading-module">Loading Sidebar...</div>}>
            <SidebarComponent 
              role={userRole}
              visibleTabs={config.sidebarTabs}
            />
          </Suspense>

          {/* MainContent Microfrontend */}
          <Suspense fallback={<div className="loading-module">Loading Content...</div>}>
            <MainContentComponent 
              role={userRole}
              visibleCards={config.mainContentCards}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
