# VPS Backup Systems Documentation

**Server:** 193.43.134.141  
**Last Updated:** October 27, 2025

---

## Table of Contents
1. [Overview](#overview)
2. [Mail Server Backups (Automated)](#mail-server-backups-automated)
3. [WordPress Backups (UpdraftPlus)](#wordpress-backups-updraftplus)
4. [Manual Backup Procedures](#manual-backup-procedures)
5. [Backup Monitoring](#backup-monitoring)
6. [Restore Procedures](#restore-procedures)
7. [Backup Storage Locations](#backup-storage-locations)

---

## Overview

The VPS implements a multi-tier backup strategy covering:
- **Mail Server**: Automated daily full backups via cron
- **WordPress Sites**: UpdraftPlus plugin with cloud storage integration
- **Database**: Manual backup procedures available
- **Configuration Files**: Included in service-specific backups

### Backup Strategy Summary

| Service | Method | Frequency | Retention | Type | Size |
|---------|--------|-----------|-----------|------|------|
| Mail Server (Poste.io) | Automated Cron | Daily 4 AM | 10 days | Full | ~1.5GB |
| WordPress (lagente.do) | UpdraftPlus | Manual/Scheduled | Cloud | Full | Varies |
| WordPress (apartments.com.do) | UpdraftPlus | Manual/Scheduled | Cloud | Full | Varies |
| MariaDB Databases | Manual | On-demand | N/A | Full | Varies |

---

## Mail Server Backups (Automated)

### Configuration

**Cron Schedule:**
```bash
0 4 * * * /root/backups/mail-server/create-backup.sh >> /var/log/mail-backup.log 2>&1
```

**Backup Details:**
- **Service:** Poste.io mail server (Docker container: `mailserver`)
- **Frequency:** Daily at 4:00 AM (EDT/EST local time)
- **Type:** Full backup (not incremental)
- **Retention:** Last 10 days automatically maintained
- **Size:** Approximately 1.5GB per backup
- **Compression:** tar.gz
- **Integrity:** SHA256 checksums generated for each backup

### Directory Structure

```
/root/backups/mail-server/
├── current/          # Daily backups (last 10 days)
├── archive/          # Monthly backups (1st of each month)
├── restore/          # Downloaded backups ready for restoration
├── create-backup.sh  # Backup creation script
├── restore-backup.sh # Backup restoration script
├── README.md         # Backup documentation
└── HOWTO.txt         # Quick reference guide
```

### What Gets Backed Up

**Source Directory:** `/opt/posty/data/`

**Included:**
- `users.db` - User accounts, passwords, authentication data
- `dav.db` - Calendar (CalDAV) and contacts (CardDAV) data
- `server.ini` - Mail server configuration
- `domains/` - Domain configurations and settings
- `maildata/` - All email messages in maildir format
- `ssl/` - TLS/SSL certificates for secure connections
- `roundcube/` - Webmail interface data and settings

**Excluded (temporary/cache data):**
- `data/log/*` - Log files (regenerated)
- `data/redis/*` - Cache data
- `data/queue/*` - Mail queue (transient)

### Backup Files

**Naming Convention:**
```
poste-backup-YYYYMMDD_HHMMSS.tar.gz
poste-backup-YYYYMMDD_HHMMSS.tar.gz.sha256
```

**Example:**
```
poste-backup-20251027_130837.tar.gz       # Backup archive
poste-backup-20251027_130837.tar.gz.sha256 # Checksum file
```

### Automatic Cleanup

The backup script automatically:
1. Creates new backup with timestamp
2. Generates SHA256 checksum
3. Deletes backups older than 10 days
4. On 1st of month: copies backup to `archive/` directory
5. Logs all operations to `/var/log/mail-backup.log`

### Manual Backup

To create an immediate backup outside the schedule:

```bash
ssh -i /path/to/key root@193.43.134.141
cd /root/backups/mail-server
./create-backup.sh
```

### Backup Script Location

**Script:** `/root/backups/mail-server/create-backup.sh`

**Key Configuration:**
```bash
BACKUP_DIR="/root/backups/mail-server/current"
ARCHIVE_DIR="/root/backups/mail-server/archive"
DATA_DIR="/opt/posty/data"
RETENTION_DAYS=10  # Backups older than this are deleted
```

### Backup Logs

**Log File:** `/var/log/mail-backup.log`

**View Recent Logs:**
```bash
tail -f /var/log/mail-backup.log
```

**View All Logs:**
```bash
cat /var/log/mail-backup.log
```

### Monitoring Backups

**Check Recent Backups:**
```bash
ls -lh /root/backups/mail-server/current/
```

**Check Backup Sizes:**
```bash
du -sh /root/backups/mail-server/current/*
```

**Verify Checksums:**
```bash
cd /root/backups/mail-server/current/
sha256sum -c poste-backup-20251027_130837.tar.gz.sha256
```

**Check Disk Space:**
```bash
df -h /root/backups/
```

---

## WordPress Backups (UpdraftPlus)

### Overview

Both WordPress sites use the **UpdraftPlus** plugin for backup and restoration.

**Features:**
- Full site backups (files + database)
- Cloud storage integration (Google Drive, Dropbox, etc.)
- Scheduled automatic backups
- One-click restoration from WordPress admin
- Incremental backup options
- Migration capability

### lagente.do WordPress Backups

**Document Root:** `/var/www/lagente.do`  
**Backup Directory:** `/var/www/lagente.do/wp-content/updraft/`  
**Plugin Status:** ✅ Active and configured

**Access:**
1. Go to: https://lagente.do/wp-admin
2. Navigate to: Settings → UpdraftPlus Backups

**Local Backup Files:**
```bash
/var/www/lagente.do/wp-content/updraft/
├── backup_*-db.gz              # Database dumps
├── backup_*-plugins.zip        # Plugin files
├── backup_*-themes.zip         # Theme files
├── backup_*-uploads.zip        # Media uploads
├── backup_*-others.zip         # Other wp-content files
├── backup_*-mu-plugins.zip     # Must-use plugins
├── log.*.txt                   # Backup operation logs
├── plugins-old/                # Restored plugin backups
├── themes-old/                 # Restored theme backups
└── uploads-old/                # Restored upload backups
```

**Recent Activity:**
- Last backup: October 27, 2025 (16:00)
- Restoration performed from cloud backup
- Site successfully migrated from Docker to native

**Backup Components:**
- ✅ Database (lagente_wordpress)
- ✅ Plugins
- ✅ Themes  
- ✅ Uploads (media library)
- ✅ Other wp-content files
- ✅ Must-use plugins

### apartments.com.do WordPress Backups

**Document Root:** `/var/www/apartments.com.do`  
**Backup Directory:** `/var/www/apartments.com.do/wp-content/updraft/`  
**Plugin Status:** ✅ Active and configured

**Access:**
1. Go to: https://apartments.com.do/wp-admin
2. Navigate to: Settings → UpdraftPlus Backups

**Local Backup Files:**
```bash
/var/www/apartments.com.do/wp-content/updraft/
├── backup_*-db.gz              # Database dumps
├── backup_*-plugins.zip        # Plugin files
├── backup_*-themes.zip         # Theme files
├── backup_*-uploads.zip        # Media uploads
├── backup_*-others.zip         # Other wp-content files
├── log.*.txt                   # Backup operation logs
├── plugins-old/                # Restored plugin backups
├── themes-old/                 # Restored theme backups
└── uploads-old/                # Restored upload backups
```

**Recent Activity:**
- Restoration in progress/pending
- Site migrated from Docker to native
- Awaiting full UpdraftPlus restoration

### UpdraftPlus Configuration

**Requirements:**
- PHP FTP extension: ✅ Installed
- File permissions: www-data:www-data
- WordPress direct filesystem access: ✅ Enabled (`FS_METHOD=direct`)

**Cloud Storage:**
- Configured per site via WordPress admin
- Supports Google Drive, Dropbox, Amazon S3, etc.
- Recommended: Store backups off-server

### Creating Manual WordPress Backup

**Via WordPress Admin:**
1. Login to WordPress admin panel
2. Go to Settings → UpdraftPlus Backups
3. Click "Backup Now"
4. Select components to backup
5. Choose destination (local/cloud)
6. Click "Backup Now"

**Backup Scheduling:**
- Configure in UpdraftPlus settings
- Recommended: Daily database, weekly files
- Set retention policy per backup type

---

## Manual Backup Procedures

### Database Backups

#### Export All Databases

```bash
ssh -i /path/to/key root@193.43.134.141
mysqldump -u root -p --all-databases > all_databases_$(date +%Y%m%d).sql
```

#### Export lagente.do Database

```bash
mysqldump -u root -p lagente_wordpress > lagente_db_$(date +%Y%m%d).sql
```

**Database Details:**
- Name: `lagente_wordpress`
- User: `lagente_wp`
- Password: `lagente_wp_native_2025`

#### Export apartments.com.do Database

```bash
mysqldump -u root -p apartments_wordpress > apartments_db_$(date +%Y%m%d).sql
```

**Database Details:**
- Name: `apartments_wordpress`
- User: `apartments_wp`
- Password: `apartments_wp_native_2025`

### WordPress Files Backup

#### Backup lagente.do Files

```bash
cd /var/www
tar -czf lagente_files_$(date +%Y%m%d).tar.gz lagente.do/
```

#### Backup apartments.com.do Files

```bash
cd /var/www
tar -czf apartments_files_$(date +%Y%m%d).tar.gz apartments.com.do/
```

### Configuration Files Backup

#### Nginx Configurations

```bash
tar -czf nginx_config_$(date +%Y%m%d).tar.gz /etc/nginx/conf.d/
```

#### PHP-FPM Configuration

```bash
tar -czf php_config_$(date +%Y%m%d).tar.gz /etc/php-fpm.d/ /etc/php.ini
```

#### Complete System Configuration

```bash
tar -czf system_config_$(date +%Y%m%d).tar.gz \
  /etc/nginx/conf.d/ \
  /etc/php-fpm.d/ \
  /etc/php.ini \
  /var/www/lagente.do/wp-config.php \
  /var/www/apartments.com.do/wp-config.php \
  /etc/goaccess/
```

---

## Restore Procedures

### Mail Server Restore

#### From Local Backup

**Prerequisites:**
1. Backup file exists in `/root/backups/mail-server/current/` or `archive/`
2. Mail server Docker container exists

**Restore Steps:**

```bash
# 1. SSH to server
ssh -i /path/to/key root@193.43.134.141

# 2. Navigate to backup directory
cd /root/backups/mail-server

# 3. Stop mail server
docker stop mailserver

# 4. Run restore script
./restore-backup.sh poste-backup-20251027_130837.tar.gz

# 5. Start mail server
docker start mailserver

# 6. Verify
docker logs mailserver
ss -tlnp | grep ':587'  # Check SMTP port
```

**What the Restore Script Does:**
1. Stops mail server container if running
2. Backs up current data to `pre-restore-TIMESTAMP.tar.gz`
3. Removes old data directory
4. Extracts backup archive
5. Sets correct ownership (`mail:mail`)
6. Fixes SSL certificate permissions
7. Ready for container restart

#### From Google Drive Backup

**Download to Server:**

```bash
# Option 1: Download to Mac, then upload
scp /path/to/backup.tar.gz root@193.43.134.141:/root/backups/mail-server/restore/

# Option 2: Use rclone or wget on server (if configured)
```

**Then follow local restore procedure above.**

#### Restore Script Location

**Script:** `/root/backups/mail-server/restore-backup.sh`

**Usage:**
```bash
./restore-backup.sh <backup-file.tar.gz>
```

### WordPress Restore (UpdraftPlus)

#### Restore from Cloud Backup

**Via WordPress Admin:**

1. **Access WordPress admin**
   - Go to: https://lagente.do/wp-admin (or apartments.com.do)
   - Login with administrator credentials

2. **Navigate to UpdraftPlus**
   - Go to: Settings → UpdraftPlus Backups
   - Click "Existing Backups" tab

3. **Select Backup to Restore**
   - Backups from cloud storage will appear
   - Click "Restore" on desired backup
   - Wait for backup download (may take time)

4. **Choose Components**
   - Select what to restore:
     - ✅ Database
     - ✅ Plugins
     - ✅ Themes
     - ✅ Uploads
     - ✅ Others
     - ✅ Must-use plugins

5. **Start Restoration**
   - Click "Restore" button
   - Wait for process to complete
   - May take 10-30 minutes depending on site size

6. **Post-Restore Actions**
   - Clear cache (if using cache plugin)
   - Regenerate Jetpack Boost cache if needed
   - Verify site functionality
   - Check permalinks: Settings → Permalinks → Save

#### Restore from Local Backup

If backup files exist in `/var/www/*/wp-content/updraft/`:

1. Go to UpdraftPlus → Existing Backups
2. Click "Rescan local folder"
3. Local backups will appear
4. Follow restore procedure above

#### Manual Database Restore

If UpdraftPlus fails:

```bash
# 1. Stop PHP-FPM
systemctl stop php-fpm

# 2. Import database
mysql -u root -p lagente_wordpress < lagente_db_backup.sql

# 3. Start PHP-FPM
systemctl start php-fpm

# 4. Clear WordPress cache
rm -rf /var/www/lagente.do/wp-content/cache/*
rm -rf /var/www/lagente.do/wp-content/boost-cache/*
```

---

## Backup Monitoring

### Check Backup Status

#### Mail Server Backups

**List current backups:**
```bash
ls -lh /root/backups/mail-server/current/
```

**Check backup sizes:**
```bash
du -sh /root/backups/mail-server/current/*
```

**Count backups:**
```bash
ls /root/backups/mail-server/current/*.tar.gz | wc -l
```

**View backup log:**
```bash
tail -50 /var/log/mail-backup.log
```

**Check last backup time:**
```bash
ls -lt /root/backups/mail-server/current/*.tar.gz | head -1
```

#### WordPress Backups

**Check UpdraftPlus status:**
- Via WordPress admin: Settings → UpdraftPlus Backups
- View backup history
- Check cloud storage connection
- Review logs

**Check local backup size:**
```bash
du -sh /var/www/lagente.do/wp-content/updraft/
du -sh /var/www/apartments.com.do/wp-content/updraft/
```

### Disk Space Monitoring

**Overall disk usage:**
```bash
df -h
```

**Backup directories:**
```bash
du -sh /root/backups/*
du -sh /var/www/*/wp-content/updraft/
```

**Available space:**
```bash
df -h / | grep -v Filesystem
```

### Cron Job Verification

**List all cron jobs:**
```bash
crontab -l
```

**Expected output:**
```
0 * * * * /usr/local/bin/generate-lagente-analytics.sh > /dev/null 2>&1
0 * * * * /usr/local/bin/generate-apartments-analytics.sh > /dev/null 2>&1
0 4 * * * /root/backups/mail-server/create-backup.sh >> /var/log/mail-backup.log 2>&1
```

**Check cron service:**
```bash
systemctl status crond
```

**View cron logs:**
```bash
journalctl -u crond | tail -20
```

---

## Backup Storage Locations

### Complete Directory Map

```
/root/backups/
└── mail-server/              # Mail server backup system
    ├── current/              # Daily backups (last 10 days)
    │   ├── poste-backup-YYYYMMDD_HHMMSS.tar.gz
    │   └── poste-backup-YYYYMMDD_HHMMSS.tar.gz.sha256
    ├── archive/              # Monthly backups (1st of month)
    │   ├── poste-backup-YYYYMMDD_HHMMSS.tar.gz
    │   └── poste-backup-YYYYMMDD_HHMMSS.tar.gz.sha256
    ├── restore/              # Downloaded backups for restoration
    ├── create-backup.sh      # Backup creation script
    ├── restore-backup.sh     # Restoration script
    ├── README.md             # Documentation
    └── HOWTO.txt             # Quick reference

/var/www/lagente.do/wp-content/updraft/
├── backup_*-db.gz            # Database backups
├── backup_*-plugins.zip      # Plugin backups
├── backup_*-themes.zip       # Theme backups
├── backup_*-uploads.zip      # Media backups
├── backup_*-others.zip       # Other files
├── log.*.txt                 # Backup logs
├── plugins-old/              # Previous plugin versions
├── themes-old/               # Previous theme versions
└── uploads-old/              # Previous uploads

/var/www/apartments.com.do/wp-content/updraft/
├── backup_*-db.gz            # Database backups
├── backup_*-plugins.zip      # Plugin backups
├── backup_*-themes.zip       # Theme backups
├── backup_*-uploads.zip      # Media backups
├── backup_*-others.zip       # Other files
├── log.*.txt                 # Backup logs
├── plugins-old/              # Previous plugin versions
├── themes-old/               # Previous theme versions
└── uploads-old/              # Previous uploads

/home/backupuser/
└── backups/
    └── mail-server -> /root/backups/mail-server  # Symlink for backup access

/root/migration-backup/       # Temporary directory (empty, can be removed)

/var/log/
└── mail-backup.log           # Mail backup cron job logs
```

### Access Permissions

**Mail Server Backups:**
- Owner: `root:root`
- Scripts: `755` (executable)
- Backup files: `644` (read-only)
- Directory: `/root/backups/mail-server/`

**WordPress Backups:**
- Owner: `www-data:www-data`
- Files: `644`
- Directories: `755`
- Location: `/var/www/*/wp-content/updraft/`

**Backup User:**
- User: `backupuser`
- Home: `/home/backupuser`
- Symlink access to: `/root/backups/mail-server/`

---

## Backup Size Estimates

### Current Sizes

| Backup Type | Size | Location |
|-------------|------|----------|
| Mail Server (full) | ~1.5GB | /root/backups/mail-server/current/ |
| lagente.do files | ~300-500MB | /var/www/lagente.do/ |
| lagente.do database | ~10-50MB | MySQL dump |
| apartments.com.do files | ~300-500MB | /var/www/apartments.com.do/ |
| apartments.com.do database | ~10-50MB | MySQL dump |

### Storage Requirements

**Mail Server (10 days retention):**
- 1.5GB × 10 days = ~15GB

**WordPress Local Backups (if stored locally):**
- Per site: ~500MB per backup
- Recommended: Use cloud storage to save disk space

**Total Backup Storage:**
- Mail: ~15GB (current + archive)
- WordPress: Minimal (cloud storage)
- Logs: <100MB
- **Total:** ~15-20GB disk space

---

## Backup Best Practices

### Recommendations

1. **Off-site Storage**
   - Mail backups: Consider syncing to cloud storage
   - WordPress: Always use cloud storage (Google Drive, etc.)
   - Don't rely solely on local backups

2. **Test Restores**
   - Periodically test restore procedures
   - Verify backup integrity
   - Check checksums for mail backups

3. **Monitor Disk Space**
   - Watch backup directories growth
   - Ensure sufficient space for rotations
   - Clean up old/unnecessary backups

4. **Document Changes**
   - Update this file when backup procedures change
   - Record restore procedures after testing
   - Note any issues encountered

5. **Security**
   - Protect backup files (contain sensitive data)
   - Restrict access to backup directories
   - Encrypt backups if transferred off-site

6. **Retention Strategy**
   - Mail: 10 days current + monthly archives
   - WordPress: Configure per business needs
   - Database: Keep before major changes

### Backup Checklist

**Weekly:**
- ✅ Verify mail backups are running (check log)
- ✅ Check backup disk space
- ✅ Review backup sizes for anomalies

**Monthly:**
- ✅ Test WordPress backup/restore
- ✅ Verify cloud storage connections
- ✅ Review backup retention policies
- ✅ Clean up old archives if needed

**Before Major Changes:**
- ✅ Create manual WordPress backup
- ✅ Export databases
- ✅ Backup configuration files
- ✅ Document current state

---

## Troubleshooting

### Mail Backup Issues

**Problem: Backup script fails**

```bash
# Check script permissions
ls -l /root/backups/mail-server/create-backup.sh

# Should be: -rwxr-xr-x (executable)
chmod +x /root/backups/mail-server/create-backup.sh

# Run manually to see errors
/root/backups/mail-server/create-backup.sh
```

**Problem: Disk full**

```bash
# Check space
df -h

# Remove old backups manually
rm /root/backups/mail-server/current/poste-backup-OLD*.tar.gz

# Or keep fewer days (edit script)
# Change: find "${BACKUP_DIR}" -name "poste-backup-*.tar.gz" -mtime +10 -delete
# To:     find "${BACKUP_DIR}" -name "poste-backup-*.tar.gz" -mtime +5 -delete
```

**Problem: Cron not running**

```bash
# Check cron service
systemctl status crond

# Start if stopped
systemctl start crond

# Verify cron entry
crontab -l | grep backup

# Check cron logs
journalctl -u crond | tail -20
```

### WordPress Backup Issues

**Problem: UpdraftPlus restore fails**

1. Check PHP memory limit: `/etc/php.ini`
2. Increase if needed: `memory_limit = 512M`
3. Restart PHP-FPM: `systemctl restart php-fpm`
4. Try restore again

**Problem: Can't access UpdraftPlus**

```bash
# Check file ownership
ls -la /var/www/lagente.do/wp-content/plugins/updraftplus/

# Fix if needed
chown -R www-data:www-data /var/www/lagente.do/
```

**Problem: Backup files missing**

1. Check WordPress admin → UpdraftPlus → Settings
2. Verify cloud storage connection
3. Re-authenticate if needed
4. Rescan remote storage

---

## Emergency Contacts & Resources

### Documentation Files

- **This file:** `/Volumes/Working_MacOS_Extended/Kilo_Code_Workspase/lagente.do/BACKUPS.md`
- **VPS Documentation:** `/Volumes/Working_MacOS_Extended/Kilo_Code_Workspase/lagente.do/VPS-DOCUMENTATION.md`
- **Mail Backup README:** `/root/backups/mail-server/README.md`
- **Mail Backup HOWTO:** `/root/backups/mail-server/HOWTO.txt`

### Quick Commands Reference

```bash
# Check all backups
ls -lh /root/backups/mail-server/current/
ls -lh /var/www/*/wp-content/updraft/

# View backup logs
tail -f /var/log/mail-backup.log
cat /var/www/lagente.do/wp-content/updraft/log.*.txt

# Create manual backups
/root/backups/mail-server/create-backup.sh
mysqldump -u root -p lagente_wordpress > backup.sql

# Check cron jobs
crontab -l

# Monitor disk space
df -h
du -sh /root/backups/*
```

---

**Last Review:** October 27, 2025  
**Next Review:** November 27, 2025  
**Maintained by:** System Administrator
