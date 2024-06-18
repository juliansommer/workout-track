# exercise data

## need to clone this https://github.com/yuhonas/free-exercise-db

1. run clean_data.py
2. convert it to jsonl https://codebeautify.org/json-to-jsonl-converter
3. manually remove all `\"` in the json
4. manually remove `\n"` in the json
5. connect to psql supabase db MAKE SURE YOU ARE USING A UNIX SHELL (GIT BASH IS ENOUGH), FOR WHATEVER REASON YOU CANNOT CONNECT TO PSQL SUPABASE ON POWERSHELL, ALWAYS SAYS WRONG PASSWORD EVEN WHEN ITS CORRECT
6. run `\i sql.sql`
7. run `INSERT INTO exercise (id, name, image, instructions, primary_muscles, secondary_muscles)SELECT id, name, image, ARRAY(SELECT json_array_elements_text(instructions)) AS instructions, ARRAY(SELECT json_array_elements_text(primary_muscles))::muscle[] AS primary_muscles, ARRAY(SELECT json_array_elements_text(secondary_muscles))::muscle[] AS secondary_muscles FROM test2;`


# images
1. get the images from the exercise db
2. run images.py
3. upload them to supabase bucket
4. connect to psql
5. run `UPDATE exercise SET image = REPLACE(image, '/0', '') WHERE image LIKE '%/0%';`