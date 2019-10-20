FROM node:10-alpine

RUN mkdir -p /auth-service/src
WORKDIR /auth-service
VOLUME ./src
COPY ./package.json ./
COPY ./package-lock.json ./

# bcrypt needs python ¬¬
RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install --verbose \
    && npm install -g nodemon \
    && apk del .gyp
    
EXPOSE 80
ENTRYPOINT ["npm", "run", "dev"]