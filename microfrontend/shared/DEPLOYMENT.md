# Shared Folder Deployment Guide

## How Shared Folder Works in Deployment

### Key Concept: **No Separate Deployment Needed**

The `shared` folder is **NOT deployed as a separate service**. Instead:

1. Each microfrontend **imports** from the shared folder during development
2. During **build time**, the shared code is **bundled into each microfrontend**
3. Each microfrontend's build output includes the shared code it uses

---

## Build Process

### What Happens During Build

```bash
# When you build a microfrontend
cd microfrontend/microfrontend-header
npm run build
```

**Vite/Webpack does this:**

1. **Reads** `Header.jsx`
2. **Sees** the import: `import { ALL_HEADER_TABS } from '../../shared/config/navigationConfig'`
3. **Resolves** the path to `shared/config/navigationConfig.js`
4. **Bundles** the needed code from shared folder into the build output
5. **Creates** `dist/` folder with everything included

**Result:** The `dist/` folder contains a **self-contained** bundle with the shared code included.

---

## File Structure

### Development (Source Code)

```
microfrontend/
├── shared/                          ← Shared code (not deployed separately)
│   └── config/
│       └── navigationConfig.js
├── microfrontend-header/
│   ├── src/
│   │   └── Header.jsx              ← Imports from ../../shared/
│   └── dist/                        ← Build output (deployed)
├── microfrontend-sidebar/
│   ├── src/
│   │   └── Sidebar.jsx             ← Imports from ../../shared/
│   └── dist/                        ← Build output (deployed)
└── microfrontend-maincontent/
    ├── src/
    │   └── MainContent.jsx         ← Imports from ../../shared/
    └── dist/                        ← Build output (deployed)
```

### Production (What Gets Deployed)

```
Production Server 1 (Header MFE):
└── dist/                            ← Only this is deployed
    ├── assets/
    │   ├── remoteEntry.js          ← Contains bundled shared code
    │   └── Header-xxx.js           ← Contains bundled shared code
    └── index.html

Production Server 2 (Sidebar MFE):
└── dist/                            ← Only this is deployed
    ├── assets/
    │   ├── remoteEntry.js          ← Contains bundled shared code
    │   └── Sidebar-xxx.js          ← Contains bundled shared code
    └── index.html

Production Server 3 (MainContent MFE):
└── dist/                            ← Only this is deployed
    ├── assets/
    │   ├── remoteEntry.js          ← Contains bundled shared code
    │   └── MainContent-xxx.js      ← Contains bundled shared code
    └── index.html
```

**Note:** The `shared/` folder itself is **NOT deployed**. Only the `dist/` folders are deployed.

---

## Deployment Steps

### Step 1: Build Each Microfrontend

```bash
# Build Header
cd microfrontend/microfrontend-header
npm run build
# Creates: dist/ folder with shared code bundled in

# Build Sidebar
cd ../microfrontend-sidebar
npm run build
# Creates: dist/ folder with shared code bundled in

# Build MainContent
cd ../microfrontend-maincontent
npm run build
# Creates: dist/ folder with shared code bundled in
```

### Step 2: Deploy Only the `dist/` Folders

```bash
# Deploy Header MFE
# Upload microfrontend-header/dist/ to your server/CDN
# Example: https://cdn.example.com/header/

# Deploy Sidebar MFE
# Upload microfrontend-sidebar/dist/ to your server/CDN
# Example: https://cdn.example.com/sidebar/

# Deploy MainContent MFE
# Upload microfrontend-maincontent/dist/ to your server/CDN
# Example: https://cdn.example.com/maincontent/
```

**The `shared/` folder stays in your source code repository only.**

---

## How Bundling Works

### Example: Header Microfrontend

**Source Code (Development):**
```javascript
// microfrontend-header/src/Header.jsx
import { ALL_HEADER_TABS, getVisibleItems } from '../../shared/config/navigationConfig';

const Header = ({ visibleTabs }) => {
  const displayTabs = getVisibleItems(ALL_HEADER_TABS, visibleTabs);
  // ...
};
```

**Built Code (Production):**
```javascript
// dist/assets/Header-abc123.js (simplified)
const ALL_HEADER_TABS = [
  { id: 1, label: 'Dashboard' },
  { id: 2, label: 'Analytics' },
  // ... all tabs bundled here
];

const getVisibleItems = (allItems, visibleIds) => {
  return allItems.filter(item => visibleIds.includes(item.id));
};

const Header = ({ visibleTabs }) => {
  const displayTabs = getVisibleItems(ALL_HEADER_TABS, visibleTabs);
  // ...
};
```

**See?** The shared code is **included in the bundle**. No separate deployment needed!

---

## Bundle Size Considerations

### Question: "Won't this duplicate the shared code in each bundle?"

**Answer:** Yes, but it's minimal and acceptable because:

1. **Small Size:** The shared config is just data (a few KB)
2. **Tree Shaking:** Build tools only include what's used
3. **Gzip Compression:** Repeated data compresses well
4. **Independence:** Each microfrontend is self-contained

### Size Comparison

```
Header MFE bundle:
- Header component: 3 KB
- Shared config (ALL_HEADER_TABS): 0.5 KB
- Total: ~3.5 KB

Sidebar MFE bundle:
- Sidebar component: 2.5 KB
- Shared config (ALL_SIDEBAR_TABS): 0.5 KB
- Total: ~3 KB

MainContent MFE bundle:
- MainContent component: 5 KB
- Shared config (ALL_CONTENT_CARDS): 1 KB
- Total: ~6 KB
```

**Total duplication:** ~2 KB across all bundles (negligible)

---

## Alternative: NPM Package (Advanced)

If you want to avoid any duplication, you can publish the shared folder as an NPM package:

### Option 1: Private NPM Package

```bash
# 1. Create package
cd microfrontend/shared
npm init -y
# Edit package.json, set name to "@yourcompany/mfe-shared"

# 2. Publish to private registry
npm publish --registry=https://your-private-registry.com

# 3. Install in each microfrontend
cd ../microfrontend-header
npm install @yourcompany/mfe-shared

# 4. Import from package
import { ALL_HEADER_TABS } from '@yourcompany/mfe-shared';
```

### Option 2: Git Submodule (Advanced)

```bash
# Make shared a git submodule
git submodule add <shared-repo-url> microfrontend/shared

# Each microfrontend references the submodule
```

### Option 3: Monorepo with Workspaces (Recommended for Large Projects)

```json
// Root package.json
{
  "workspaces": [
    "microfrontend/shared",
    "microfrontend/microfrontend-header",
    "microfrontend/microfrontend-sidebar",
    "microfrontend/microfrontend-maincontent"
  ]
}
```

---

## Recommended Approach for Your Project

### ✅ **Current Approach (Relative Imports) - RECOMMENDED**

**Pros:**
- ✅ Simple - no extra setup
- ✅ Works out of the box
- ✅ Easy to understand
- ✅ Minimal duplication (2-3 KB total)
- ✅ No deployment complexity

**Cons:**
- ⚠️ Shared code bundled in each microfrontend (minimal impact)

**When to use:** Most projects (including yours)

### ⚠️ **NPM Package Approach**

**Pros:**
- ✅ No duplication
- ✅ Versioning control
- ✅ Can be shared across multiple projects

**Cons:**
- ❌ More complex setup
- ❌ Need private NPM registry or Git packages
- ❌ Version management overhead
- ❌ Deployment complexity

**When to use:** Large organizations with many microfrontends

---

## Deployment Checklist

### For Each Microfrontend:

- [ ] Run `npm run build` in the microfrontend directory
- [ ] Verify `dist/` folder is created
- [ ] Check that `dist/assets/remoteEntry.js` exists
- [ ] Upload **only the `dist/` folder** to your server/CDN
- [ ] Configure your server to serve the files with CORS headers
- [ ] Test that the microfrontend loads correctly

### What NOT to Deploy:

- ❌ `shared/` folder (stays in source code only)
- ❌ `src/` folder (source code, not needed in production)
- ❌ `node_modules/` (dependencies, already bundled)
- ❌ `package.json` (not needed in production)

---

## Example: AWS S3 Deployment

```bash
# Build all microfrontends
cd microfrontend
./build-and-run.sh  # This builds all MFEs

# Deploy to S3
aws s3 sync microfrontend-header/dist/ s3://your-bucket/header/ --delete
aws s3 sync microfrontend-sidebar/dist/ s3://your-bucket/sidebar/ --delete
aws s3 sync microfrontend-maincontent/dist/ s3://your-bucket/maincontent/ --delete

# The shared/ folder is NOT uploaded - it's already bundled in the dist/ folders
```

---

## Summary

### Key Points:

1. **Shared folder is NOT deployed separately**
2. **Build process bundles shared code into each microfrontend**
3. **Only deploy the `dist/` folders**
4. **Minimal duplication (2-3 KB) is acceptable**
5. **Simple approach works best for most projects**

### Deployment Flow:

```
Source Code (with shared/) 
    ↓ npm run build
Build Output (dist/ with shared code bundled)
    ↓ Upload to server
Production (only dist/ deployed)
```

The shared folder is a **development-time convenience** that gets **compiled away** during the build process. No special deployment needed! 🚀
