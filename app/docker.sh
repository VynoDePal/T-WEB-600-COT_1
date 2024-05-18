php bin/console doctrine:migrations:migrate --no-interaction
php bin/console doctrine:migrations:diff --no-interaction
php bin/console doctrine:migrations:migrate --no-interaction
exec apache2-foreground