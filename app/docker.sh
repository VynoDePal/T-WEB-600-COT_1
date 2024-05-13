su postgres -c "psql -c 'CREATE DATABASE e_commerce'"
php bin/console app:create-user --username=postgres --password=postgres --role=ROLE_ADMIN
php bin/console doctrine:migrations:migrate --no-interaction
php bin/console doctrine:migrations:diff --no-interaction
php bin/console doctrine:migrations:migrate --no-interaction
exec apache2-foreground