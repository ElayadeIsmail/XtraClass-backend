#! /bin/sh

# Apply database migrations
echo "Apply database migrations"
npx prisma migrate dev --name migrate

# Start server
echo "Starting server"
yarn start:dev