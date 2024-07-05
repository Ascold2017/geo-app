#!/bin/bash

# Остановите выполнение скрипта, если произойдет ошибка
set -e

# Выполните git pull для обновления кода из ветки vue-based
echo "Pulling latest changes from vue-based branch..."
git pull origin vue-based

# Перезапустите Docker Compose
echo "Rebuilding and restarting Docker Compose services..."
docker-compose down
docker-compose up -d --build

echo "Deployment completed successfully!"
