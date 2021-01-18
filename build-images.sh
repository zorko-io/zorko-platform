#!/usr/bin/env bash

# TODO: remove previous images ?
#docker rmi -f zorko-common


echo "Building zorko-common image..."
docker build --no-cache -t zorko-common -f dev-ops/common/Dockerfile .


echo "Building zorko-proxy image..."
docker build --no-cache -t zorko-proxy dev-ops/nginx-router/
