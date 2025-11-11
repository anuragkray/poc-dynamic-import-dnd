import { lazy, Suspense } from 'react';

// Lazy load components for Basic users
const Header = lazy(() => import('../../components/layout/Header'));
const Sidebar = lazy(() => import('../../components/layout/Sidebar'));
const MainContent = lazy(() => import('../../components/layout/MainContent'));

const BasicLayout = ({ config, username, onLogout }) => {
  return (
    <div className="app-layout">
      <Suspense fallback={<div className="loading">Loading Header...</div>}>
        <Header visibleTabs={config.headerTabs} username={username} onLogout={onLogout} />
      </Suspense>
      
      <div className="app-body">
        <Suspense fallback={<div className="loading">Loading Sidebar...</div>}>
          <Sidebar visibleTabs={config.sidebarTabs} />
        </Suspense>
        
        <Suspense fallback={<div className="loading">Loading Content...</div>}>
          <MainContent visibleCards={config.mainContentCards} />
        </Suspense>
      </div>
    </div>
  );
};

export default BasicLayout;
