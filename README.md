# POC: Dynamic Import with Role-Based Access & Microfrontend Architecture

A production-ready React application demonstrating **microfrontend architecture** with role-based dynamic imports, true code splitting, module federation, and comprehensive responsive design.

## 🏗️ Architecture Overview - Two Separate Implementations

This project contains **two separate architectures** demonstrating different approaches:

### 1️⃣ Monolithic App (Root `/src`)
Single application with role-based code splitting

### 2️⃣ Microfrontend Architecture (`/microfrontend`)
Distributed architecture with module federation

---

## 📊 Architecture 1: Monolithic App with Role-Based Code Splitting

```
┌────────────────────────────────────────────────────────────────────────┐
│                    MONOLITHIC APPLICATION                               │
│                    Location: /src                                       │
├────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │                      User Login                                 │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │   │
│  │  │  Basic   │  │ Standard │  │ Premium  │                      │   │
│  │  │   User   │  │   User   │  │   User   │                      │   │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘                      │   │
│  │       │             │             │                             │   │
│  └───────┼─────────────┼─────────────┼─────────────────────────────┘   │
│          │             │             │                                  │
│          ▼             ▼             ▼                                  │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │              Dynamic Module Loading                             │   │
│  │                                                                  │   │
│  │  lazy(() => import('./modules/basic/BasicLayout'))             │   │
│  │  lazy(() => import('./modules/standard/StandardLayout'))       │   │
│  │  lazy(() => import('./modules/premium/PremiumLayout'))         │   │
│  └────────────────────────────────────────────────────────────────┘   │
│          │             │             │                                  │
│          ▼             ▼             ▼                                  │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │              Role-Specific Components (HOC Pattern)             │   │
│  │                                                                  │   │
│  │  Basic:                                                         │   │
│  │  ├── BasicHeader (4 tabs)                                      │   │
│  │  ├── BasicSidebar (4 tabs)                                     │   │
│  │  └── BasicMainContent (4 cards)                                │   │
│  │                                                                  │   │
│  │  Standard:                                                      │   │
│  │  ├── StandardHeader (6 tabs)                                   │   │
│  │  ├── StandardSidebar (6 tabs)                                  │   │
│  │  └── StandardMainContent (6 cards)                             │   │
│  │                                                                  │   │
│  │  Premium:                                                       │   │
│  │  ├── PremiumHeader (10 tabs)                                   │   │
│  │  ├── PremiumSidebar (10 tabs)                                  │   │
│  │  └── PremiumMainContent (12 cards)                             │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  Key Features:                                                          │
│  ✅ Single application                                                  │
│  ✅ Code splitting by user role                                         │
│  ✅ HOC pattern for component reusability                               │
│  ✅ Users only download their role's code                               │
│  ✅ ~40% code for Basic, ~60% for Standard, ~100% for Premium          │
│                                                                          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Architecture 2: Microfrontend with Module Federation

```
┌────────────────────────────────────────────────────────────────────────┐
│              MICROFRONTEND ARCHITECTURE                                 │
│              Location: /microfrontend                                   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  DEVELOPMENT STRUCTURE:                                                 │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │  microfrontend/                                                 │   │
│  │  │                                                               │   │
│  │  ├── shared/                  ← Shared Configuration            │   │
│  │  │   └── config/                                                │   │
│  │  │       └── navigationConfig.js                                │   │
│  │  │           - ALL_HEADER_TABS                                  │   │
│  │  │           - ALL_SIDEBAR_TABS                                 │   │
│  │  │           - ALL_CONTENT_CARDS                                │   │
│  │  │                                                               │   │
│  │  ├── microfrontend-header/    ← Header Microfrontend            │   │
│  │  │   ├── src/                                                   │   │
│  │  │   │   ├── Header.jsx        (imports from ../../shared/)    │   │
│  │  │   │   └── DevApp.jsx        (standalone mode)               │   │
│  │  │   ├── vite.config.js        (exposes: './Header')           │   │
│  │  │   └── package.json          (port: 5001)                    │   │
│  │  │                                                               │   │
│  │  ├── microfrontend-sidebar/   ← Sidebar Microfrontend           │   │
│  │  │   ├── src/                                                   │   │
│  │  │   │   ├── Sidebar.jsx       (imports from ../../shared/)    │   │
│  │  │   │   └── DevApp.jsx        (standalone mode)               │   │
│  │  │   ├── vite.config.js        (exposes: './Sidebar')          │   │
│  │  │   └── package.json          (port: 5002)                    │   │
│  │  │                                                               │   │
│  │  ├── microfrontend-maincontent/ ← MainContent Microfrontend     │   │
│  │  │   ├── src/                                                   │   │
│  │  │   │   ├── MainContent.jsx   (imports from ../../shared/)    │   │
│  │  │   │   └── DevApp.jsx        (standalone mode)               │   │
│  │  │   ├── vite.config.js        (exposes: './MainContent')      │   │
│  │  │   └── package.json          (port: 5003)                    │   │
│  │  │                                                               │   │
│  │  └── host/                     ← Host Application               │   │
│  │      ├── src/                                                   │   │
│  │      │   └── App.jsx            (loads remote MFEs)            │   │
│  │      ├── vite.config.js         (remotes config)               │   │
│  │      └── package.json           (port: 5000)                   │   │
│  │                                                                  │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  RUNTIME ARCHITECTURE:                                                  │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │                        Browser                                  │   │
│  │  ┌──────────────────────────────────────────────────────────┐  │   │
│  │  │                                                            │  │   │
│  │  │              Host Application                              │  │   │
│  │  │           http://localhost:5000                            │  │   │
│  │  │                                                            │  │   │
│  │  │  ┌──────────────────────────────────────────────────┐    │  │   │
│  │  │  │  Dynamic Remote Loading:                         │    │  │   │
│  │  │  │                                                   │    │  │   │
│  │  │  │  const Header = lazy(() =>                       │    │  │   │
│  │  │  │    import('headerMfe/Header'))                   │    │  │   │
│  │  │  │                                                   │    │  │   │
│  │  │  │  const Sidebar = lazy(() =>                      │    │  │   │
│  │  │  │    import('sidebarMfe/Sidebar'))                 │    │  │   │
│  │  │  │                                                   │    │  │   │
│  │  │  │  const MainContent = lazy(() =>                  │    │  │   │
│  │  │  │    import('mainContentMfe/MainContent'))         │    │  │   │
│  │  │  └──────────────────────────────────────────────────┘    │  │   │
│  │  │                                                            │  │   │
│  │  │         ▲              ▲              ▲                    │  │   │
│  │  │         │              │              │                    │  │   │
│  │  └─────────┼──────────────┼──────────────┼────────────────────┘  │   │
│  │            │              │              │                       │   │
│  │  ┌─────────┴────┐  ┌──────┴─────┐  ┌────┴──────────┐           │   │
│  │  │ Header MFE   │  │ Sidebar    │  │ MainContent   │           │   │
│  │  │ :5001        │  │ MFE :5002  │  │ MFE :5003     │           │   │
│  │  │              │  │            │  │               │           │   │
│  │  │ remoteEntry  │  │ remoteEntry│  │ remoteEntry   │           │   │
│  │  │ .js          │  │ .js        │  │ .js           │           │   │
│  │  └──────────────┘  └────────────┘  └───────────────┘           │   │
│  │                                                                  │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  DEPLOYMENT:                                                            │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │  Build: npm run build (in each microfrontend)                  │   │
│  │         ↓                                                        │   │
│  │  Creates dist/ folders with bundled shared config              │   │
│  │         ↓                                                        │   │
│  │  Deploy only dist/ folders:                                    │   │
│  │                                                                  │   │
│  │  CDN/Server 1: header/dist/        (Header MFE)                │   │
│  │  CDN/Server 2: sidebar/dist/       (Sidebar MFE)               │   │
│  │  CDN/Server 3: maincontent/dist/   (MainContent MFE)           │   │
│  │  CDN/Server 4: host/dist/          (Host App)                  │   │
│  │                                                                  │   │
│  │  Note: shared/ folder NOT deployed (bundled into each MFE)     │   │
│  │                                                                  │   │
│  └────────────────────────

## 🎯 Two Architectures in One Project

### 1️⃣ Monolithic App (Root Level)
**Location:** `/src`  
**Purpose:** Demonstrates role-based code splitting in a single application

**Features:**
- Role-based dynamic imports
- HOC pattern for component reusability
- Code splitting by user role
- Responsive design

### 2️⃣ Microfrontend Architecture
**Location:** `/microfrontend`  
**Purpose:** Demonstrates true microfrontend architecture with module federation

**Features:**
- Independent microfrontends (Header, Sidebar, MainContent)
- Module Federation for runtime integration
- Standalone development mode
- Shared configuration
- Independent deployment

---

## 📊 Microfrontend Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT ENVIRONMENT                              │
├────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Source Code Structure:                                                 │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │ microfrontend/                                                  │   │
│  │ ├── shared/                    ← Shared config (not deployed)  │   │
│  │ │   └── config/                                                 │   │
│  │ │       └── navigationConfig.js  (tabs, cards data)            │   │
│  │ │                                                                │   │
│  │ ├── microfrontend-header/      ← Header MFE                     │   │
│  │ │   ├── src/                                                    │   │
│  │ │   │   ├── Header.jsx          (imports from ../../shared/)   │   │
│  │ │   │   └── DevApp.jsx          (standalone dev mode)          │   │
│  │ │   └── vite.config.js          (Module Federation config)     │   │
│  │ │                                                                │   │
│  │ ├── microfrontend-sidebar/     ← Sidebar MFE                    │   │
│  │ │   ├── src/                                                    │   │
│  │ │   │   ├── Sidebar.jsx         (imports from ../../shared/)   │   │
│  │ │   │   └── DevApp.jsx          (standalone dev mode)          │   │
│  │ │   └── vite.config.js          (Module Federation config)     │   │
│  │ │                                                                │   │
│  │ ├── microfrontend-maincontent/ ← MainContent MFE                │   │
│  │ │   ├── src/                                                    │   │
│  │ │   │   ├── MainContent.jsx     (imports from ../../shared/)   │   │
│  │ │   │   └── DevApp.jsx          (standalone dev mode)          │   │
│  │ │   └── vite.config.js          (Module Federation config)     │   │
│  │ │                                                                │   │
│  │ └── host/                       ← Host Application              │   │
│  │     ├── src/                                                    │   │
│  │     │   └── App.jsx              (loads remote MFEs)           │   │
│  │     └── vite.config.js           (Module Federation config)    │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                    RUNTIME ARCHITECTURE                                 │
├────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │                        Browser                                    │ │
│  │  ┌────────────────────────────────────────────────────────────┐  │ │
│  │  │                    Host Application                         │  │ │
│  │  │                  http://localhost:5000                      │  │ │
│  │  │                                                              │  │ │
│  │  │  ┌─────────────────────────────────────────────────────┐   │  │ │
│  │  │  │  Dynamically loads remote microfrontends:           │   │  │ │
│  │  │  │                                                      │   │  │ │
│  │  │  │  import('headerMfe/Header')                         │   │  │ │
│  │  │  │  import('sidebarMfe/Sidebar')                       │   │  │ │
│  │  │  │  import('mainContentMfe/MainContent')               │   │  │ │
│  │  │  └─────────────────────────────────────────────────────┘   │  │ │
│  │  │                                                              │  │ │
│  │  │         ▲              ▲              ▲                      │  │ │
│  │  │         │              │              │                      │  │ │
│  │  └─────────┼──────────────┼──────────────┼──────────────────────┘  │ │
│  │            │              │              │                         │ │
│  │            │              │              │                         │ │
│  │  ┌─────────┴────┐  ┌──────┴─────┐  ┌────┴──────────┐             │ │
│  │  │ Header MFE   │  │ Sidebar MFE│  │ MainContent   │             │ │
│  │  │ Port 5001    │  │ Port 5002  │  │ MFE Port 5003 │             │ │
│  │  │              │  │            │  │               │             │ │
│  │  │ remoteEntry  │  │ remoteEntry│  │ remoteEntry   │             │ │
│  │  │ .js          │  │ .js        │  │ .js           │             │ │
│  │  └──────────────┘  └────────────┘  └───────────────┘             │ │
│  │                                                                    │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT ARCHITECTURE                              │
├────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Build Process:                                                         │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │  npm run build (in each microfrontend)                         │   │
│  │                                                                  │   │
│  │  Source Code + Shared Config                                   │   │
│  │         ↓                                                        │   │
│  │  Vite/Webpack bundles                                           │   │
│  │         ↓                                                        │   │
│  │  dist/ folder (self-contained with shared code bundled)        │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  Deployment:                                                            │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │  CDN/Server 1: header/dist/        (Header MFE)                │   │
│  │  CDN/Server 2: sidebar/dist/       (Sidebar MFE)               │   │
│  │  CDN/Server 3: maincontent/dist/   (MainContent MFE)           │   │
│  │  CDN/Server 4: host/dist/          (Host App)                  │   │
│  │                                                                  │   │
│  │  Note: shared/ folder NOT deployed (bundled into each MFE)     │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                    STANDALONE DEVELOPMENT MODE                          │
├────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Each microfrontend can run independently:                              │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │  cd microfrontend/microfrontend-header                          │   │
│  │  npm run dev                                                    │   │
│  │                                                                  │   │
│  │  Opens: http://localhost:5001                                  │   │
│  │                                                                  │   │
│  │  Shows:                                                         │   │
│  │  ┌──────────────────────────────────────────────────────────┐  │   │
│  │  │ 🔧 Header Microfrontend - Standalone Development Mode    │  │   │
│  │  │                                                            │  │   │
│  │  │ [Header Component with mock data]                        │  │   │
│  │  │                                                            │  │   │
│  │  │ Current Props: { role: 'premium', visibleTabs: [...] }   │  │   │
│  │  └──────────────────────────────────────────────────────────┘  │   │
│  │                                                                  │   │
│  │  Benefits:                                                      │   │
│  │  ✅ Work independently without running host                    │   │
│  │  ✅ Hot reload for fast development                            │   │
│  │  ✅ Test with different mock data                              │   │
│  │  ✅ No dependencies on other microfrontends                    │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└────────────────────────────────────────────────────────────────────────┘


#### withSidebar HOC
```javascript
// HOC that creates sidebar components with configurable navigation
const withSidebar = (tabs) => {
  return function Sidebar({ visibleTabs }) {
    const [activeTab, setActiveTab] = useState(visibleTabs[0]);
    const displayTabs = tabs.filter(tab => visibleTabs.includes(tab.id));
    
    return (
      <aside className="sidebar">
        {/* Sidebar implementation with filtered tabs */}
      </aside>
    );
  };
};

// Usage: Create role-specific sidebars
const BasicSidebar = withSidebar(basicTabs);      // 4 tabs
const StandardSidebar = withSidebar(standardTabs); // 6 tabs
const PremiumSidebar = withSidebar(premiumTabs);   // 10 tabs
```

#### withMainContent HOC
```javascript
// HOC that creates main content components with configurable cards
const withMainContent = (cards) => {
  return function MainContent({ visibleCards }) {
    const displayCards = cards.filter(card => visibleCards.includes(card.id));
    
    return (
      <main className="main-content">
        {/* Main content implementation with filtered cards */}
      </main>
    );
  };
};

// Usage: Create role-specific main content
const BasicMainContent = withMainContent(basicCards);      // 4 cards
const StandardMainContent = withMainContent(standardCards); // 6 cards
const PremiumMainContent = withMainContent(premiumCards);   // 12 cards
```

### 3. Dynamic Module Loading
```javascript
// Only the selected role's module is imported
const BasicLayout = lazy(() => import('./modules/basic/BasicLayout'));
const StandardLayout = lazy(() => import('./modules/standard/StandardLayout'));
const PremiumLayout = lazy(() => import('./modules/premium/PremiumLayout'));
```

### 4. Role-Specific Component Loading
```javascript
// BasicLayout only imports Basic components (created via HOCs)
const BasicHeader = lazy(() => import('../../components/layout/BasicHeader'));
const BasicSidebar = lazy(() => import('../../components/layout/BasicSidebar'));
const BasicMainContent = lazy(() => import('../../components/layout/BasicMainContent'));
```

### 5. Code Splitting Result
- **Basic User Downloads**: ~40% of total code
- **Standard User Downloads**: ~60% of total code
- **Premium User Downloads**: ~100% of total code
- **No Cross-Contamination**: Basic users never download Premium code

### 6. HOC Benefits
- **Code Reusability**: Single HOC creates multiple role-specific components
- **Consistency**: All headers/sidebars/content follow the same pattern
- **Maintainability**: Changes to HOC logic automatically apply to all variants
- **Separation of Concerns**: Data (tabs/cards) separated from logic (HOC)
- **Type Safety**: Each role gets exactly the data it needs

## 🚀 Installation

```bash
npm install
```

## 💻 Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

The build process creates separate chunks for each role module in the `dist` folder.

## 🧪 Testing Code Splitting

### Method 1: Browser Network Tab
1. Open DevTools → Network tab
2. Clear network log
3. Login as **Basic** user
4. Observe: Only `BasicLayout.jsx`, `BasicHeader.jsx`, `BasicSidebar.jsx`, `BasicMainContent.jsx` are downloaded
5. Logout and login as **Standard** user
6. Observe: Only Standard*.jsx files are downloaded (no Basic or Premium files)

### Method 2: Visual Verification
1. Login with different credentials
2. Count the visible tabs and cards:
   - Basic: 4 tabs, 4 cards
   - Standard: 6 tabs, 6 cards
   - Premium: 10 tabs, 12 cards

### Method 3: Bundle Analysis
```bash
npm run build
npx vite-bundle-visualizer
```

## 📱 Responsive Design Testing

Test on different screen sizes:
- **Mobile**: Chrome DevTools → Toggle device toolbar
- **Tablet**: iPad, Android tablets
- **Desktop**: Various resolutions
- **4K**: Large monitors (1920px+)

## 🎨 Key Features Implemented

### ✅ Security
- Credential validation
- Role-based access control
- Code isolation per role

### ✅ Performance
- Dynamic imports
- Lazy loading
- Code splitting
- Minimal bundle sizes

### ✅ User Experience
- Responsive design
- Smooth animations
- Loading states
- Error handling
- Clean, compact UI

### ✅ Code Quality
- Modular architecture
- Reusable components
- Higher-Order Components (HOC) pattern
- Clean code (no console.logs)
- Well-organized structure
- DRY principle (Don't Repeat Yourself)

## 🛠️ Technologies

- **React 19**: Latest React features
- **Vite 7**: Lightning-fast build tool
- **React.lazy()**: Dynamic component imports
- **Suspense**: Loading states
- **CSS3**: Modern responsive design
- **ES6+**: Modern JavaScript
