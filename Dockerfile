# build stage
FROM node:lts-alpine 
RUN npx update-browserslist-db@latest
WORKDIR /app
COPY . .

WORKDIR /app/front
RUN npm install

RUN npm run build

WORKDIR /app/back
RUN npm install
RUN npm install date-fns

EXPOSE 3002

CMD ["npm","start"]
