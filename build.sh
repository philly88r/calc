#!/bin/bash

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Install dependencies with specific flags
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Build the application
echo "Building the application..."
npm run build

echo "Build process completed!"
