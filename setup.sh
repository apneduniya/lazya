#!/bin/bash

# Install packages from package.json
echo "Installing packages from package.json..."
bun install

# Copy env backup to .env.local file
if [ -f ".env.local.example" ]; then
    echo "Copying .env.local.example to .env.local..."
    cp .env.local.example .env.local
else
    echo "No .env.local.example file found. Creating a new .env.local file..."
    touch .env.local
fi

# Prompt user to fill the .env.local file
echo "Please fill in the .env.local file with the necessary environment variables."

echo "Setup completed successfully!"
echo "Now just run "bun run dev" to start the development server."