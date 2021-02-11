# TODO: extract version of node to env variable
FROM node:14.15.3 as common

WORKDIR /zorko-platform
# TODO: reduce size of image (check copy of package.json only to cache install layer)
#COPY yarn.lock .
#COPY ./tools/* .
#COPY ./packages/* .
COPY . .


RUN yarn install --frozen-lockfile

###

FROM common as frontend-builder

WORKDIR /zorko-platform/apps/web-portal-client/

RUN yarn run build
CMD ["ls", "build/"]

###

# TODO: extend with proxy over backend-api
FROM nginx:latest as frontend

COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-builder /zorko-platform/apps/web-portal-client/build/ /usr/share/nginx/html

###

FROM common as backend-api

WORKDIR /zorko-platform/apps/web-portal/
# TODO: parametrize
EXPOSE 7777
CMD ["yarn", "start"]


