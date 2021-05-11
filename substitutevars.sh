#!/bin/sh

sed -i "s/process.env.REACT_APP_API_KEY/\"$REACT_APP_API_KEY\"/g" src/src/firebase.config.js
sed -i "s/process.env.REACT_APP_AUTH_DOMAIN/\"$REACT_APP_AUTH_DOMAIN\"/g" src/src/firebase.config.js
sed -i "s/process.env.REACT_APP_PROJECT_ID/\"$REACT_APP_PROJECT_ID\"/g" src/src/firebase.config.js
sed -i "s/process.env.REACT_APP_STORAGE_BUCKET/\"$REACT_APP_STORAGE_BUCKET\"/g" src/src/firebase.config.js
sed -i "s/process.env.REACT_APP_MESSAGE_SENDER_ID/\"$REACT_APP_MESSAGE_SENDER_ID\"/g" src/src/firebase.config.js
sed -i "s/process.env.REACT_APP_APP_ID/\"$REACT_APP_APP_ID\"/g" src/src/firebase.config.js

cat src/src/firebase.config.js