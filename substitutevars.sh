#!/bin/sh

sed -i "s/process.env._API_KEY/$_API_KEY/g" src/src/firebase.config.js
sed -i "s/process.env._AUTH_DOMAIN/$_AUTH_DOMAIN/g" src/src/firebase.config.js
sed -i "s/process.env.PROJECT_ID/$PROJECT_ID/g" src/src/firebase.config.js
sed -i "s/process.env._STORAGE_BUCKET/$_STORAGE_BUCKET/g" src/src/firebase.config.js
sed -i "s/process.env._MESSAGE_SENDER_ID/$_MESSAGE_SENDER_ID/g" src/src/firebase.config.js
sed -i "s/process.env._APP_ID/$_APP_ID/g" src/src/firebase.config.js