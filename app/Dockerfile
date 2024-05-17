# Utiliser l'image officielle PHP avec Apache
FROM php:8.3-apache

# Définir les variables d'environnement requises par Apache
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2/apache2.pid
ENV APACHE_RUN_DIR /var/run/apache2

# Créer les répertoires nécessaires
RUN mkdir -p ${APACHE_RUN_DIR} ${APACHE_LOCK_DIR} ${APACHE_LOG_DIR}

# Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    libpq-dev \
    git \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

ENV COMPOSER_ALLOW_SUPERUSER=1

# Configurer Apache
RUN a2enmod rewrite

# Copier les fichiers de l'application
COPY . /var/www/html

COPY ./apache.conf /etc/apache2/sites-available/000-default.conf

# Configurer les permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Installer les dépendances Symfony
RUN cd /var/www/html \
    && composer install

# Ajouter ServerName pour éviter l'avertissement
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Commande pour démarrer Apache
CMD ["apache2", "-D", "FOREGROUND"]

# Exposer le port 80
EXPOSE 80
