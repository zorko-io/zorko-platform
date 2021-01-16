# Temp solution to check containers

# Build backend with context
docker build -t zorko-common -f dev-ops/common/Dockerfile .

# Run backend
docker run -p 8888:7777 -v `pwd`:`pwd` -w `pwd` -i -t zorko-common sh -c 'cd ./apps/web-portal && yarn run start:debug'

# Run frontend
docker run -p 8086:8086 -v `pwd`:`pwd` -w `pwd` -i -t zorko-common sh -c 'cd ./apps/web-portal-client && yarn run start'

# TODO: check with clean up of node_modules/
# TODO: check with docker-compose
# TODO: build and run with nginx
