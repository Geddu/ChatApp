FROM node:16.13.0
WORKDIR /code

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json .
COPY src src/

CMD ["npm", "start"]