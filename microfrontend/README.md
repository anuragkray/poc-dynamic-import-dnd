# Microfrontend Architecture - Component-Based

This is a refined microfrontend architecture where each major UI component is a separate microfrontend:

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Host Application                          │
│                   (localhost:5000)                           │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────┐    │  │
│  │  │   Header MFE (localhost:5001)               │    │  │
│  │  │   - BasicHeader / StandardHeader / Premium  │    │  │
│  │  └─────────────────────────────────────────────┘    │  │
│  │                                                       │  │
│  │  ┌──────────┐  ┌──────────────────────────────┐    │  │
│  │  │ Sidebar  │  │   MainContent MFE            │    │  │
│  │  │   MFE    │  │   (localhost:5003)           │    │  │
│  │  │ (5002)   │  │   - BasicContent             │    │  │
│  │  │          │  │   - StandardContent          │    │  │
│  │  │ - Basic  │  │   - PremiumContent           │    │  │
│  │  │ - Std    │  │                              │    │  │
│  │  │ - Premium│  │                              │    │  │
│  │  └──────────┘  └──────────────────────────────┘    │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Structure

- **Host** (Port 5000) - Orchestrates all microfrontends, handles auth
- **Header MFE** (Port 5001) - All header components for all roles
- **Sidebar MFE** (Port 5002) - All sidebar components for all roles
- **MainContent MFE** (Port 5003) - All main content components for all roles

## Available Scripts

```
microfrontend/
├── build-and-run.sh       # Production-like: builds remotes, runs in preview
├── dev-mode-hybrid.sh     # Quick start: builds once, no auto-rebuild
├── dev-mode-watch.sh      # Auto-rebuild: watches files, rebuilds on change
├── install-and-run.sh     # Setup and installation
└── stop-all.sh            # Stop all applications
```

## Running

### For Windows Users

```cmd
REM First time setup (installs dependencies and starts apps)
microfrontend\install-and-run.bat

REM Or just build and run (if dependencies already installed)
microfrontend\build-and-run.bat
```

**To stop:** Close all the command windows that opened

### For Mac/Linux Users

```bash
# Auto-rebuild mode - best for active development
bash microfrontend/dev-mode-watch.sh

# Production-like mode - most stable
bash microfrontend/build-and-run.sh

# Quick start mode - fast startup
bash microfrontend/dev-mode-hybrid.sh

# First time setup
bash microfrontend/install-and-run.sh
```

**To stop:**
```bash
bash microfrontend/stop-all.sh
# or press Ctrl+C
```

**Access at:** http://localhost:5000

For detailed information about development modes, see [DEVELOPMENT_MODES.md](./DEVELOPMENT_MODES.md)

## Test Credentials

- Basic: `basic` / `basic123`
- Standard: `standard` / `standard123`
- Premium: `premium` / `premium123`
