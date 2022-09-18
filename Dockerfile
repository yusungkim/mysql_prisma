FROM node:16.13.2

WORKDIR /usr/src/<PJ_NAME>

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]