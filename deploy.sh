#!/bin/bash

# Paths
PROJECT_ROOT_PATH="$HOME/site/repository"
BACKEND_PATH="$PROJECT_ROOT_PATH/backend"
DEPLOYMENT_TARGET_PATH="$HOME/site/wwwroot"

# Move to backend directory
cd "$BACKEND_PATH"

# Install dependencies
npm install --production

# Build your project if necessary (uncomment the next line if needed)
# npm run build

# Delete existing files in wwwroot
rm -rf "$DEPLOYMENT_TARGET_PATH"

# Copy backend to wwwroot
cp -R "$BACKEND_PATH" "$DEPLOYMENT_TARGET_PATH"
