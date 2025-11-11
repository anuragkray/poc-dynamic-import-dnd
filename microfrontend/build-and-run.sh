#!/bin/bash

# Build and Run Script for Microfrontend Architecture
# This builds the remote apps and runs them in preview mode

set -e

echo "🚀 Building and Running Microfrontend Applications"
echo "===================================================="
echo ""

# Function to build and preview
build_and_preview() {
    local dir=$1
    local name=$2
    local port=$3
    
    echo "🔨 Building $name..."
    cd "$dir"
    npm run build
    echo "✅ $name built successfully"
    
    echo "🌐 Starting $name on port $port..."
    npm run preview > "/tmp/mfe-v2-$name.log" 2>&1 &
    echo $! > "/tmp/mfe-v2-$name.pid"
    cd - > /dev/null
    echo "✅ $name started (PID: $(cat /tmp/mfe-v2-$name.pid))"
    echo ""
}

# Function to start dev server
start_dev() {
    local dir=$1
    local name=$2
    local port=$3
    
    echo "🌐 Starting $name on port $port..."
    cd "$dir"
    npm run dev > "/tmp/mfe-v2-$name.log" 2>&1 &
    echo $! > "/tmp/mfe-v2-$name.pid"
    cd - > /dev/null
    echo "✅ $name started (PID: $(cat /tmp/mfe-v2-$name.pid))"
    echo ""
}

echo "Step 1: Building Remote Microfrontends"
echo "---------------------------------------"
build_and_preview "microfrontend/microfrontend-header" "header" "5001"
sleep 2
build_and_preview "microfrontend/microfrontend-sidebar" "sidebar" "5002"
sleep 2
build_and_preview "microfrontend/microfrontend-maincontent" "maincontent" "5003"
sleep 2

echo "Step 2: Starting Host Application"
echo "----------------------------------"
start_dev "microfrontend/host" "host" "5000"

echo ""
echo "=========================================="
echo "✨ All applications started successfully!"
echo "=========================================="
echo ""
echo "🌐 Access Points:"
echo "   Host Application:    http://localhost:5000"
echo "   Header MFE:          http://localhost:5001 (preview mode)"
echo "   Sidebar MFE:         http://localhost:5002 (preview mode)"
echo "   MainContent MFE:     http://localhost:5003 (preview mode)"
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
