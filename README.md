# Next.js Workout Track App

This project uses Next.js with React, TypeScript, Tailwind CSS and Supabase to create a fully featured workout tracking app. Getting this running locally would be a lot of effort due to having to set up all the Supabase stuff and process the data so I do not recommend it.

# NOTE

- the reason process.env is still being used for environment variables, is that if i import { env } and use that for the environment variables, it will ship the env code to the client, which increases bundle size. I still get the benefits of using zod and checking the environment variables, but without shipping zod to the client. (increase is minor, about 15kB but there is no point of using env apart from consistency as I get all the benefits of checking env variables on build, I do not need strong typing for them in general)

# TODO

- validate user inputs with zod and react hook form (theres nothing to really validate, just ensuring name, notes and sets are of the right type)
- need to handle submit for create plan page, no idea how to do this
- make landing page
- stylise the create plan page
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
