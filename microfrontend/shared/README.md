# Shared Configuration Folder

## Purpose

This folder contains **shared configuration and utilities** that can be used across all microfrontends. This approach provides:

✅ **Single Source of Truth** - All navigation data in one place
✅ **Easy Maintenance** - Update once, applies everywhere
✅ **Consistency** - Same data structure across all microfrontends
✅ **No Duplication** - Avoid repeating the same data in multiple files
✅ **Simple** - No need for API calls or complex state management

---

## Structure

```
shared/
├── config/
│   └── navigationConfig.js    # All navigation data (tabs, cards, etc.)
└── README.md                   # This file
```

---

## How It Works

### Before (Duplicated Data):

Each microfrontend had its own hardcoded data:

```javascript
// microfrontend-header/src/Header.jsx
const allTabs = [
  { id: 1, label: 'Dashboard' },
  { id: 2, label: 'Analytics' },
  // ... duplicated in every file
];

// microfrontend-sidebar/src/Sidebar.jsx
const allTabs = [
  { id: 1, label: 'Overview' },
  { id: 2, label: 'Projects' },
  // ... duplicated again
];
```

**Problems:**
- ❌ Data duplicated in multiple files
- ❌ Hard to maintain (update in multiple places)
- ❌ Risk of inconsistency

### After (Shared Configuration):

All data is centralized in one place:

```javascript
// shared/config/navigationConfig.js
export const ALL_HEADER_TABS = [
  { id: 1, label: 'Dashboard' },
  { id: 2, label: 'Analytics' },
  // ... defined once
];

export const ALL_SIDEBAR_TABS = [
  { id: 1, label: 'Overview' },
  { id: 2, label: 'Projects' },
  // ... defined once
];

export const ALL_CONTENT_CARDS = [
  { id: 1, title: 'Sales Overview', content: '...' },
  // ... defined once
];
```

**Benefits:**
- ✅ Data defined once
- ✅ Easy to update (change in one place)
- ✅ Consistent across all microfrontends

---

## Usage in Microfrontends

### Header Microfrontend

```javascript
// microfrontend-header/src/Header.jsx
import { ALL_HEADER_TABS, getVisibleItems } from '../../shared/config/navigationConfig';

const Header = ({ visibleTabs, username, onLogout }) => {
  const displayTabs = getVisibleItems(ALL_HEADER_TABS, visibleTabs);
  
  return (
    <header>
      {displayTabs.map(tab => <Tab key={tab.id} {...tab} />)}
    </header>
  );
};
```

### Sidebar Microfrontend

```javascript
// microfrontend-sidebar/src/Sidebar.jsx
import { ALL_SIDEBAR_TABS, getVisibleItems } from '../../shared/config/navigationConfig';

const Sidebar = ({ visibleTabs }) => {
  const displayTabs = getVisibleItems(ALL_SIDEBAR_TABS, visibleTabs);
  
  return (
    <aside>
      {displayTabs.map(tab => <Tab key={tab.id} {...tab} />)}
    </aside>
  );
};
```

### MainContent Microfrontend

```javascript
// microfrontend-maincontent/src/MainContent.jsx
import { ALL_CONTENT_CARDS, getVisibleItems } from '../../shared/config/navigationConfig';

const MainContent = ({ visibleCards }) => {
  const displayCards = getVisibleItems(ALL_CONTENT_CARDS, visibleCards);
  
  return (
    <main>
      {displayCards.map(card => <Card key={card.id} {...card} />)}
    </main>
  );
};
```

---

## Available Exports

### Data Arrays

- `ALL_HEADER_TABS` - All available header navigation tabs
- `ALL_SIDEBAR_TABS` - All available sidebar navigation tabs
- `ALL_CONTENT_CARDS` - All available main content cards

### Utility Functions

#### `getVisibleItems(allItems, visibleIds)`

Filters items based on visible IDs.

**Parameters:**
- `allItems` - Array of all available items
- `visibleIds` - Array of IDs to show

**Returns:** Filtered array of items

**Example:**
```javascript
const allTabs = [
  { id: 1, label: 'Dashboard' },
  { id: 2, label: 'Analytics' },
  { id: 3, label: 'Reports' }
];

const visibleIds = [1, 3];
const displayTabs = getVisibleItems(allTabs, visibleIds);
// Returns: [{ id: 1, label: 'Dashboard' }, { id: 3, label: 'Reports' }]
```

#### `getItemsByRole(allItems, role, roleConfig)`

Filters items based on user role.

**Parameters:**
- `allItems` - Array of all available items
- `role` - User role (e.g., 'basic', 'standard', 'premium')
- `roleConfig` - Object mapping roles to visible IDs

**Returns:** Filtered array of items for the role

**Example:**
```javascript
const roleConfig = {
  basic: [1, 2, 3],
  standard: [1, 2, 3, 4, 5, 6],
  premium: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};

const displayTabs = getItemsByRole(ALL_HEADER_TABS, 'basic', roleConfig);
// Returns only tabs with IDs 1, 2, 3
```

---

## Adding New Navigation Items

### Step 1: Add to Shared Config

```javascript
// shared/config/navigationConfig.js
export const ALL_HEADER_TABS = [
  { id: 1, label: 'Dashboard' },
  { id: 2, label: 'Analytics' },
  { id: 11, label: 'New Feature' }, // ← Add new item
];
```

### Step 2: Update Role Configuration (if needed)

```javascript
// host/src/config/roleConfig.js
export const roleConfig = {
  premium: {
    headerTabs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // ← Include new ID
    // ...
  }
};
```

### Step 3: That's it!

The new item will automatically appear in all microfrontends that include its ID in their `visibleTabs` prop.

---

## Benefits of This Approach

### 1. Centralized Management
- All navigation data in one file
- Easy to find and update
- No searching through multiple files

### 2. Consistency
- Same data structure everywhere
- No risk of typos or inconsistencies
- Single source of truth

### 3. Maintainability
- Update once, applies everywhere
- Add new items easily
- Remove deprecated items in one place

### 4. Simplicity
- No API calls needed
- No complex state management
- Just import and use

### 5. Type Safety (if using TypeScript)
- Can add TypeScript types to shared config
- Type checking across all microfrontends
- Better IDE autocomplete

---

## When to Use This vs API Approach

### Use Shared Config When:
- ✅ Navigation data is relatively static
- ✅ All users see the same set of options (just filtered)
- ✅ You want simplicity and fast performance
- ✅ Data doesn't change frequently
- ✅ You're okay with data being in the bundle

### Use API Approach When:
- ✅ Navigation data changes frequently
- ✅ Different users have completely different navigation
- ✅ Navigation is personalized per user
- ✅ You need to update navigation without redeploying
- ✅ Security is critical (don't want data in bundle)

---

## Migration from Hardcoded to Shared

If you have existing microfrontends with hardcoded data:

1. **Move data to shared config**
   ```javascript
   // shared/config/navigationConfig.js
   export const ALL_HEADER_TABS = [/* your data */];
   ```

2. **Update imports in components**
   ```javascript
   // Before
   const allTabs = [/* hardcoded data */];
   
   // After
   import { ALL_HEADER_TABS, getVisibleItems } from '../../shared/config/navigationConfig';
   ```

3. **Replace filtering logic**
   ```javascript
   // Before
   const displayTabs = allTabs.filter(tab => visibleTabs.includes(tab.id));
   
   // After
   const displayTabs = getVisibleItems(ALL_HEADER_TABS, visibleTabs);
   ```

---

## Summary

The shared configuration approach provides a **simple, maintainable, and efficient** way to manage navigation data across all microfrontends. It eliminates duplication, ensures consistency, and makes updates easy - all without the complexity of API calls or state management.

Perfect for most microfrontend applications where navigation data is relatively stable! 🚀
