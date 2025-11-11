import { lazy, Suspense } from 'react';

// Lazy load ONLY Basic-specific components
const BasicHeader = lazy(() => import('../../components/layout/BasicHeader'));
const BasicSidebar = lazy(() => import('../../components/layout/BasicSidebar'));
const BasicMainContent = lazy(() => import('../../components/layout/BasicMainContent'));

const BasicLayout = ({ config, username, onLogout }) => {
  return (
    <div className="app-layout">
      <Suspense fallback={<div className="loading">Loading Header...</div>}>
        <BasicHeader visibleTabs={config.headerTabs} username={username} onLogout={onLogout} />
      </Suspense>
      
      <div className="app-body">
        <Suspense fallback={<div className="loading">Loading Sidebar...</div>}>
          <BasicSidebar visibleTabs={config.sidebarTabs} />
        </Suspense>
        
        <Suspense fallback={<div className="loading">Loading Content...</div>}>
          <BasicMainContent visibleCards={config.mainContentCards} />
        </Suspense>
      </div>
    </div>
  );
};

export default BasicLayout;
