#!/bin/bash
# DO NOT PUSH THIS FILE TO GITHUB
# This file contains sensitive information and should be kept private
# TODO: Set your PostgreSQL URI - Use the External Database URL from the Render dashboard
PG_URI="postgresql://exampleuser:M0ZifhV2XNYoYfIfe67IRkiYmdySqCJ4@dpg-ct7o4qaj1k6c73ckasj0-a.oregon-postgres.render.com/users_db_hqey"
# Execute each .sql file in the directory
for file in ProjectSourceCode/init_data/*.sql; do
    echo "Executing $file..."
    psql $PG_URI -f "$file"
done


