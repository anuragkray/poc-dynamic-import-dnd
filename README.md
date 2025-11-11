# POC: Dynamic Import with Role-Based Access

A React application demonstrating microfrontend architecture with role-based dynamic imports and code splitting.

## Features

### 🎯 Role-Based Access Control
- **Basic User**: Access to tabs 1, 3, 6, 9 from header, sidebar, and main content
- **Standard User**: Access to tabs 2, 4, 8, 10 from header, sidebar, and main content
- **Premium User**: Full access to all tabs (1-10 in header/sidebar, 1-12 in main content)

### 🚀 Dynamic Module Loading
- Each user role has its own module that is loaded on-demand
- When a user logs in as Basic, Standard and Premium modules are NOT downloaded
- When a user logs in as Standard, Premium module is NOT downloaded
- Implements true code splitting for optimal performance

### 🏗️ Microfrontend Architecture
- Small, reusable components
- Modular structure with clear separation of concerns
- Lazy loading with React.lazy() and Suspense
- Independent modules for each user role

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable components
│   │   ├── Tab.jsx
│   │   └── Card.jsx
│   ├── layout/           # Layout components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── MainContent.jsx
│   └── auth/             # Authentication components
│       └── RoleSelector.jsx
├── modules/              # Role-based modules (lazy loaded)
│   ├── basic/
│   │   └── BasicLayout.jsx
│   ├── standard/
│   │   └── StandardLayout.jsx
│   └── premium/
│       └── PremiumLayout.jsx
├── config/               # Configuration files
│   └── roleConfig.js
├── App.jsx               # Main application
└── App.css               # Styles
```

## Component Breakdown

### Common Components
- **Tab**: Reusable tab component for navigation
- **Card**: Reusable card component for content display

### Layout Components
- **Header**: Top navigation with 10 tabs
- **Sidebar**: Side navigation with 10 tabs
- **MainContent**: Main content area with 12 cards

### Role Modules
- **BasicLayout**: Layout for basic users (lazy loaded)
- **StandardLayout**: Layout for standard users (lazy loaded)
- **PremiumLayout**: Layout for premium users (lazy loaded)

## How Dynamic Imports Work

1. **Initial Load**: Only the core app and RoleSelector are loaded
2. **Role Selection**: When a user selects a role, only that role's module is dynamically imported
3. **Code Splitting**: Vite automatically creates separate chunks for each module
4. **Lazy Loading**: Components are loaded on-demand using React.lazy()

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

The build process will create separate chunks for each role module, which you can verify in the `dist` folder.

## Testing Dynamic Imports

1. Open the application in your browser
2. Open DevTools > Network tab
3. Select "Basic User" - observe only basic module loads
4. Switch to "Standard User" - observe standard module loads
5. Switch to "Premium User" - observe premium module loads
6. Check the JS files loaded - each role loads different chunks

## Key Technologies

- **React 19**: Latest React features
- **Vite**: Fast build tool with excellent code splitting
- **React.lazy()**: Dynamic component imports
- **Suspense**: Loading states for lazy components

## Performance Benefits

- ✅ Reduced initial bundle size
- ✅ Faster initial page load
- ✅ On-demand loading of features
- ✅ Better caching strategy
- ✅ Improved user experience

## Future Enhancements

- Add authentication system
- Implement route-based code splitting
- Add more granular permissions
- Integrate with backend API
- Add analytics for module loading
