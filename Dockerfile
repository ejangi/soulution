FROM node:22

WORKDIR /app

ENV CHOKIDAR_USEPOLLING true
ENV BROWSER none
ENV PORT 3000
EXPOSE $PORT

ENV REACT_APP_PROJECT_ID ""
ENV REACT_APP_API_KEY ""
ENV REACT_APP_AUTH_DOMAIN ""
ENV REACT_APP_STORAGE_BUCKET ""
ENV REACT_APP_MESSAGE_SENDER_ID ""
ENV REACT_APP_APP_ID ""

RUN corepack enable && corepack prepare yarn@4.9.1 --activate

COPY src/package.json src/yarn.lock /app/
RUN yarn install

COPY src /app/

CMD yarn start
