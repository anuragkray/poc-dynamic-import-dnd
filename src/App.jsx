import { useState, lazy, Suspense } from 'react';
import LoginPage from './components/auth/LoginPage';
import { ROLES, roleConfig } from './config/roleConfig';
import './App.css';

// Dynamic imports for each role's layout - only the selected role's module will be loaded
const BasicLayout = lazy(() => import('./modules/basic/BasicLayout'));
const StandardLayout = lazy(() => import('./modules/standard/StandardLayout'));
const PremiumLayout = lazy(() => import('./modules/premium/PremiumLayout'));

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

  const renderLayout = () => {
    const config = roleConfig[userRole];

    switch (userRole) {
      case ROLES.BASIC:
        return (
          <Suspense fallback={<div className="loading-module">Loading Basic Module...</div>}>
            <BasicLayout config={config} username={username} onLogout={handleLogout} />
          </Suspense>
        );
      case ROLES.STANDARD:
        return (
          <Suspense fallback={<div className="loading-module">Loading Standard Module...</div>}>
            <StandardLayout config={config} username={username} onLogout={handleLogout} />
          </Suspense>
        );
      case ROLES.PREMIUM:
        return (
          <Suspense fallback={<div className="loading-module">Loading Premium Module...</div>}>
            <PremiumLayout config={config} username={username} onLogout={handleLogout} />
          </Suspense>
        );
      default:
        return <div>Invalid role</div>;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      {renderLayout()}
    </div>
  );
}

export default App;
