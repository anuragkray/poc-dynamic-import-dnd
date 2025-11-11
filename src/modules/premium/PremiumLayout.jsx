import { lazy, Suspense } from 'react';

// Lazy load ONLY Premium-specific components
const PremiumHeader = lazy(() => import('../../components/layout/PremiumHeader'));
const PremiumSidebar = lazy(() => import('../../components/layout/PremiumSidebar'));
const PremiumMainContent = lazy(() => import('../../components/layout/PremiumMainContent'));

const PremiumLayout = ({ config, username, onLogout }) => {
  return (
    <div className="app-layout premium">
      <Suspense fallback={<div className="loading">Loading Header...</div>}>
        <PremiumHeader visibleTabs={config.headerTabs} username={username} onLogout={onLogout} />
      </Suspense>
      
      <div className="app-body">
        <Suspense fallback={<div className="loading">Loading Sidebar...</div>}>
          <PremiumSidebar visibleTabs={config.sidebarTabs} />
        </Suspense>
        
        <Suspense fallback={<div className="loading">Loading Content...</div>}>
          <PremiumMainContent visibleCards={config.mainContentCards} />
        </Suspense>
      </div>
    </div>
  );
};

export default PremiumLayout;
