# Understanding Standalone Development Mode

## Why Are All Tabs Showing?

When you open a microfrontend in standalone mode (e.g., http://localhost:5012), you see **all tabs by default**. This is **intentional and beneficial** for development!

## The Reasoning

### In Production (with Host):
- Different users see different tabs based on their role
- Basic users see 3 tabs
- Standard users see 6 tabs  
- Premium users see all 10 tabs

### In Standalone Development Mode:
- **You see ALL tabs by default** so you can:
  - Work on any tab without restrictions
  - Test all UI elements
  - Develop new features for any tab
  - See the complete component functionality

## How to Test Different Scenarios

The `DevApp.jsx` file provides **pre-configured scenarios** you can easily switch between:

### Current Setup (in `src/DevApp.jsx`):

```javascript
// Scenario 1: All tabs (Premium user) - DEFAULT ✓ ACTIVE
const mockProps = {
  role: 'premium',
  visibleTabs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // All tabs
  username: 'Premium User',
  onLogout: () => { ... }
};

// Scenario 2: Limited tabs (Basic user) - COMMENTED OUT
// const mockProps = {
//   role: 'basic',
//   visibleTabs: [1, 2, 3], // Only 3 tabs
//   username: 'Basic User',
//   onLogout: () => { ... }
// };

// Scenario 3: Medium tabs (Standard user) - COMMENTED OUT
// const mockProps = { ... }

// Scenario 4: Custom selection - COMMENTED OUT
// const mockProps = { ... }
```

## How to Switch Scenarios

### To Test Basic User (Only 3 Tabs):

1. Open `microfrontend/microfrontend-header/src/DevApp.jsx`
2. Comment out Scenario 1 (add `//` before each line)
3. Uncomment Scenario 2 (remove `//` from each line)
4. Save the file
5. The browser will auto-reload showing only 3 tabs!

**Example:**
```javascript
// Scenario 1: All tabs (Premium user) - COMMENTED OUT
// const mockProps = {
//   role: 'premium',
//   visibleTabs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   username: 'Premium User',
//   onLogout: () => { ... }
// };

// Scenario 2: Limited tabs (Basic user) - NOW ACTIVE ✓
const mockProps = {
  role: 'basic',
  visibleTabs: [1, 2, 3], // Only Dashboard, Analytics, Reports
  username: 'Basic User',
  onLogout: () => { ... }
};
```

## Quick Scenario Reference

| Scenario | Role | Tabs Shown | Use Case |
|----------|------|------------|----------|
| **Scenario 1** (Default) | Premium | All 10 tabs | Full development, see everything |
| **Scenario 2** | Basic | 3 tabs | Test basic user experience |
| **Scenario 3** | Standard | 6 tabs | Test standard user experience |
| **Scenario 4** | Custom | Your choice | Test specific combinations |

## Benefits of This Approach

✅ **Flexibility** - Easily switch between different user scenarios
✅ **Completeness** - See all features by default
✅ **Testing** - Test edge cases and different user roles
✅ **Development Speed** - No need to modify code to see different tabs
✅ **Documentation** - Scenarios are self-documenting in the code

## Real-World Example

### Developing a New Tab Feature:

1. **Start with Scenario 1** (all tabs visible)
   - You can see and work on any tab
   - Develop your new feature

2. **Switch to Scenario 2** (basic user)
   - Test if the tab should be hidden for basic users
   - Verify the layout works with fewer tabs

3. **Switch to Scenario 3** (standard user)
   - Test intermediate state
   - Ensure proper spacing and alignment

4. **Back to Scenario 1** (all tabs)
   - Final verification with all tabs visible

## The Key Point

**Showing all tabs in standalone mode is a FEATURE, not a bug!**

It gives you maximum flexibility during development. When the microfrontend is integrated with the host application, the host will pass the correct `visibleTabs` prop based on the actual user's role.

## Summary

- **Standalone Mode** = Development environment with mock data
- **Default** = Show all tabs for maximum development flexibility
- **Customizable** = Easy to switch scenarios by editing DevApp.jsx
- **Production** = Host application controls what tabs are visible based on real user roles

This design allows you to work independently while maintaining the ability to test all possible scenarios! 🚀
