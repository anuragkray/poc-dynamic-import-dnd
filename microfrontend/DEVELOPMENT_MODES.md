# Development Modes Guide

This guide explains the different development modes available for the microfrontend architecture and when to use each one.

## Overview

Due to the limitations of `@originjs/vite-plugin-federation`, remote microfrontends must be **built** to generate the `remoteEntry.js` files required for Module Federation. This means true "dev mode" (with hot reload) for all apps simultaneously is not possible with the current setup.

However, we provide three different scripts to support various development workflows:

## Available Scripts

### 1. `build-and-run.sh` - Production-like Mode ✅ RECOMMENDED

**Use this when:** You want the most stable setup that closely mimics production.

```bash
bash microfrontend/build-and-run.sh
```

**What it does:**
- Builds all remote microfrontends (header, sidebar, maincontent)
- Runs remotes in preview mode (serving built files)
- Runs host in dev mode with hot reload

**Pros:**
- ✅ Most stable and reliable
- ✅ Host has hot reload
- ✅ Closest to production behavior
- ✅ No 404 errors for remoteEntry.js

**Cons:**
- ❌ Changes to remotes require manual rebuild
- ❌ No hot reload for remote microfrontends

**When to use:**
- Testing the full integration
- Verifying production-like behavior
- When you're primarily working on the host application

---

### 2. `dev-mode-hybrid.sh` - Quick Start Mode

**Use this when:** You want a quick start without file watching overhead.

```bash
bash microfrontend/dev-mode-hybrid.sh
```

**What it does:**
- Same as `build-and-run.sh` but with clearer messaging about the hybrid nature
- Builds remotes once
- Runs remotes in preview mode
- Runs host in dev mode

**Pros:**
- ✅ Quick startup
- ✅ Host has hot reload
- ✅ Clear about being a hybrid mode

**Cons:**
- ❌ Changes to remotes require script restart
- ❌ No automatic rebuilding

**When to use:**
- Quick testing sessions
- When you're only working on the host
- When you want minimal resource usage

---

### 3. `dev-mode-watch.sh` - Auto-Rebuild Mode 🔥 BEST FOR ACTIVE DEVELOPMENT

**Use this when:** You're actively developing remote microfrontends and want automatic rebuilds.

```bash
bash microfrontend/dev-mode-watch.sh
```

**What it does:**
- Builds all remotes initially
- Runs remotes in preview mode
- Runs host in dev mode
- **Watches remote source files and auto-rebuilds on changes**

**Pros:**
- ✅ Host has hot reload
- ✅ Remotes auto-rebuild when you save changes
- ✅ Best developer experience for full-stack work
- ✅ No need to manually restart

**Cons:**
- ❌ Rebuild takes a few seconds (not instant like hot reload)
- ❌ Requires `fswatch` for optimal performance (optional)
- ❌ Higher resource usage

**When to use:**
- Active development on both host and remotes
- When you need to see remote changes frequently
- Full-stack microfrontend development

**Optional Enhancement:**
Install `fswatch` for better file watching:
```bash
# macOS
brew install fswatch

# Linux
apt-get install fswatch  # or yum install fswatch
```

---

---

## Quick Reference

| Script | Host Hot Reload | Remote Auto-Rebuild | Startup Time | Resource Usage | Best For |
|--------|----------------|---------------------|--------------|----------------|----------|
| `build-and-run.sh` | ✅ | ❌ | Medium | Low | Production testing, Host-only dev |
| `dev-mode-hybrid.sh` | ✅ | ❌ | Fast | Low | Quick testing, Host-only dev |
| `dev-mode-watch.sh` | ✅ | ✅ | Slow | High | Active full-stack development |

---

## Workflow Recommendations

### Scenario 1: Working on Host Only
**Use:** `dev-mode-hybrid.sh`
- Quick startup
- Host changes hot-reload
- Remotes are stable

### Scenario 2: Working on Remotes Only
**Use:** `dev-mode-watch.sh`
- Auto-rebuilds when you save
- See changes after a few seconds
- No manual restarts needed

### Scenario 3: Working on Both Host and Remotes
**Use:** `dev-mode-watch.sh`
- Best of both worlds
- Host hot-reloads instantly
- Remotes rebuild automatically

### Scenario 4: Testing Production Behavior
**Use:** `build-and-run.sh`
- Most stable
- Closest to production
- Verify everything works

---

## Stopping Applications

All scripts can be stopped with `Ctrl+C`, or you can use:

```bash
bash microfrontend/stop-all.sh
```

---

## Understanding the Limitation

The core limitation is that `@originjs/vite-plugin-federation` only generates `remoteEntry.js` files during the **build** process, not in dev mode. This is why:

1. ❌ Pure dev mode doesn't work (no remoteEntry.js)
2. ✅ Build + preview mode works (remoteEntry.js exists)
3. ✅ Hybrid mode works (remotes built, host in dev)

### Alternative Solutions (Future)

If you need true hot reload for all apps, consider:

1. **Module Federation with Webpack** - Better dev mode support
2. **@module-federation/vite** - Newer plugin with better dev support
3. **Separate development** - Develop remotes standalone, then integrate

---

## Troubleshooting

### Issue: 404 errors for remoteEntry.js
**Solution:** Use one of the provided scripts: `build-and-run.sh`, `dev-mode-hybrid.sh`, or `dev-mode-watch.sh`.

### Issue: Changes to remotes not showing
**Solution:** 
- If using `build-and-run.sh` or `dev-mode-hybrid.sh`: Restart the script
- If using `dev-mode-watch.sh`: Wait a few seconds for auto-rebuild

### Issue: "Port already in use"
**Solution:** 
```bash
bash microfrontend/stop-all.sh
# or
pkill -f "node.*vite"
```

### Issue: Watch mode not detecting changes
**Solution:** Install `fswatch`:
```bash
brew install fswatch  # macOS
```

---

## Summary

For most development work, use **`dev-mode-watch.sh`** - it provides the best developer experience with automatic rebuilding of remotes and hot reload for the host.

For quick testing or when only working on the host, use **`dev-mode-hybrid.sh`** or **`build-and-run.sh`**.
