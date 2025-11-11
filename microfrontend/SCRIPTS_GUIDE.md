# Microfrontend Scripts Guide

## Understanding the Different Scripts

Your microfrontend project has several scripts for different purposes. Here's what each one does:

---

## 1. `build-and-run.sh` ❌ (Preview Mode - Not for Development)

### What it does:
```bash
./microfrontend/build-and-run.sh
```

1. **Builds** all microfrontends (creates production bundles in `dist/` folders)
2. Runs them in **preview mode** (serves the built files)
3. Runs processes in **background** (terminal appears stopped)

### Why it runs in preview mode:
- Preview mode serves the **built/compiled** files from `dist/` folder
- This is for testing the production build, not for development
- **No hot reload** - changes won't reflect automatically

### When to use:
- ✅ Testing production builds
- ✅ Verifying build output
- ❌ **NOT for development** (no hot reload)

### Why terminal appears stopped:
- Processes run in background with `&`
- Output goes to log files in `/tmp/mfe-v2-*.log`
- Terminal returns to prompt immediately

---

## 2. `install-and-run.sh` ⚠️ (Dev Mode but Background)

### What it does:
```bash
./microfrontend/install-and-run.sh
```

1. Installs dependencies for all microfrontends
2. Runs them in **dev mode** with hot reload
3. Runs processes in **background** (terminal appears stopped)

### Issues:
- ✅ Runs in dev mode (hot reload works)
- ❌ Processes in background (terminal appears stopped)
- ❌ Hard to see logs and errors
- ❌ Ctrl+C doesn't stop the processes

### When to use:
- First-time setup (installs dependencies)
- When you want processes running in background

---

## 3. `dev-mode.sh` ✅ (Recommended for Development)

### What it does:
```bash
./microfrontend/dev-mode.sh
```

1. Checks and installs dependencies if needed
2. Runs all microfrontends in **dev mode**
3. Keeps terminal **active** (you can see logs)
4. **Ctrl+C stops all processes** cleanly

### Benefits:
- ✅ Dev mode with hot reload
- ✅ Terminal stays active
- ✅ See all logs in real-time
- ✅ Easy to stop (Ctrl+C)
- ✅ Proper cleanup on exit

### When to use:
- **Daily development work** ✓
- When you want to see logs
- When you need hot reload

---

## 4. Standalone Development (Individual Microfrontend)

### What it does:
```bash
cd microfrontend/microfrontend-header
npm run dev
```

1. Runs **only one microfrontend** in dev mode
2. Shows it in isolation with mock data
3. Perfect for focused development

### When to use:
- ✅ Working on a single microfrontend
- ✅ Don't need the full app running
- ✅ Faster startup
- ✅ Independent development

---

## Quick Reference

| Script | Mode | Hot Reload | Terminal | Use Case |
|--------|------|------------|----------|----------|
| `build-and-run.sh` | Preview | ❌ No | Background | Test production build |
| `install-and-run.sh` | Dev | ✅ Yes | Background | First-time setup |
| `dev-mode.sh` | Dev | ✅ Yes | **Active** | **Daily development** ✓ |
| Individual `npm run dev` | Dev | ✅ Yes | Active | Single microfrontend work |

---

## Recommended Workflow

### For Full App Development:

```bash
# Use the new dev-mode.sh script
./microfrontend/dev-mode.sh

# Terminal stays active, shows logs
# Press Ctrl+C to stop all processes
```

### For Individual Microfrontend Development:

```bash
# Work on header only
cd microfrontend/microfrontend-header
npm run dev

# Work on sidebar only
cd microfrontend/microfrontend-sidebar
npm run dev

# Work on maincontent only
cd microfrontend/microfrontend-maincontent
npm run dev
```

### For Testing Production Build:

```bash
# Build and preview
./microfrontend/build-and-run.sh

# Stop when done
./microfrontend/stop-all.sh
```

---

## Why `build-and-run.sh` Uses Preview Mode

The script was designed to:
1. Build production bundles
2. Test them in a production-like environment
3. Verify module federation works with built files

**This is NOT for development!** Use `dev-mode.sh` instead.

---

## Fixing the "Terminal Stopped" Issue

The terminal appears stopped because:

```bash
# Old scripts do this:
npm run dev > /tmp/log.log 2>&1 &  # Runs in background
```

The new `dev-mode.sh` script fixes this by:

```bash
# New script does this:
npm run dev &  # Runs in background but keeps terminal active
wait  # Waits for all processes
```

This way:
- ✅ You see the output
- ✅ Terminal stays active
- ✅ Ctrl+C stops everything cleanly

---

## Summary

**For Development (Hot Reload):**
```bash
./microfrontend/dev-mode.sh  # ← Use this!
```

**For Individual Microfrontend:**
```bash
cd microfrontend/microfrontend-header && npm run dev
```

**For Testing Production Build:**
```bash
./microfrontend/build-and-run.sh
```

**To Stop Background Processes:**
```bash
./microfrontend/stop-all.sh
```

---

## Making dev-mode.sh Executable

If you get a permission error:

```bash
chmod +x microfrontend/dev-mode.sh
```

Then run it:

```bash
./microfrontend/dev-mode.sh
