#!/bin/bash

cd front
npm i
npm run build
cd ..
cd back
npm i
npm install date-fns
npm start