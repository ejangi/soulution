FROM node:14

WORKDIR /app

ENV CHOKIDAR_USEPOLLING true
ENV BROWSER none
ENV PORT 3000
EXPOSE $PORT

COPY src/package.json src/yarn.lock /app/
RUN yarn install

CMD yarn build