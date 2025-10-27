# Docker Data

This directory contains all the data and configuration needed to reproduce the Docker environment.

## Contents

### wordpress-database.sql
- Complete MySQL database dump of the WordPress site
- Contains all posts, pages, users, settings, and theme/plugin data
- Restored from October 17th, 2025 backup

## Restoring the Environment

To restore the complete environment:

1. Start the containers:
   ```bash
   docker compose up -d
   ```

2. Import the database (if needed):
   ```bash
   docker exec -i lagente-mysql mysql -u root -proot_password wordpress < docker-data/wordpress-database.sql
   ```

3. Access the site:
   - WordPress: http://localhost:8558
   - phpMyAdmin: http://localhost:8559

## Notes

- The `wordpress/` directory contains all WordPress files and is mounted as a volume
- The MySQL data is stored in a Docker volume `db_data`
- phpMyAdmin configuration is handled automatically through environment variables