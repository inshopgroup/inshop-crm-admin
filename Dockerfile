FROM inshopgroup/docker-inshop-crm-client-nginx-dev:latest

WORKDIR /var/www

ADD . /var/www

RUN cp .env.prod .env
RUN yarn install
RUN yarn build

RUN chown -R www-data:www-data /var/www
RUN usermod -u 1000 www-data
