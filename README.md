# Next.js Workout Track App

This project uses Next.js with React, TypeScript, Tailwind CSS and Supabase to create a fully featured workout tracking app. I will publish a guide to running at some point in the future, it would require creating a Supabase project, importing the schema, adding the required env variables and then running the Next.js app.

# Features

- 🖥️ View 800+ exercises
- 📝 Create, edit and delete plan and workout
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

- add instructions for self hosting - need to export the supabase schema and the required env variables
- add more screenshots, video walkthrough too
- pages
  make create workout page use react-hook-form and zod, needs error handling but works for now
  view all workouts (just make prettier)
  edit workout
  delete workout

  - prefilling previous set data - search for previous workout_exercise with same exercise_id and order by created_at desc
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

- add notes option for exercises in plan and workout
  - generally need to add options for missing fields
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
