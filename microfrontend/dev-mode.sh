#!/bin/bash

# Development Mode Script for Microfrontend Architecture
# Runs all microfrontends in dev mode with hot reload
# Keeps terminal active and shows all logs

set -e

echo "🚀 Starting Microfrontend Applications in Development Mode"
echo "==========================================================="
echo ""

# Check if we're in the right directory
if [ ! -d "microfrontend" ]; then
    echo "❌ Error: microfrontend directory not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

# Check if dependencies are installed
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
echo "Starting applications in development mode..."
echo "---------------------------------------------"
echo ""
echo "🌐 Access Points:"
echo "   Host Application:    http://localhost:5000"
echo "   Header MFE:          http://localhost:5001"
echo "   Sidebar MFE:         http://localhost:5002"
echo "   MainContent MFE:     http://localhost:5003"
echo ""
echo "📝 Test Credentials:"
echo "   Basic User:     username: basic     password: basic123"
echo "   Standard User:  username: standard  password: standard123"
echo "   Premium User:   username: premium   password: premium123"
echo ""
echo "🔥 Hot reload is enabled - changes will reflect automatically"
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

# Start all applications in background but keep script running
cd microfrontend/microfrontend-header && npm run dev &
HEADER_PID=$!

sleep 2

cd ../microfrontend-sidebar && npm run dev &
SIDEBAR_PID=$!

sleep 2

cd ../microfrontend-maincontent && npm run dev &
MAINCONTENT_PID=$!

sleep 2

cd ../host && npm run dev &
HOST_PID=$!

# Wait for all background processes
wait
