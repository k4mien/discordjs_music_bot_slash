FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm install -y
COPY . ./
ENTRYPOINT [ "npm", "start"]
