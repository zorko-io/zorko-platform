# TODO: extract version of node to env variable
FROM node:14.15.3 as common

WORKDIR /zorko-platform
# TODO: reduce size of image
COPY . .

RUN yarn install --frozen-lockfile


FROM common as frontend-builder

WORKDIR /zorko-platform/apps/web-portal-client/

RUN yarn run build
CMD ["ls", "build/"]
CMD ["pwd"]

FROM nginx:latest as frontend

COPY --from=frontend-builder /zorko-platform/apps/web-portal-client/build/ /usr/share/nginx/html

