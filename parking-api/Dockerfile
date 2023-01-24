FROM node:alpine
ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn add global typescript
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4000

CMD ["yarn", "start"]
