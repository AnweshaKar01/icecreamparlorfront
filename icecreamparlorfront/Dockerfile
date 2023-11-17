FROM node:lts
WORKDIR /app
COPY /build ./builds
COPY /public ./public
RUN npm install -g serve
EXPOSE 3000
CMD [ "serve", "-s", "build" ]
