#!/bin/bash
# DO NOT PUSH THIS FILE TO GITHUB
# This file contains sensitive information and should be kept private
# TODO: Set your PostgreSQL URI - Use the External Database URL from the Render dashboard
PG_URI="postgresql://users_db_kx0w_user:ESS62716WryEzDJW9tWxiH7FhToAuc9p@dpg-ct8cih1u0jms73e9vdug-a.oregon-postgres.render.com/users_db_kx0w"
# Execute each .sql file in the directory
for file in ProjectSourceCode/src/init_data/*.sql; do
    echo "Executing $file..."
    psql $PG_URI -f "$file"
done