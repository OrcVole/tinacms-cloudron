#!/bin/bash
set -eu

echo "=> TinaCMS Cloudron start.sh"

export MONGODB_URI="${CLOUDRON_MONGODB_URL}"
export MONGODB_DBNAME="${CLOUDRON_MONGODB_DATABASE}"
export NEXTAUTH_URL="${CLOUDRON_APP_ORIGIN}"

if [ ! -f /app/data/.nextauth_secret ]; then
    echo "=> Generating NEXTAUTH_SECRET..."
    openssl rand -base64 32 > /app/data/.nextauth_secret
fi
export NEXTAUTH_SECRET=$(cat /app/data/.nextauth_secret)

export PORT=8000
export NODE_OPTIONS="--experimental-require-module"
export NODE_ENV=production
export HOSTNAME="0.0.0.0"
export NEXT_TELEMETRY_DISABLED=1

mkdir -p /run/nextjs-cache
ln -sf /run/nextjs-cache /app/code/.next/cache 2>/dev/null || true

if [ ! -f /app/data/.initialized ]; then
    echo "=> First run — initializing..."
    mkdir -p /app/data/uploads /app/data/logs
    touch /app/data/.initialized
fi

chown -R cloudron:cloudron /app/data
chown -R cloudron:cloudron /run/nextjs-cache

echo "=> Starting on port ${PORT}"
exec /usr/local/bin/gosu cloudron:cloudron node_modules/.bin/next start -p ${PORT} -H 0.0.0.0
