#!/bin/bash

# Watch Mode Development Script for Microfrontend Architecture
# Builds remotes and watches for changes, auto-rebuilding when files change
# Host runs in dev mode with hot reload

set -e

echo "🚀 Starting Microfrontend Applications in Watch Mode"
echo "====================================================="
echo ""

# Check if we're in the right directory
if [ ! -d "microfrontend" ]; then
    echo "❌ Error: microfrontend directory not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

# Store the root directory
ROOT_DIR=$(pwd)

# Function to check and install dependencies
check_deps() {
    local dir=$1
    local name=$2
    
    if [ ! -d "$dir/node_modules" ]; then
        echo "📦 Installing dependencies for $name..."
        cd "$dir"
        npm install
        cd - > /dev/null
        echo "✅ $name dependencies installed"
        echo ""
    fi
}

echo "Checking dependencies..."
echo "------------------------"
check_deps "microfrontend/host" "Host"
check_deps "microfrontend/microfrontend-header" "Header"
check_deps "microfrontend/microfrontend-sidebar" "Sidebar"
check_deps "microfrontend/microfrontend-maincontent" "MainContent"

echo ""
echo "Building remote microfrontends (initial build)..."
echo "--------------------------------------------------"

# Build Header
echo "🔨 Building Header MFE..."
cd "$ROOT_DIR/microfrontend/microfrontend-header"
npm run build
echo "✅ Header built"
echo ""

# Build Sidebar
echo "🔨 Building Sidebar MFE..."
cd "$ROOT_DIR/microfrontend/microfrontend-sidebar"
npm run build
echo "✅ Sidebar built"
echo ""

# Build MainContent
echo "🔨 Building MainContent MFE..."
cd "$ROOT_DIR/microfrontend/microfrontend-maincontent"
npm run build
echo "✅ MainContent built"
echo ""

echo "Starting applications with file watchers..."
echo "--------------------------------------------"
echo ""
echo "🌐 Access Points:"
echo "   Host Application:    http://localhost:5000 (dev mode with hot reload)"
echo "   Header MFE:          http://localhost:5001 (preview mode with auto-rebuild)"
echo "   Sidebar MFE:         http://localhost:5002 (preview mode with auto-rebuild)"
echo "   MainContent MFE:     http://localhost:5003 (preview mode with auto-rebuild)"
echo ""
echo "📝 Test Credentials:"
echo "   Basic User:     username: basic     password: basic123"
echo "   Standard User:  username: standard  password: standard123"
echo "   Premium User:   username: premium   password: premium123"
echo ""
echo "💡 Development Tips:"
echo "   - Host changes will hot-reload automatically"
echo "   - Remote changes will trigger auto-rebuild (takes a few seconds)"
echo "   - Watch for 'Rebuilt' messages in the console"
echo ""
echo "🛑 Press Ctrl+C to stop all applications"
echo ""
echo "=============================================="
echo ""

# Cleanup function to kill all processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all applications and watchers..."
    kill $(jobs -p) 2>/dev/null || true
    echo "✅ All applications stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM EXIT

# Function to watch and rebuild
watch_and_rebuild() {
    local dir=$1
    local name=$2
    local port=$3
    
    while true; do
        # Use fswatch if available, otherwise fall back to a simple loop
        if command -v fswatch &> /dev/null; then
            fswatch -o "$dir/src" | while read; do
                echo "🔄 Detected changes in $name, rebuilding..."
                cd "$dir"
                npm run build > /dev/null 2>&1
                echo "✅ $name rebuilt at $(date '+%H:%M:%S')"
            done
        else
            # Fallback: check every 2 seconds
            LAST_HASH=$(find "$dir/src" -type f -exec md5 {} \; 2>/dev/null | md5)
            while true; do
                sleep 2
                CURRENT_HASH=$(find "$dir/src" -type f -exec md5 {} \; 2>/dev/null | md5)
                if [ "$CURRENT_HASH" != "$LAST_HASH" ]; then
                    echo "🔄 Detected changes in $name, rebuilding..."
                    cd "$dir"
                    npm run build > /dev/null 2>&1
                    echo "✅ $name rebuilt at $(date '+%H:%M:%S')"
                    LAST_HASH=$CURRENT_HASH
                fi
            done
        fi
    done
}

# Start preview servers for remotes
cd "$ROOT_DIR/microfrontend/microfrontend-header" && npm run preview > /dev/null 2>&1 &
HEADER_PID=$!
echo "✅ Header MFE preview started (PID: $HEADER_PID)"

sleep 1

cd "$ROOT_DIR/microfrontend/microfrontend-sidebar" && npm run preview > /dev/null 2>&1 &
SIDEBAR_PID=$!
echo "✅ Sidebar MFE preview started (PID: $SIDEBAR_PID)"

sleep 1

cd "$ROOT_DIR/microfrontend/microfrontend-maincontent" && npm run preview > /dev/null 2>&1 &
MAINCONTENT_PID=$!
echo "✅ MainContent MFE preview started (PID: $MAINCONTENT_PID)"

sleep 1

# Start watchers for remotes
watch_and_rebuild "$ROOT_DIR/microfrontend/microfrontend-header" "Header" "5001" &
HEADER_WATCH_PID=$!

watch_and_rebuild "$ROOT_DIR/microfrontend/microfrontend-sidebar" "Sidebar" "5002" &
SIDEBAR_WATCH_PID=$!

watch_and_rebuild "$ROOT_DIR/microfrontend/microfrontend-maincontent" "MainContent" "5003" &
MAINCONTENT_WATCH_PID=$!

sleep 1

# Start host in dev mode
cd "$ROOT_DIR/microfrontend/host" && npm run dev &
HOST_PID=$!
echo "✅ Host Application started (PID: $HOST_PID)"

echo ""
echo "🎉 All applications are running with file watchers!"
echo ""

if ! command -v fswatch &> /dev/null; then
    echo "💡 Tip: Install 'fswatch' for better file watching performance:"
    echo "   macOS: brew install fswatch"
    echo "   Linux: apt-get install fswatch or yum install fswatch"
    echo ""
fi

# Wait for all background processes
wait
