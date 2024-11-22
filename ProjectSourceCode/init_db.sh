#!/bin/bash
# DO NOT PUSH THIS FILE TO GITHUB
# This file contains sensitive information and should be kept private
# TODO: Set your PostgreSQL URI - Use the External Database URL from the Render dashboard
PG_URI="postgresql://postgresdb:4c987j8UULBReT5TrZG4z1d0P0GiUTCX@dpg-ct0at29opnds73aalch0-a.oregon-postgres.render.com/audit_db_sw73"
# Execute each .sql file in the directory
for file in init_data/*.sql; do
    echo "Executing $file..."
    psql $PG_URI -f "$file"
done
