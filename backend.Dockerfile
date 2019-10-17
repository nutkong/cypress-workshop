FROM node:10.16.3-alpine

WORKDIR /app
ENV NODE_ENV="production"

COPY . /app
RUN cd /app && \
  yarn install

CMD [ "node", "./server/app.js" ]
