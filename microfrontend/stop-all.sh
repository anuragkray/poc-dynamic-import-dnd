#!/bin/bash

# Script to stop all microfrontend V2 applications

echo "🛑 Stopping all microfrontend V2 applications..."
echo ""

# Function to stop application
stop_app() {
    local name=$1
    local pid_file="/tmp/mfe-v2-$name.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p $pid > /dev/null 2>&1; then
            echo "Stopping $name (PID: $pid)..."
            kill $pid
            rm "$pid_file"
            echo "✅ $name stopped"
        else
            echo "⚠️  $name was not running"
            rm "$pid_file"
        fi
    else
        echo "⚠️  No PID file found for $name"
    fi
}

stop_app "host"
stop_app "header"
stop_app "sidebar"
stop_app "maincontent"

echo ""
echo "✅ All applications stopped"
echo ""
echo "To clean up log files, run:"
echo "   rm /tmp/mfe-v2-*.log"
