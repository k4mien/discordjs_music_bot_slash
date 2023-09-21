FROM node:20.7.0
WORKDIR /app
COPY package.json .
RUN npm install -y
COPY commands index.js config.json ./
ENTRYPOINT [ "npm", "start"]
