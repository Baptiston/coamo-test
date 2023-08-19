FROM node:14.18.1

RUN mkdir -p /var/www

WORKDIR /var/www

COPY package.json /var/www/

COPY package-lock.json /var/www/

RUN npm install

COPY . /var/www/

EXPOSE 3000

CMD [ "npm", "run", "dev" ]