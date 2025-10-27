# VPS Complete Documentation

**Server IP:** 193.43.134.141  
**OS:** CentOS Stream 10 (kernel 6.12.0-140.el10.x86_64)  
**RAM:** 7.5GB  
**Last Updated:** October 27, 2025

---

## Table of Contents
1. [SSH Access](#ssh-access)
2. [Web Stack (LEMP)](#web-stack-lemp)
3. [WordPress Sites](#wordpress-sites)
4. [Docker Containers](#docker-containers)
5. [Monitoring & Analytics](#monitoring--analytics)
6. [SSL Certificates](#ssl-certificates)
7. [Databases](#databases)
8. [Logs & Debugging](#logs--debugging)
9. [Backup & Recovery](#backup--recovery)
10. [Troubleshooting](#troubleshooting)

---

## SSH Access

### Connection Details
```bash
ssh -i /Users/andreyprokhorov/ssh/ssh/hostinger_key root@193.43.134.141
```

### SSH Session Management
**IMPORTANT:** When SSH times out, use simpler command format:
- ❌ Don't use: `ssh -i key root@ip 'command'` (can cause timeouts)
- ✅ Do use: `ssh -i key root@ip command` (more reliable)

### Key Information
- **SSH Key Path:** `/Users/andreyprokhorov/ssh/ssh/hostinger_key`
- **User:** root
- **Port:** 22 (default)

---

## Web Stack (LEMP)

### Nginx 1.26.3
**Status Check:**
```bash
systemctl status nginx
```

**Configuration:**
- Main config: `/etc/nginx/nginx.conf`
- Virtual hosts: `/etc/nginx/conf.d/*.conf`
- Logs: `/var/log/nginx/`

**Restart:**
```bash
systemctl restart nginx
```

**Test config:**
```bash
nginx -t
```

### PHP 8.3.19 (PHP-FPM)
**Status Check:**
```bash
systemctl status php-fpm
```

**Configuration:**
- Main config: `/etc/php.ini`
- FPM pool: `/etc/php-fpm.d/www.conf`
- **User/Group:** www-data (IMPORTANT: not nginx!)

**Key Settings:**
```bash
# In /etc/php-fpm.d/www.conf
user = www-data
group = www-data
listen = /run/php-fpm/www.sock
listen.acl_users = apache,nginx,www-data
pm.max_children = 50
```

**Installed Extensions:**
- ftp, curl, gd, mysqli, zip, mbstring, xml, imagick
- opcache, intl, PDO

**Restart:**
```bash
systemctl stop php-fpm
systemctl start php-fpm
systemctl status php-fpm
```

### MariaDB 10.11.11
**Status Check:**
```bash
systemctl status mariadb
```

**Access:**
```bash
mysql -u root -p
```

**Configuration:**
- Main config: `/etc/my.cnf.d/`
- Data directory: `/var/lib/mysql/`

---

## WordPress Sites

### 1. lagente.do (Native Installation)

**Domain:** https://lagente.do  
**Document Root:** `/var/www/lagente.do`  
**Nginx Config:** `/etc/nginx/conf.d/lagente.conf`

**File Ownership:**
```bash
# MUST be www-data:www-data
chown -R www-data:www-data /var/www/lagente.do
```

**Database:**
- Name: `lagente_wordpress`
- User: `lagente_wp`
- Password: `lagente_wp_native_2025`
- Host: `localhost`

**wp-config.php Location:**
```
/var/www/lagente.do/wp-config.php
```

**Key Config:**
```php
define('DB_NAME', 'lagente_wordpress');
define('DB_USER', 'lagente_wp');
define('DB_PASSWORD', 'lagente_wp_native_2025');
define('DB_HOST', 'localhost');
define('FS_METHOD', 'direct');
```

**Access Logs:**
```
/var/log/nginx/lagente.access.log
```

**Status:** ✅ Active, restored from UpdraftPlus backup

### 2. apartments.com.do (Native Installation)

**Domain:** https://apartments.com.do  
**Document Root:** `/var/www/apartments.com.do`  
**Nginx Config:** `/etc/nginx/conf.d/apartments.com.do.conf`

**File Ownership:**
```bash
# MUST be www-data:www-data
chown -R www-data:www-data /var/www/apartments.com.do
```

**Database:**
- Name: `apartments_wordpress`
- User: `apartments_wp`
- Password: `apartments_wp_native_2025`
- Host: `localhost`

**wp-config.php Location:**
```
/var/www/apartments.com.do/wp-config.php
```

**Access Logs:**
```
/var/log/nginx/apartments-access.log
```

**Status:** ✅ Active, awaiting UpdraftPlus restoration

---

## Docker Containers

### Overview
Only essential Docker services remain. WordPress containers have been migrated to native.

**Check Running Containers:**
```bash
docker ps
docker stats --no-stream
```

### Active Containers

#### 1. mailserver (Poste.io)
**Purpose:** Email server for domains  
**Memory:** ~2.078 GB (27.7% of total)  
**Status:** Active  
**Note:** Cannot migrate - Poste.io is Docker-only

**Access:**
```bash
docker logs mailserver
```

#### 2. netdata-legacy
**Purpose:** System monitoring  
**Memory:** ~58 MB  
**Access:** https://monitor.lagente.do  
**Credentials:** admin / Monitor@2025!

#### 3. portainer
**Purpose:** Docker management UI  
**Memory:** ~31 MB  
**Access:** Check portainer port configuration


---

## Monitoring & Analytics

### 1. Netdata (System Monitoring)

**URL:** https://monitor.lagente.do  
**Credentials:**
- Username: `admin`
- Password: `Monitor@2025!`

**Container:** netdata-legacy  
**Nginx Config:** `/etc/nginx/conf.d/monitor.lagente.do.conf`

**Features:**
- Real-time CPU, memory, disk, network monitoring
- Process tracking
- Service status
- Performance metrics

### 2. GoAccess (Web Analytics)

**URL:** https://webalizer.lagente.do  
**Credentials:**
- Username: `admin`
- Password: `Monitor@2025!`

**Nginx Config:** `/etc/nginx/conf.d/webalizer.lagente.do.conf`

**Reports:**
- lagente.do: https://webalizer.lagente.do/lagente.do/
- apartments.com.do: https://webalizer.lagente.do/apartments.com.do/

**Configuration Files:**
```bash
/etc/goaccess/lagente.do.conf
/etc/goaccess/apartments.com.do.conf
```

**Generation Scripts:**
```bash
/usr/local/bin/generate-lagente-analytics.sh
/usr/local/bin/generate-apartments-analytics.sh
```

**Script Content (lagente.do):**
```bash
#!/bin/bash
mkdir -p /var/www/webalizer/lagente.do
goaccess /var/log/nginx/lagente.access.log \
  --log-format=COMBINED \
  --geoip-database=/usr/share/GeoIP/GeoLite2-City.mmdb \
  --output /var/www/webalizer/lagente.do/index.html
```

**Script Content (apartments.com.do):**
```bash
#!/bin/bash
mkdir -p /var/www/webalizer/apartments.com.do
goaccess /var/log/nginx/apartments-access.log \
  --log-format=COMBINED \
  --geoip-database=/usr/share/GeoIP/GeoLite2-City.mmdb \
  --output /var/www/webalizer/apartments.com.do/index.html
```

**Automatic Updates (Cron Jobs):**
```bash
# Runs every hour at :00
0 * * * * /usr/local/bin/generate-lagente-analytics.sh > /dev/null 2>&1
0 * * * * /usr/local/bin/generate-apartments-analytics.sh > /dev/null 2>&1
```

**View Cron:**
```bash
crontab -l
```

**Manual Report Generation:**
```bash
/usr/local/bin/generate-lagente-analytics.sh
/usr/local/bin/generate-apartments-analytics.sh
```

**Report Locations:**
```
/var/www/webalizer/lagente.do/index.html
/var/www/webalizer/apartments.com.do/index.html
```

**GeoIP Database:**
```
/usr/share/GeoIP/GeoLite2-City.mmdb (63MB)
```

---

## SSL Certificates

### Certbot (Let's Encrypt)

**Certificate Locations:**
```
/etc/letsencrypt/live/lagente.do/
/etc/letsencrypt/live/apartments.com.do/
/etc/letsencrypt/live/monitor.lagente.do/
/etc/letsencrypt/live/webalizer.lagente.do/
```

**Each contains:**
- `fullchain.pem` - Certificate chain
- `privkey.pem` - Private key
- `cert.pem` - Certificate only
- `chain.pem` - Chain only

**Renewal:**
```bash
certbot renew --dry-run  # Test
certbot renew            # Actual renewal
```

**Auto-renewal:** Certbot timer should handle this automatically
```bash
systemctl status certbot-renew.timer
```

---

## Databases

### MariaDB Databases

**Access MySQL:**
```bash
mysql -u root -p
```

**List Databases:**
```sql
SHOW DATABASES;
```

### WordPress Databases

#### lagente_wordpress
```sql
-- Database details
Database: lagente_wordpress
User: lagente_wp
Password: lagente_wp_native_2025
Host: localhost

-- Check user permissions
SHOW GRANTS FOR 'lagente_wp'@'localhost';

-- Backup
mysqldump -u root -p lagente_wordpress > lagente_backup.sql

-- Restore
mysql -u root -p lagente_wordpress < lagente_backup.sql
```

#### apartments_wordpress
```sql
-- Database details
Database: apartments_wordpress
User: apartments_wp
Password: apartments_wp_native_2025
Host: localhost

-- Check user permissions
SHOW GRANTS FOR 'apartments_wp'@'localhost';

-- Backup
mysqldump -u root -p apartments_wordpress > apartments_backup.sql

-- Restore
mysql -u root -p apartments_wordpress < apartments_backup.sql
```

---

## Logs & Debugging

### Nginx Logs

**Access Logs:**
```bash
tail -f /var/log/nginx/access.log                    # All sites
tail -f /var/log/nginx/lagente.access.log           # lagente.do only
tail -f /var/log/nginx/apartments-access.log        # apartments.com.do only
```

**Error Logs:**
```bash
tail -f /var/log/nginx/error.log
```

**Check for errors:**
```bash
grep -i error /var/log/nginx/error.log | tail -20
```

### PHP-FPM Logs

**Error Log:**
```bash
tail -f /var/log/php-fpm/error.log
tail -f /var/log/php-fpm/www-error.log
```

**Check slow requests:**
```bash
tail -f /var/log/php-fpm/www-slow.log
```

### MariaDB Logs

**Error Log:**
```bash
tail -f /var/log/mariadb/mariadb.log
```

**Query Log (if enabled):**
```bash
tail -f /var/log/mariadb/query.log
```

### System Logs

**Journal (systemd):**
```bash
journalctl -xe                      # Recent logs with explanation
journalctl -u nginx -f              # Follow nginx logs
journalctl -u php-fpm -f            # Follow PHP-FPM logs
journalctl -u mariadb -f            # Follow MariaDB logs
```

**All system logs:**
```bash
tail -f /var/log/messages
```

---

## Backup & Recovery

### WordPress Backups (UpdraftPlus)

**Plugin:** UpdraftPlus installed on both sites  
**Requirements:** PHP-FTP extension (already installed)

**Restore Process:**
1. Access WordPress admin
2. Go to UpdraftPlus → Existing Backups
3. Click "Restore" on desired backup
4. Select components to restore
5. Click "Restore"

### Manual File Backups

**Backup WordPress files:**
```bash
# lagente.do
tar -czf lagente_files_$(date +%Y%m%d).tar.gz /var/www/lagente.do

# apartments.com.do
tar -czf apartments_files_$(date +%Y%m%d).tar.gz /var/www/apartments.com.do
```

**Restore:**
```bash
tar -xzf lagente_files_YYYYMMDD.tar.gz -C /
```

### Database Backups

**Export:**
```bash
# lagente.do database
mysqldump -u root -p lagente_wordpress > lagente_db_$(date +%Y%m%d).sql

# apartments.com.do database
mysqldump -u root -p apartments_wordpress > apartments_db_$(date +%Y%m%d).sql

# All databases
mysqldump -u root -p --all-databases > all_databases_$(date +%Y%m%d).sql
```

**Import:**
```bash
mysql -u root -p lagente_wordpress < lagente_db_YYYYMMDD.sql
mysql -u root -p apartments_wordpress < apartments_db_YYYYMMDD.sql
```

---

## Troubleshooting

### WordPress Issues

#### Site Shows 502 Bad Gateway
**Cause:** PHP-FPM not running or socket issue

**Fix:**
```bash
# Check PHP-FPM status
systemctl status php-fpm

# Restart if needed
systemctl restart php-fpm

# Check socket exists
ls -la /run/php-fpm/www.sock
```

#### Site Shows 403 Forbidden
**Cause:** Wrong file ownership or permissions

**Fix:**
```bash
# Fix ownership (CRITICAL)
chown -R www-data:www-data /var/www/lagente.do
chown -R www-data:www-data /var/www/apartments.com.do

# Fix permissions
find /var/www/lagente.do -type d -exec chmod 755 {} \;
find /var/www/lagente.do -type f -exec chmod 644 {} \;
```

#### Site Shows 404 for CSS/JS (After Restore)
**Cause:** Plugin cache not regenerated

**Fix:**
```bash
# Clear Jetpack Boost cache
rm -rf /var/www/lagente.do/wp-content/boost-cache/*
rm -rf /var/www/lagente.do/wp-content/endurance-page-cache/*

# For apartments.com.do
rm -rf /var/www/apartments.com.do/wp-content/boost-cache/*
rm -rf /var/www/apartments.com.do/wp-content/endurance-page-cache/*
```

#### Can't Upload/Install Plugins
**Cause:** Wrong ownership or FS_METHOD not set

**Fix:**
```bash
# Ensure www-data ownership
chown -R www-data:www-data /var/www/lagente.do

# Check wp-config.php has:
# define('FS_METHOD', 'direct');
```

### PHP-FPM Issues

#### High CPU Usage
**Check active processes:**
```bash
ps aux | grep php-fpm | wc -l  # Count processes
top -u www-data                 # Monitor www-data processes
```

**Reduce max children:**
```bash
# Edit /etc/php-fpm.d/www.conf
# Change: pm.max_children = 50
# To: pm.max_children = 25

systemctl restart php-fpm
```

#### Memory Issues
**Check memory usage:**
```bash
ps aux | grep php-fpm | awk '{sum+=$6} END {print sum/1024 " MB"}'
```

### Database Issues

#### Can't Connect
**Check MariaDB is running:**
```bash
systemctl status mariadb
```

**Test connection:**
```bash
mysql -u lagente_wp -p -h localhost lagente_wordpress
```

**Check user exists:**
```sql
SELECT user, host FROM mysql.user WHERE user LIKE '%lagente%';
```

### Nginx Issues

#### Config Test Failed
```bash
nginx -t  # Shows exact error
```

**Common fixes:**
```bash
# Check all configs
nginx -T | less

# Test specific config
nginx -t -c /etc/nginx/conf.d/lagente.conf
```

### SSL Certificate Issues

#### Certificate Expired
```bash
certbot renew --force-renewal
systemctl reload nginx
```

#### Certificate Path Wrong
**Check nginx config points to:**
```nginx
ssl_certificate /etc/letsencrypt/live/domain.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/domain.com/privkey.pem;
```

### SSH Timeout Issues

**If SSH times out:**
1. Wait 30 seconds
2. Use simpler command format: `ssh -i key root@ip command`
3. Avoid quotes in command when possible

**Check if server is reachable:**
```bash
ping 193.43.134.141
curl -I https://lagente.do
```

---

## System Resources

### Memory Usage Check

**Current usage:**
```bash
free -h
```

**Top memory consumers:**
```bash
ps aux --sort=-%mem | head -10
```

**Docker containers:**
```bash
docker stats --no-stream
```

### Disk Usage

**Overall:**
```bash
df -h
```

**WordPress directories:**
```bash
du -sh /var/www/*
```

**Logs:**
```bash
du -sh /var/log/nginx/
```

### CPU Usage

**Current load:**
```bash
uptime
```

**Top CPU consumers:**
```bash
top
# or
htop  # if installed
```

**PHP-FPM specific:**
```bash
ps aux | grep php-fpm
```

---

## Quick Reference Commands

### Service Management
```bash
# Restart all web services
systemctl restart nginx php-fpm mariadb

# Check all service status
systemctl status nginx php-fpm mariadb

# View service logs
journalctl -u nginx -f
journalctl -u php-fpm -f
journalctl -u mariadb -f
```

### File Ownership Fix
```bash
# CRITICAL: WordPress files must be www-data
chown -R www-data:www-data /var/www/lagente.do
chown -R www-data:www-data /var/www/apartments.com.do
```

### Clear All Caches
```bash
# WordPress cache
rm -rf /var/www/lagente.do/wp-content/cache/*
rm -rf /var/www/lagente.do/wp-content/boost-cache/*
rm -rf /var/www/apartments.com.do/wp-content/cache/*
rm -rf /var/www/apartments.com.do/wp-content/boost-cache/*

# Nginx cache (if configured)
rm -rf /var/cache/nginx/*

# PHP opcache
systemctl restart php-fpm
```

### Check Everything is Running
```bash
# One-liner status check
echo "=== Nginx ===" && systemctl is-active nginx && \
echo "=== PHP-FPM ===" && systemctl is-active php-fpm && \
echo "=== MariaDB ===" && systemctl is-active mariadb && \
echo "=== Docker ===" && docker ps --format "table {{.Names}}\t{{.Status}}"
```

---

## Important Notes

### File Ownership Rules
⚠️ **CRITICAL:** All WordPress files MUST be owned by `www-data:www-data`
- PHP-FPM runs as `www-data`
- Nginx runs as `nginx` but hands off to PHP-FPM
- Wrong ownership = permission errors, can't install plugins, can't upload files

### Memory Considerations
- **Page cache is normal:** 2-3GB of "used" memory is Linux caching files, this is good
- **Docker mailserver:** Uses 2GB, cannot be reduced (Poste.io is heavy)
- **PHP-FPM workers:** 17 workers × ~200MB each = ~3.4GB (can be reduced if needed)

### Log Rotation
- Nginx logs rotate automatically
- Check `/etc/logrotate.d/nginx` for configuration
- Old logs in `/var/log/nginx/*.log.1.gz`

### Security
- SSH key authentication only (no password)
- All admin panels password protected
- SSL/HTTPS for all domains
- Firewall rules (check with `firewall-cmd --list-all`)

---

### Remaining Docker Services
- mailserver (Poste.io) - Cannot migrate, Docker-only
- netdata-legacy - Monitoring
- portainer - Docker management

---

## Support & Documentation

### Useful Commands Reference
- **System info:** `uname -a`
- **OS version:** `cat /etc/os-release`
- **Installed packages:** `dnf list installed | grep <package>`
- **Process tree:** `pstree -p`
- **Network connections:** `netstat -tulpn` or `ss -tulpn`
- **Firewall rules:** `firewall-cmd --list-all`

### Configuration Backup
It's recommended to backup all configs before changes:
```bash
tar -czf config_backup_$(date +%Y%m%d).tar.gz \
  /etc/nginx/conf.d/ \
  /etc/php-fpm.d/ \
  /etc/php.ini \
  /var/www/lagente.do/wp-config.php \
  /var/www/apartments.com.do/wp-config.php
```

---

**Last Updated:** October 27, 2025  
**Maintained by:** System Administrator  
**VPS Provider:** Hostinger
