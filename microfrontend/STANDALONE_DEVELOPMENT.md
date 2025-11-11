# Standalone Development Guide for Microfrontends

## Problem Statement

In a microfrontend architecture, developers often face the challenge of working independently on a specific section of the application. The main issue is that individual microfrontends don't render on their own - they only work when integrated with the host application. This creates dependencies and slows down development.

## Solution

This project now supports **standalone development mode** for each microfrontend, allowing developers to work independently without running the entire application or host.

---

## How It Works

Each microfrontend now has:

1. **DevApp.jsx** - A standalone development wrapper that:
   - Provides mock props/data
   - Renders the microfrontend component in isolation
   - Shows current props for debugging
   - Includes helpful development UI

2. **Updated index.html** - Points to DevApp.jsx instead of the component directly

3. **npm scripts** - Easy commands to run in standalone mode

---

## Quick Start - Running a Microfrontend Independently

### Option 1: Run Individual Microfrontend

Navigate to any microfrontend directory and run:

```bash
# For Header Microfrontend
cd microfrontend/microfrontend-header
npm install  # First time only
npm run dev

# For Sidebar Microfrontend
cd microfrontend/microfrontend-sidebar
npm install  # First time only
npm run dev

# For MainContent Microfrontend
cd microfrontend/microfrontend-maincontent
npm install  # First time only
npm run dev
```

### Option 2: Use the Standalone Script Alias

```bash
npm run dev:standalone
```

This is the same as `npm run dev` but makes the intent clearer.

---

## What You'll See

When you run a microfrontend in standalone mode, you'll see:

1. **Development Banner** - Indicates you're in standalone mode
2. **Your Component** - Rendered with mock data
3. **Props Inspector** - Shows the current props being passed to your component
4. **Tips** - Helpful information about customizing the development experience

---

## Customizing Mock Data

To test different scenarios, edit the `mockProps` object in `src/DevApp.jsx`:

### Header Microfrontend Example

```javascript
// microfrontend/microfrontend-header/src/DevApp.jsx
const mockProps = {
  role: 'premium',  // Change to 'basic' or 'standard'
  visibleTabs: [1, 2, 3, 4, 5],  // Customize which tabs to show
  username: 'Dev User',  // Change username
  onLogout: () => {
    console.log('Logout clicked');
  }
};
```

### Sidebar Microfrontend Example

```javascript
// microfrontend/microfrontend-sidebar/src/DevApp.jsx
const mockProps = {
  role: 'basic',  // Test with different roles
  visibleTabs: [1, 2, 3]  // Show only specific tabs
};
```

### MainContent Microfrontend Example

```javascript
// microfrontend/microfrontend-maincontent/src/DevApp.jsx
const mockProps = {
  role: 'standard',
  visibleCards: [1, 2, 3, 4, 5, 6]  // Show specific cards
};
```

---

## Development Workflow

### Scenario 1: Working on Header Component

```bash
# Terminal 1 - Run header in standalone mode
cd microfrontend/microfrontend-header
npm run dev

# Opens at http://localhost:5001
# Make changes to Header.jsx, Tab.jsx, or styles.css
# See changes instantly with hot reload
```

### Scenario 2: Working on Multiple Microfrontends

```bash
# Terminal 1 - Header
cd microfrontend/microfrontend-header
npm run dev  # Port 5001

# Terminal 2 - Sidebar
cd microfrontend/microfrontend-sidebar
npm run dev  # Port 5002

# Terminal 3 - MainContent
cd microfrontend/microfrontend-maincontent
npm run dev  # Port 5003
```

### Scenario 3: Testing Integration with Host

```bash
# After developing in standalone mode, test with the host

# Terminal 1 - Build all microfrontends
cd microfrontend
./build-and-run.sh

# Or run them individually
cd microfrontend/microfrontend-header && npm run build
cd microfrontend/microfrontend-sidebar && npm run build
cd microfrontend/microfrontend-maincontent && npm run build

# Terminal 2 - Run host
cd microfrontend/host
npm run dev  # Port 5000
```

---

## Port Configuration

Each microfrontend runs on its own port:

- **Header**: http://localhost:5001
- **Sidebar**: http://localhost:5002
- **MainContent**: http://localhost:5003
- **Host**: http://localhost:5000

---

## Benefits of Standalone Development

✅ **Independence** - Work on your microfrontend without running the entire app
✅ **Speed** - Faster startup and hot reload (only your component)
✅ **Focus** - No distractions from other parts of the application
✅ **Testing** - Easy to test different props and scenarios
✅ **Debugging** - Simpler debugging with isolated components
✅ **Onboarding** - New developers can start working on a single microfrontend immediately

---

## Best Practices

1. **Keep DevApp.jsx Updated** - When your component's props change, update the mock data
2. **Test Multiple Scenarios** - Use different mock props to test edge cases
3. **Document Props** - Add comments in DevApp.jsx explaining what each prop does
4. **Regular Integration Testing** - Periodically test with the host application
5. **Commit DevApp.jsx** - Keep it in version control so all developers benefit

---

## Troubleshooting

### Issue: Component doesn't render

**Solution**: Check that DevApp.jsx is importing the correct component and providing all required props.

### Issue: Styles not loading

**Solution**: Ensure the styles.css import is present in DevApp.jsx.

### Issue: Port already in use

**Solution**: 
```bash
# Kill the process using the port
lsof -ti:5001 | xargs kill -9  # For header (port 5001)
lsof -ti:5002 | xargs kill -9  # For sidebar (port 5002)
lsof -ti:5003 | xargs kill -9  # For maincontent (port 5003)
```

### Issue: Changes not reflecting

**Solution**: 
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Restart the dev server
- Check that you're editing the correct file

---

## Advanced: Adding New Microfrontends

When creating a new microfrontend, follow this pattern:

1. Create the component (e.g., `Footer.jsx`)
2. Create `DevApp.jsx` with mock props
3. Update `index.html` to point to `DevApp.jsx`
4. Add `dev:standalone` script to `package.json`
5. Configure unique port in `vite.config.js`

---

## Example: Complete Development Session

```bash
# 1. Start working on the Header component
cd microfrontend/microfrontend-header
npm run dev

# 2. Open http://localhost:5001 in browser

# 3. Edit src/Header.jsx - add a new feature
# 4. Edit src/DevApp.jsx - update mockProps to test the feature
# 5. See changes instantly in browser

# 6. When satisfied, test with host
npm run build
cd ../host
npm run dev

# 7. Open http://localhost:5000 and verify integration
```

---

## Summary

Standalone development mode solves the core problem of microfrontend independence. Developers can now:

- Work on individual microfrontends without dependencies
- Test components in isolation with mock data
- Iterate faster with focused development
- Onboard new team members more easily

This approach maintains the benefits of microfrontend architecture while eliminating the friction of dependent development.
