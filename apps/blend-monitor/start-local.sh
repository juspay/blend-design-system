#!/bin/bash

# Blend Monitor Local Development Startup Script
# This script starts the Cloud SQL Proxy and development server

echo "🚀 Starting Blend Monitor Development Environment..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the apps/blend-monitor directory"
    echo "   Current directory: $(pwd)"
    echo "   Expected: .../blend-design-system/apps/blend-monitor"
    exit 1
fi

# Check if Cloud SQL Proxy exists
if [ ! -f "../../cloud_sql_proxy" ]; then
    echo "❌ Error: Cloud SQL Proxy not found at ../../cloud_sql_proxy"
    echo "   Please download it first:"
    echo "   cd ../.."
    echo "   curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64"
    echo "   chmod +x cloud_sql_proxy"
    exit 1
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ Error: .env.local file not found"
    echo "   Please copy and configure the environment file:"
    echo "   cp .env.example .env.local"
    echo "   # Then edit .env.local with your configuration"
    exit 1
fi

# Check if Cloud SQL Proxy is already running
if lsof -i :5433 > /dev/null 2>&1; then
    echo "📡 Cloud SQL Proxy already running on port 5433"
    PROXY_ALREADY_RUNNING=true
else
    echo "📡 Starting Cloud SQL Proxy..."
    cd ../..
    ./cloud_sql_proxy -instances=storybook-452807:us-central1:blend-dashboard=tcp:5433 &
    PROXY_PID=$!
    
    # Wait for proxy to start
    echo "⏳ Waiting for proxy to initialize..."
    sleep 5
    
    # Check if proxy started successfully
    if ! lsof -i :5433 > /dev/null 2>&1; then
        echo "❌ Error: Cloud SQL Proxy failed to start"
        echo "   Check your Google Cloud authentication:"
        echo "   gcloud auth login"
        echo "   gcloud auth application-default login"
        exit 1
    fi
    
    echo "✅ Cloud SQL Proxy started successfully"
    cd apps/blend-monitor
fi

echo ""
echo "🖥️  Starting development server..."
echo "   Dashboard: http://localhost:3000"
echo "   Tokenizer: http://localhost:3000/tokenizer"
echo "   API Test:  http://localhost:3000/api-test"
echo ""

# Start development server
npm run dev

# Cleanup on exit (only if we started the proxy)
if [ "$PROXY_ALREADY_RUNNING" != "true" ] && [ ! -z "$PROXY_PID" ]; then
    echo ""
    echo "🛑 Stopping Cloud SQL Proxy..."
    kill $PROXY_PID 2>/dev/null
fi

echo "👋 Development environment stopped"
