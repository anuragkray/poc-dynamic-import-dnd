#!/bin/bash

# Microfrontend V2 Installation and Startup Script
# Component-based architecture with separate Header, Sidebar, and MainContent MFEs

set -e

echo "🚀 Microfrontend V2 Setup and Launch Script"
echo "============================================="
echo ""

# Function to install dependencies
install_deps() {
    local dir=$1
    local name=$2
    
    echo "📦 Installing dependencies for $name..."
    cd "$dir"
    npm install
    cd - > /dev/null
    echo "✅ $name dependencies installed"
    echo ""
}

# Function to start application in background
start_app() {
    local dir=$1
    local name=$2
    local port=$3
    
    echo "🌐 Starting $name on port $port..."
    cd "$dir"
    npm run dev > "/tmp/mfe-v2-$name.log" 2>&1 &
    echo $! > "/tmp/mfe-v2-$name.pid"
    cd - > /dev/null
    echo "✅ $name started (PID: $(cat /tmp/mfe-v2-$name.pid))"
    echo "   Logs: /tmp/mfe-v2-$name.log"
    echo ""
}

# Check if we're in the right directory
if [ ! -d "microfrontend" ]; then
    echo "❌ Error: microfrontend directory not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

echo "Step 1: Installing Dependencies"
echo "--------------------------------"
install_deps "microfrontend/host" "Host Application"
install_deps "microfrontend/microfrontend-header" "Header MFE"
install_deps "microfrontend/microfrontend-sidebar" "Sidebar MFE"
install_deps "microfrontend/microfrontend-maincontent" "MainContent MFE"

echo "Step 2: Starting Applications"
echo "-----------------------------"
start_app "microfrontend/microfrontend-header" "header" "5001"
sleep 2
start_app "microfrontend/microfrontend-sidebar" "sidebar" "5002"
sleep 2
start_app "microfrontend/microfrontend-maincontent" "maincontent" "5003"
sleep 2
start_app "microfrontend/host" "host" "5000"

echo ""
echo "=========================================="
echo "✨ All applications started successfully!"
echo "=========================================="
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
echo "🛑 To stop all applications, run:"
echo "   ./microfrontend/stop-all.sh"
echo ""
echo "📊 To view logs:"
echo "   tail -f /tmp/mfe-v2-*.log"
