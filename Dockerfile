# build stage
FROM node:18.16.0

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
