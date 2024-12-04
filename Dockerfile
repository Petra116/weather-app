FROM node:20

WORKDIR /app

RUN git clone https://github.com/Petra116/weather-app.git

WORKDIR /app/weather-app

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]