# 🚀 Quick Start: Standalone Microfrontend Development

## The Problem You're Solving

In microfrontend architecture, developers want to work independently on a particular section of the app, but **individual microfrontends don't render on their own** - they only work when integrated with the host application.

## ✅ The Solution

Each microfrontend can now run **independently** in standalone development mode!

---

## 🎯 How to Run a Microfrontend Independently

### Step 1: Navigate to the microfrontend

```bash
cd microfrontend/microfrontend-header
# OR
cd microfrontend/microfrontend-sidebar
# OR
cd microfrontend/microfrontend-maincontent
```

### Step 2: Install dependencies (first time only)

```bash
npm install
```

### Step 3: Run in standalone mode

```bash
npm run dev
```

### Step 4: Open in browser

The terminal will show you the URL (usually http://localhost:5001, 5002, or 5003)

---

## 🎨 What You'll See

When you open the microfrontend in your browser, you'll see:

1. **Development Banner** - Shows you're in standalone mode
2. **Your Component** - Fully functional with mock data
3. **Props Inspector** - Shows what props are being passed
4. **Hot Reload** - Changes reflect instantly as you code

---

## 🔧 Customizing Test Data

Edit `src/DevApp.jsx` in your microfrontend to change the mock props:

```javascript
// Example: Test with different user roles
const mockProps = {
  role: 'basic',        // Try: 'basic', 'standard', 'premium'
  visibleTabs: [1, 2, 3],  // Show only specific tabs
  username: 'Test User'
};
```

---

## 📋 Example Workflow

```bash
# 1. Start working on Header
cd microfrontend/microfrontend-header
npm run dev

# 2. Browser opens at http://localhost:5001
# 3. Edit src/Header.jsx
# 4. See changes instantly!
# 5. No need to run the entire app or host
```

---

## 🎯 Key Benefits

✅ **Work Independently** - No need to run the host or other microfrontends
✅ **Faster Development** - Only your component loads
✅ **Easy Testing** - Test different scenarios with mock data
✅ **Simple Debugging** - Isolated component = easier to debug
✅ **Quick Onboarding** - New developers can start immediately

---

## 📚 Full Documentation

For detailed information, see [STANDALONE_DEVELOPMENT.md](./STANDALONE_DEVELOPMENT.md)

---

## 🆘 Quick Troubleshooting

**Port already in use?**
```bash
# The dev server will automatically find an available port
# Just use the URL shown in the terminal
```

**Component not rendering?**
- Check that `src/DevApp.jsx` exists
- Verify all required props are in mockProps
- Check browser console for errors

**Need to test integration?**
```bash
# Build your microfrontend
npm run build

# Then run the host
cd ../host
npm run dev
```

---

## 🎉 You're Ready!

Now you can develop any microfrontend independently without waiting for the entire application to start. Happy coding! 🚀
