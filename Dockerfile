FROM node
ADD . /app
WORKDIR /app
RUN npm install
Run /usr/local/bin/npm rebuild
CMD npm run build && npm start
EXPOSE 80
