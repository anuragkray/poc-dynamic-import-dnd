# Microfrontend Architecture V2 - Component-Based

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

## Running

```bash
# Automated setup
chmod +x microfrontend-v2/install-and-run.sh
./microfrontend-v2/install-and-run.sh

# Access at http://localhost:5000
```

## Test Credentials

- Basic: `basic` / `basic123`
- Standard: `standard` / `standard123`
- Premium: `premium` / `premium123`
