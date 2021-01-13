# TODO: extract version of node to to env variable
FROM node:14.15.3

WORKDIR /zorko-platform
# TODO: reduce size of image
COPY . .

RUN yarn install --frozen-lockfile

WORKDIR /zorko-platform/apps/web-portal

CMD ["yarn", "start:debug"]
