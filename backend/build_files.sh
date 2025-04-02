#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Building project..."

# Install Python dependencies
pip install -r requirements.txt

# Run database migrations (optional, but common)
# Consider running migrations manually or via a different process
# if your deployment strategy requires it.
# python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput --clear

echo "Build finished."