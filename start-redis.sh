#!/usr/bin/env bash

# On Linux and macOS you can run this script directly - `./start-redis.sh`

REDIS_CONTAINER_NAME="general-redis"
REDIS_PORT=6379
REDIS_VOLUME="./docker-volumes/redis"

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install Docker and try again.\nGuide: https://docs.docker.com/engine/install/"
  exit 1
fi

if ! docker info > /dev/null 2>&1; then
  echo "Docker daemon is not running. Please start Docker and try again."
  exit 1
fi

if [ "$(docker ps -q -f name=$REDIS_CONTAINER_NAME)" ]; then
  echo "Redis container '$REDIS_CONTAINER_NAME' is already running"
  exit 0
fi

if [ "$(docker ps -a -q -f name=$REDIS_CONTAINER_NAME)" ]; then
  docker start "$REDIS_CONTAINER_NAME"
  echo "Existing Redis container '$REDIS_CONTAINER_NAME' started"
  exit 0
fi

# Create volume directory if it doesn't exist
mkdir -p "$REDIS_VOLUME"

docker run -d \
  --name "$REDIS_CONTAINER_NAME" \
  -p "$REDIS_PORT:$REDIS_PORT" \
  -v "$REDIS_VOLUME:/data" \
  redis:7-alpine \
  redis-server --save 60 1 --loglevel warning && \
  echo "Redis container '$REDIS_CONTAINER_NAME' was successfully created"
