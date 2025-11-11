import { lazy, Suspense } from 'react';

// Lazy load ONLY Standard-specific components
const StandardHeader = lazy(() => import('../../components/layout/StandardHeader'));
const StandardSidebar = lazy(() => import('../../components/layout/StandardSidebar'));
const StandardMainContent = lazy(() => import('../../components/layout/StandardMainContent'));

const StandardLayout = ({ config, username, onLogout }) => {
  console.log('✅ STANDARD LAYOUT - Only Standard components will be downloaded');
  
  return (
    <div className="app-layout">
      <Suspense fallback={<div className="loading">Loading Header...</div>}>
        <StandardHeader visibleTabs={config.headerTabs} username={username} onLogout={onLogout} />
      </Suspense>
      
      <div className="app-body">
        <Suspense fallback={<div className="loading">Loading Sidebar...</div>}>
          <StandardSidebar visibleTabs={config.sidebarTabs} />
        </Suspense>
        
        <Suspense fallback={<div className="loading">Loading Content...</div>}>
          <StandardMainContent visibleCards={config.mainContentCards} />
        </Suspense>
      </div>
    </div>
  );
};

export default StandardLayout;
