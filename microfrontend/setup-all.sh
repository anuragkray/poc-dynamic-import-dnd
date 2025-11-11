#!/bin/bash

# Script to set up all microfrontend applications
# This creates Header, Sidebar, and MainContent microfrontends

set -e

echo "🚀 Setting up Component-Based Microfrontend Architecture"
echo "========================================================="
echo ""

# Create Header MFE
echo "📦 Creating Header Microfrontend..."
mkdir -p microfrontend-v2/mfe-header/src/components

cat > microfrontend-v2/mfe-header/package.json << 'EOF'
{
  "name": "mfe-header",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port 5001",
    "build": "vite build",
    "preview": "vite preview --port 5001"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@originjs/vite-plugin-federation": "^1.3.6",
    "@vitejs/plugin-react": "^5.1.0",
    "vite": "^7.2.2"
  }
}
EOF

cat > microfrontend-v2/mfe-header/vite.config.js << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'headerMfe',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/Header.jsx',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.2.0',
        },
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5001,
  },
});
EOF

cat > microfrontend-v2/mfe-header/src/components/Tab.jsx << 'EOF'
const Tab = ({ id, label, isActive, onClick }) => {
  return (
    <button
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={() => onClick(id)}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default Tab;
EOF

cat > microfrontend-v2/mfe-header/src/Header.jsx << 'EOF'
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
EOF

cat > microfrontend-v2/mfe-header/src/styles.css << 'EOF'
.header {
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 70px;
  flex-shrink: 0;
  width: 100%;
}

.header-logo h1 {
  font-size: 1.5rem;
  color: #667eea;
  margin-right: 30px;
}

.header-nav {
  display: flex;
  gap: 5px;
  flex: 1;
  overflow-x: auto;
}

.tab {
  padding: 10px 20px;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #667eea;
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.tab:hover {
  background: #f0f0f0;
  color: #333;
  transform: translateY(-2px);
}

.tab:hover::after {
  width: 80%;
}

.tab.active {
  background: #667eea;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.tab.active::after {
  width: 0;
}

.header-user {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: auto;
}

.username {
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
}

.logout-btn {
  padding: 8px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .header {
    flex-wrap: wrap;
    height: auto;
    min-height: 70px;
    padding: 10px 15px;
  }

  .header-logo {
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
  }

  .header-logo h1 {
    font-size: 1.3rem;
    margin-right: 0;
  }

  .header-nav {
    width: 100%;
    justify-content: flex-start;
    overflow-x: auto;
    padding: 5px 0;
  }

  .header-user {
    width: 100%;
    justify-content: center;
    margin-top: 10px;
    margin-left: 0;
  }
}
EOF

echo "✅ Header MFE created"
echo ""

# Create Sidebar MFE
echo "📦 Creating Sidebar Microfrontend..."
mkdir -p microfrontend-v2/mfe-sidebar/src/components

cat > microfrontend-v2/mfe-sidebar/package.json << 'EOF'
{
  "name": "mfe-sidebar",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port 5002",
    "build": "vite build",
    "preview": "vite preview --port 5002"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@originjs/vite-plugin-federation": "^1.3.6",
    "@vitejs/plugin-react": "^5.1.0",
    "vite": "^7.2.2"
  }
}
EOF

cat > microfrontend-v2/mfe-sidebar/vite.config.js << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'sidebarMfe',
      filename: 'remoteEntry.js',
      exposes: {
        './Sidebar': './src/Sidebar.jsx',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.2.0',
        },
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5002,
  },
});
EOF

cat > microfrontend-v2/mfe-sidebar/src/components/Tab.jsx << 'EOF'
const Tab = ({ id, label, isActive, onClick }) => {
  return (
    <button
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={() => onClick(id)}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default Tab;
EOF

cat > microfrontend-v2/mfe-sidebar/src/Sidebar.jsx << 'EOF'
import { useState } from 'react';
import Tab from './components/Tab';
import './styles.css';

// All possible sidebar tabs for all roles
const allTabs = [
  { id: 1, label: 'Overview' },
  { id: 2, label: 'Projects' },
  { id: 3, label: 'Documents' },
  { id: 4, label: 'Calendar' },
  { id: 5, label: 'Reports' },
  { id: 6, label: 'Tasks' },
  { id: 7, label: 'Team' },
  { id: 8, label: 'Messages' },
  { id: 9, label: 'Resources' },
  { id: 10, label: 'Settings' }
];

const Sidebar = ({ role, visibleTabs }) => {
  const [activeTab, setActiveTab] = useState(visibleTabs[0]);

  const displayTabs = allTabs.filter(tab => visibleTabs.includes(tab.id));

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      <nav className="sidebar-nav">
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
    </aside>
  );
};

export default Sidebar;
EOF

cat > microfrontend-v2/mfe-sidebar/src/styles.css << 'EOF'
.sidebar {
  background: white;
  width: 250px;
  min-width: 250px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  overflow-y: auto;
  flex-shrink: 0;
}

.sidebar-header {
  padding: 0 20px 20px;
  border-bottom: 2px solid #f0f0f0;
}

.sidebar-header h2 {
  font-size: 1.2rem;
  color: #333;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px 10px;
}

.sidebar-nav .tab {
  text-align: left;
  width: 100%;
  padding: 12px 20px;
  animation: slideInLeft 0.3s ease;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.sidebar-nav .tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #667eea;
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.sidebar-nav .tab:hover {
  background: #f0f0f0;
  color: #333;
  transform: translateY(-2px);
}

.sidebar-nav .tab:hover::after {
  width: 80%;
}

.sidebar-nav .tab.active {
  background: #667eea;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.sidebar-nav .tab.active::after {
  width: 0;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    min-width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-height: none;
  }
}
EOF

echo "✅ Sidebar MFE created"
echo ""

# Create MainContent MFE
echo "📦 Creating MainContent Microfrontend..."
mkdir -p microfrontend-v2/mfe-maincontent/src/components

cat > microfrontend-
