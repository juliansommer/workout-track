# Next.js Workout Track App

This project uses Next.js with React, TypeScript, Tailwind CSS and Supabase to create a fully featured workout tracking app. Getting this running locally would be a lot of effort due to having to set up all the Supabase stuff and process the data so I do not recommend it.

# Features

- 🖥️ View 800+ exercises
- 📝 (WIP) Create, edit and delete plan and workout
- 🔑 Full auth using Supabase with Google SSO and protected routes with Next.js middleware
- 🔐 Full Row Level Security implemented using Supabase to prevent unauthorised database changes
- ✅ Forms using react-hook-form with validation using zod
- 📈 Scalable relational database architecture
- 📣 Environment variables validated on build using zod
- 🌙 Full dark and light mode theming using next-themes
- 🌌 Progress bar for page transitions using next-nprogress-bar
- 👾 Styling using shadcn/ui

# Schema Diagram

![schema](https://github.com/user-attachments/assets/32ffc229-7a2e-4e29-9b97-43c70ef59587)

# Pages

![exercises](https://github.com/user-attachments/assets/c91b8e2d-da2c-45de-adc4-1540babfa29d)
![exercise](https://github.com/user-attachments/assets/972d639b-24d5-4e54-b580-b4833b9b558d)
![plan](https://github.com/user-attachments/assets/78e94d14-d75b-425f-9c8b-b2b26428079a)

# TODO

- pages

  - create, edit and delete workout
    - load workout data from plan, then can add specific data for each set
    - user presses button to create a workout based off plan (on workouts page have display of the plans and button to create workout)
    - then prefill a page similar to the plan page, but cannot change exercises so it wont be a form, just a display of the data
    - then under each exercise, need a form for each set. will create the number of forms based off the set in each exercise.
    - on submit, create main workout, create workout_exercise for each exercise, then create set for each set. just pass the whole form json to the api and handle it there
    - THIS SHOULD COME LATER NEED BASIC FIRST prefilling previous set data - search for previous workout_exercise with same exercise_id and order by created_at desc
  - need to store data for each exercise and each set to then prefill it when creating a workout
  - have user page where they can see their data
    - on the user page, can edit their details (being height, weight and age)
    - then need a separate user table in supabase that is linked to the auth table
    - see pbs
    - see favourite exercises
    - for pbs, can see a graph of weight increase over time for each exercise

- MAKE SURE TO SET A MAX AND MIN INT VALUE FOR ANY FIELD THAT NEEDS IT IN THE ZOD SCHEMA

  - set
    - weight (float)
    - reps (int)
  - on user page
    - age
    - weight
    - height

- add ordering to exercises in workout
  - when looping over the array on submit just add the order
- add notes option for exercises in plan and workout
- add e2e tests using playwright
  - check if you can access pages that require auth without being logged in
  - how to login with google?
    - look at this for logging in first then sharing it between all tests so they still run parallel [link](https://playwright.dev/docs/auth)
    - create a test account with google
    - use env variables to store the test account details
  - check creating plan flow
  - edit plan
  - then delete the plan
  - check creating workout flow
  - edit workout
  - then delete the workout
  - view exercises page
  - user page
- need way to activate the plan_updated_at trigger if a row in plan_exercise with the same plan_id is updated
- need way to activate the workout_updated_at trigger if a row in workout_exercise with the same workout_id is updated
