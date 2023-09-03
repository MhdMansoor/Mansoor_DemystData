
FROM node:14
WORKDIR /web-admin
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

CMD ["npm", "start"]
