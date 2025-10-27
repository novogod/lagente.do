# Netdata Monitoring Configuration

## Access Information

**URL:** https://monitor.lagente.do

**Credentials:**
- Username: `admin`
- Password: `XdQYnCMDwmkGXQ0S+5rsNQ==`

Credentials are stored on the server at: `/root/.monitor-credentials`

## Installation Details

- **Version:** v1.46.0 (stable, non-cloud)
- **Installation Type:** Static binary package
- **Installation Path:** `/opt/netdata/`
- **Installation Date:** October 27, 2025
- **Upgraded From:** v1.44.3 (October 27, 2025)
- **Telemetry:** Disabled (`--disable-telemetry`)
- **Cloud:** Disabled
- **Port:** 19999 (local only, proxied via Nginx)

## Services

### Netdata Service
```bash
# Check status
systemctl status netdata

# Restart service
systemctl restart netdata

# View logs
journalctl -u netdata -f
```

### Configuration Files
- Main config: `/opt/netdata/etc/netdata/netdata.conf`
- Plugin configs: `/opt/netdata/etc/netdata/go.d/*.conf`
- Custom configs: `/opt/netdata/etc/netdata/*.conf`
- Old v1.44.3 configs (backed up): `/root/netdata-backup-v1.44.3/`

## Nginx Reverse Proxy

**Config File:** `/etc/nginx/conf.d/monitor.lagente.do.conf`

**Features:**
- SSL/TLS encryption (Let's Encrypt)
- HTTP to HTTPS redirect
- Basic authentication
- WebSocket support for real-time updates
- Security headers (HSTS, X-Frame-Options, etc.)

**Authentication File:** `/etc/nginx/auth/monitor.htpasswd`

### Update Credentials
```bash
# Generate new password
NEW_PASS=$(openssl rand -base64 16)

# Update htpasswd file
htpasswd -cb /etc/nginx/auth/monitor.htpasswd admin "$NEW_PASS"

# Save credentials
echo "admin:$NEW_PASS" > /root/.monitor-credentials

# Reload Nginx
systemctl reload nginx
```

## Monitoring Features

### Real-time Metrics (No Configuration Required)
- CPU usage (per core and total)
- Memory and swap usage
- Disk I/O and space utilization
- Network traffic (inbound/outbound)
- Running processes and their resource usage
- System load averages
- Temperature sensors
- Network connections

### Advanced Features
- eBPF kernel monitoring
- Process monitoring (apps.plugin)
- Network QoS monitoring
- Go collector plugins (600+ integrations)

## Maintenance

### Current Version
```bash
# Check installed version
/opt/netdata/usr/sbin/netdata -V
# Output: netdata v1.46.0
```

### Rollback to v1.44.3 (if needed)

**Backup Location:** `/root/netdata-backup-v1.44.3/`

**Rollback Steps:**
```bash
# Stop current Netdata
systemctl stop netdata

# Restore old binary
cp /root/netdata-backup-v1.44.3/netdata-binary-v1.44.3 /usr/sbin/netdata
chmod +x /usr/sbin/netdata

# Restore old configuration
tar xzf /root/netdata-backup-v1.44.3/netdata-config-*.tar.gz -C /

# Restore old plugins
tar xzf /root/netdata-backup-v1.44.3/netdata-plugins-*.tar.gz -C /

# Update systemd service to use old path
sed -i 's|ExecStart=/opt/netdata/usr/sbin/netdata|ExecStart=/usr/sbin/netdata|' /usr/lib/systemd/system/netdata.service
systemctl daemon-reload

# Start Netdata
systemctl start netdata

# Verify rollback
netdata -V  # Should show v1.44.3
```

### Update Netdata (Future Updates)
```bash
# Download new static binary from https://github.com/netdata/netdata/releases/
cd /tmp
wget https://github.com/netdata/netdata/releases/download/vX.XX.X/netdata-vX.XX.X.gz.run
chmod +x netdata-vX.XX.X.gz.run

# Stop service and install
systemctl stop netdata
./netdata-vX.XX.X.gz.run --accept -- --dont-wait --disable-telemetry

# Restore custom configuration
sed -i '/^\[cloud\]/a\    enabled = no' /opt/netdata/etc/netdata/netdata.conf
sed -i '/^\[web\]/a\    enable version update check = no' /opt/netdata/etc/netdata/netdata.conf

# Restart
systemctl restart netdata
```

### Uninstall
```bash
# Run uninstaller
/usr/libexec/netdata/netdata-uninstaller.sh --yes --force
```

### Memory Optimization (KSM)
Enable Kernel Same-page Merging to reduce memory usage by 40-60%:
```bash
echo 1 > /sys/kernel/mm/ksm/run
echo 1000 > /sys/kernel/mm/ksm/sleep_millisecs
```

## SSL Certificate

**Certificate Path:** `/etc/letsencrypt/live/monitor.lagente.do/`
- Full chain: `fullchain.pem`
- Private key: `privkey.pem`

**Auto-renewal:** Managed by certbot (automatic)

```bash
# Check certificate expiry
certbot certificates | grep monitor.lagente.do

# Force renewal (if needed)
certbot renew --force-renewal -d monitor.lagente.do
```

## Troubleshooting

### Netdata Not Responding
```bash
# Check service status
systemctl status netdata

# Check if port is listening
ss -tlnp | grep 19999

# Restart service
systemctl restart netdata
```

### 401 Unauthorized Error
```bash
# Verify htpasswd file exists
cat /etc/nginx/auth/monitor.htpasswd

# Check credentials
cat /root/.monitor-credentials

# Test authentication
curl -u admin:PASSWORD https://monitor.lagente.do
```

### WebSocket Connection Issues
```bash
# Check Nginx logs
tail -f /var/log/nginx/monitor-error.log

# Verify proxy settings in Nginx config
grep -A5 "Upgrade" /etc/nginx/conf.d/monitor.lagente.do.conf
```

## Security Notes

1. **Basic Auth:** Protects dashboard access with username/password
2. **HTTPS Only:** All traffic encrypted via SSL/TLS
3. **Local Binding:** Netdata only listens on localhost (127.0.0.1:19999)
4. **Security Headers:** HSTS, X-Frame-Options, X-XSS-Protection enabled
5. **No Cloud:** Telemetry and cloud features completely disabled

## Resources

- Dashboard: https://monitor.lagente.do
- Local access (from server): http://localhost:19999
- Logs: `/var/log/nginx/monitor-*.log`
- Documentation: https://learn.netdata.cloud/docs/
