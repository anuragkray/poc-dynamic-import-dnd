#!/bin/bash

# Hybrid Development Mode Script for Microfrontend Architecture
# Builds remotes once, runs them in preview mode, and host in dev mode
# This allows federation to work while still enabling development

set -e

echo "🚀 Starting Microfrontend Applications in Hybrid Dev Mode"
echo "=========================================================="
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
echo "Building remote microfrontends (one-time build)..."
echo "---------------------------------------------------"

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

echo "Starting applications..."
echo "------------------------"
echo ""
echo "🌐 Access Points:"
echo "   Host Application:    http://localhost:5000 (dev mode with hot reload)"
echo "   Header MFE:          http://localhost:5001 (preview mode)"
echo "   Sidebar MFE:         http://localhost:5002 (preview mode)"
echo "   MainContent MFE:     http://localhost:5003 (preview mode)"
echo ""
echo "📝 Test Credentials:"
echo "   Basic User:     username: basic     password: basic123"
echo "   Standard User:  username: standard  password: standard123"
echo "   Premium User:   username: premium   password: premium123"
echo ""
echo "💡 Development Tips:"
echo "   - Host changes will hot-reload automatically"
echo "   - To see remote changes, rebuild with: npm run build (in remote dir)"
echo "   - Or restart this script to rebuild all remotes"
echo ""
echo "🛑 Press Ctrl+C to stop all applications"
echo ""
echo "=============================================="
echo ""

# Cleanup function to kill all processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all applications..."
    kill $(jobs -p) 2>/dev/null || true
    echo "✅ All applications stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM EXIT

# Start all applications in background
cd "$ROOT_DIR/microfrontend/microfrontend-header" && npm run preview &
HEADER_PID=$!
echo "✅ Header MFE started (PID: $HEADER_PID)"

sleep 2

cd "$ROOT_DIR/microfrontend/microfrontend-sidebar" && npm run preview &
SIDEBAR_PID=$!
echo "✅ Sidebar MFE started (PID: $SIDEBAR_PID)"

sleep 2

cd "$ROOT_DIR/microfrontend/microfrontend-maincontent" && npm run preview &
MAINCONTENT_PID=$!
echo "✅ MainContent MFE started (PID: $MAINCONTENT_PID)"

sleep 2

cd "$ROOT_DIR/microfrontend/host" && npm run dev &
HOST_PID=$!
echo "✅ Host Application started (PID: $HOST_PID)"

echo ""
echo "🎉 All applications are running!"
echo ""

# Wait for all background processes
wait
