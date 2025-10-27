#!/bin/bash

# Script to fix localhost URLs in WordPress database
set -e

echo "Starting WordPress URL fix process..."

# Function to run MySQL commands with proper error handling
run_mysql() {
    docker exec lagente-mysql mysql -u root -proot_password wordpress -e "$1" || echo "Warning: Command failed: $1"
}

echo "Step 1: Updating post content..."
run_mysql "UPDATE wp_posts SET post_content = REPLACE(post_content, 'http://localhost:8558', 'https://lagente.do');"
run_mysql "UPDATE wp_posts SET post_content = REPLACE(post_content, 'localhost:8558', 'lagente.do');"

echo "Step 2: Updating post excerpts..."
run_mysql "UPDATE wp_posts SET post_excerpt = REPLACE(post_excerpt, 'http://localhost:8558', 'https://lagente.do');"
run_mysql "UPDATE wp_posts SET post_excerpt = REPLACE(post_excerpt, 'localhost:8558', 'lagente.do');"

echo "Step 3: Updating WordPress options..."
run_mysql "UPDATE wp_options SET option_value = REPLACE(option_value, 'http://localhost:8558', 'https://lagente.do') WHERE option_name NOT IN ('home', 'siteurl');"
run_mysql "UPDATE wp_options SET option_value = REPLACE(option_value, 'localhost:8558', 'lagente.do') WHERE option_name NOT IN ('home', 'siteurl');"

echo "Step 4: Updating post metadata..."
run_mysql "UPDATE wp_postmeta SET meta_value = REPLACE(meta_value, 'http://localhost:8558', 'https://lagente.do');"
run_mysql "UPDATE wp_postmeta SET meta_value = REPLACE(meta_value, 'localhost:8558', 'lagente.do');"

echo "Step 5: Updating comments..."
run_mysql "UPDATE wp_comments SET comment_content = REPLACE(comment_content, 'http://localhost:8558', 'https://lagente.do');"
run_mysql "UPDATE wp_comments SET comment_content = REPLACE(comment_content, 'localhost:8558', 'lagente.do');"

echo "Step 6: Updating comment metadata..."
run_mysql "UPDATE wp_commentmeta SET meta_value = REPLACE(meta_value, 'http://localhost:8558', 'https://lagente.do');"
run_mysql "UPDATE wp_commentmeta SET meta_value = REPLACE(meta_value, 'localhost:8558', 'lagente.do');"

echo "Step 7: Clearing transient caches..."
run_mysql "DELETE FROM wp_options WHERE option_name LIKE '%_transient_%';"

echo "Step 8: Clearing object cache..."
run_mysql "DELETE FROM wp_options WHERE option_name LIKE '%_cache_%';"

echo "Step 9: Restarting WordPress container..."
docker restart lagente-wordpress

echo "URL fixes completed successfully!"
echo "Please clear your browser cache and refresh the website."