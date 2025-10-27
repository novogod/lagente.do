# lagente.do

An agent-based application with complete WordPress development environment.

## Project Structure

```
lagente.do/
├── docker-compose.yml          # Docker services configuration
├── wordpress/                  # Complete WordPress installation
│   ├── wp-admin/              # WordPress admin files
│   ├── wp-content/            # Themes, plugins, uploads
│   │   ├── themes/           # WordPress themes (including Woohoo)
│   │   ├── plugins/          # All installed plugins
│   │   └── uploads/          # Media files (excluded from git)
│   ├── wp-includes/          # WordPress core files
│   ├── wp-config-template.php # Configuration template
│   └── ...                   # Other WordPress core files
└── README.md                  # This file
```

## Quick Start

To run the complete WordPress development environment:

```bash
# Clone the repository
git clone https://github.com/novogod/lagente.do.git
cd lagente.do

# Start all containers (WordPress + MySQL + phpMyAdmin)
docker compose up -d

# Stop the containers
docker compose down

# Stop and remove database data (clean slate)
docker compose down -v
```

## Services

After running `docker compose up -d`, the following services will be available:

- **WordPress**: http://localhost:8558
  - Complete WordPress installation with restored content
  - Files are mounted from `./wordpress/` directory
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
  - Data persisted in Docker volume `db_data`

## WordPress Setup

1. Visit http://localhost:8558
2. The site should be ready with all restored content
3. Admin access: http://localhost:8558/wp-admin
4. All themes, plugins, and content are included

## Development

### Local File Editing
- All WordPress files are in the `./wordpress/` directory
- Changes to themes, plugins, or core files are immediately reflected
- Upload directory and cache files are excluded from git

### Configuration
- Copy `wordpress/wp-config-template.php` to `wordpress/wp-config.php` if needed
- Database credentials are automatically configured via environment variables
- All sensitive files are excluded from version control

### Backup & Restore
- UpdraftPlus plugin is included for backup management
- Use phpMyAdmin for direct database access if needed
- FTP extension is installed for UpdraftPlus functionality

## Development Workflow

1. **Edit files locally**: Modify themes, plugins, or content in `./wordpress/`
2. **Test changes**: Changes are immediately visible at http://localhost:8558
3. **Commit changes**: Add modified files to git (excluding uploads/cache)
4. **Database changes**: Use UpdraftPlus or phpMyAdmin for database backup/restore

## Included Content

This repository includes a complete WordPress installation with:
- ✅ Restored website content and design
- ✅ Woohoo theme with custom configuration
- ✅ All installed plugins and their settings
- ✅ Complete media library and uploads
- ✅ Database with all posts, pages, and configurations

## 🚀 Production Deployment

Your WordPress site is deployed on VPS 193.43.134.141 and accessible at **https://lagente.do**.

### Automatic GitHub Sync

Every time you push changes to the `main` branch, GitHub Actions will automatically:

1. **Sync Files**: Update all WordPress files on the VPS
2. **Deploy Containers**: Restart Docker containers with latest changes  
3. **Update Database**: Import database if needed and configure URLs
4. **Verify**: Test that the site is accessible

### Manual Deployment

You can also trigger deployment manually:
- Go to [Actions tab](https://github.com/novogod/lagente.do/actions)
- Click "Deploy to VPS" workflow
- Click "Run workflow"

### VPS Container Status

On the VPS, containers are running at:
- **WordPress**: http://localhost:8558 → https://lagente.do (via nginx)
- **phpMyAdmin**: http://localhost:8559 (VPS only)
- **MySQL**: Internal container network

### Local Development Workflow

1. **Edit locally**: Make changes to WordPress files or content
2. **Commit & Push**: 
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. **Auto-Deploy**: GitHub Actions deploys to production automatically
4. **Verify**: Check https://lagente.do for your changes