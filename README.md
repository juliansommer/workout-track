# Next.js Workout Track App

This project uses Next.js with React, TypeScript, Tailwind CSS and Supabase to create a fully featured workout tracking app. Getting this running locally would be a lot of effort due to having to set up all the Supabase stuff and process the data so I do not recommend it.

# TODO

- make exercise table have search option, filter option (by muscle)
- add create routine page
  - 1 need a search bar for exercises (ultimately have ability to search by muscle)
  - need to create the plan table before user can add exercises, so have the plan id, how would i know the id of the table i just created though? would i pass the uuid myself instead of having supabase auto gen it? or could get the id of the last plan the user created, get user id though auth call
  - 2 user selects an exercise and adds to the plan
  - 3 user can add sets to the exercise
  - 4 for each exercise, add to plan_exercise table with the plan id, exercise id, notes, sets
  - 5 user can hit a button to add another exercise to select, process repeats
  - 6 button to save at end, save to plan table with
- add log workout page
