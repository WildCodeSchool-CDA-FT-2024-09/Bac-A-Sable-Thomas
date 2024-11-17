FROM node:lts-alpine AS dev

WORKDIR /app

COPY *.json ./

# RUN npm set registry https://registry.yarnpkg.com && npm install --verbose

RUN npm ping
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]