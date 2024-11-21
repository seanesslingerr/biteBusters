#!/bin/bash
# DO NOT PUSH THIS FILE TO GITHUB
# This file contains sensitive information and should be kept private
# TODO: Set your PostgreSQL URI - Use the External Database URL from the Render dashboard
PG_URI="postgresql://users_db_mh9o_user:wztfPTsjypoezcujR6w7Z2EiyUWrvXFQ@dpg-csv8hg2j1k6c73c2l0fg-a.oregon-postgres.render.com/users_db_mh9o"
# Execute each .sql file in the directory
for file in init_data/*.sql; do
    echo "Executing $file..."
    psql $PG_URI -f "$file"
done


