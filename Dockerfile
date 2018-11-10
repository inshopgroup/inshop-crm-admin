FROM inshopgroup/docker-inshop-crm-client-nginx-prod:latest

WORKDIR /var/www

ADD ./web /var/www/web

RUN mkdir -p /var/www/web/upload /var/www/web/upload/multimedia /var/www/web/upload/photos /var/www/web/upload/tmp

RUN chown -R www-data:www-data /var/www/web
RUN usermod -u 1000 www-data
