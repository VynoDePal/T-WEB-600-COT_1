FROM php:8.3-apache

ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN install-php-extensions pdo pdo_pgsql intl

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN apt update && apt install -yqq nodj npm

COPY . /var/www/html

COPY ./apache.conf /etc/apache2/sites-available/000-default.conf

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

RUN cd /var/www/html && \
    composer install && \
    npm install --force

WORKDIR /var/www/html

ENTRYPOINT [ "bash", "docker.sh" ]

CMD ["apache2-foreground"]

EXPOSE 80
