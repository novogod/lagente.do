# lagente.do

An agent-based application with WordPress development environment.

## Quick Start - WordPress Development

To run the WordPress development environment:

```bash
# Start the WordPress container on localhost:8558
docker-compose up -d

# Stop the containers
docker-compose down

# Stop and remove all data (clean slate)
docker-compose down -v
```

After running `docker-compose up -d`, WordPress will be available at:
- **URL**: http://localhost:8558
- **Database**: MySQL 8.0 (internal to containers)

## WordPress Setup

1. Visit http://localhost:8558
2. Follow the WordPress installation wizard
3. Use any site name, username, and password you prefer
4. The database connection is already configured

## Development

*Project structure and development guidelines will be added as the codebase evolves.*