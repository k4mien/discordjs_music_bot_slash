FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm i discord.js @discordjs/voice @discordjs/opus @discordjs/rest @discordjs/builders ffmpeg-static nodemon -y
COPY . ./
ENTRYPOINT [ "npm", "start"]
