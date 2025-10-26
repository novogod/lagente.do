# lagente.do

An agent-based application with WordPress development environment.

## Quick Start - WordPress Development

To run the WordPress development environment:

```bash
# Start all containers (WordPress + MySQL + phpMyAdmin)
docker compose up -d

# Stop the containers
docker compose down

# Stop and remove all data (clean slate)
docker compose down -v
```

## Services

After running `docker compose up -d`, the following services will be available:

- **WordPress**: http://localhost:8558
  - Main website and admin interface
  - Database connection pre-configured

- **phpMyAdmin**: http://localhost:8559
  - Database management interface
  - Username: `root`
  - Password: `root_password`
  - Database: `wordpress`

- **MySQL Database**: 
  - Internal to containers (port 3306)
  - Username: `wordpress` / Password: `wordpress_password`
  - Root access: `root` / `root_password`

## WordPress Setup

1. Visit http://localhost:8558
2. If this is a fresh installation, follow the WordPress installation wizard
3. For restored installations, the site should be ready to use
4. Admin access: http://localhost:8558/wp-admin

## Backup & Restore

The setup includes UpdraftPlus for backup management:
- Backups are stored in `/wp-content/updraft/`
- Use phpMyAdmin for direct database access if needed
- FTP extension is installed for UpdraftPlus functionality

## Development

*Project structure and development guidelines will be added as the codebase evolves.*