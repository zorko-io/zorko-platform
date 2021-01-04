# TODO: extract version of node to to env variable
FROM node:14.15.3
#ENV NODE_ENV=production

RUN mkdir /app

RUN echo "hello world" > /app/greeting

WORKDIR /app

RUN yarn install --frozen-lockfile

CMD ["cd", "apps/web-portal"]
CMD ["yarn", "start:debug"]
