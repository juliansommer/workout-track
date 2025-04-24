# Next.js Workout Track App

This project uses Next.js with React, TypeScript, Tailwind CSS and Supabase to create a fully featured workout tracking app.

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

![schema](https://github.com/user-attachments/assets/9aab2ef5-7100-48bc-8af7-aac41c0f6298)

# Pages

![exercises](https://github.com/user-attachments/assets/c91b8e2d-da2c-45de-adc4-1540babfa29d)
![exercise](https://github.com/user-attachments/assets/972d639b-24d5-4e54-b580-b4833b9b558d)
![plan](https://github.com/user-attachments/assets/78e94d14-d75b-425f-9c8b-b2b26428079a)
![workout](https://github.com/user-attachments/assets/9b8c2ddb-0ef9-4498-9b11-5ef191d82dc1)

# Self Hosting

- While it is possible to self host, it is not recommended as it does require quite a few steps as you will need to set up Supabase. I will provide a general guide here but its not exhaustive and you may need to do some additional steps.
- First clone the repo and install dependencies
- Create a supabase project and upload the schema contained in database/schema.sql. Also upload the enum types contained in database/types.sql
- You will also need to manually write the Row Level Security policies on Supabase (or just disable them) as they are not included in the schema
- Can optionally add triggers for plan_updated_at and workout_updated_at to update the updated_at field in the plan and workout tables, otherwise these fields won't work but they aren't required
- Then create a google client id and connect it to supabase for authentication
- Add the required env variables (as shown in env.example) to a .env file
- The app then should be able to be run with `pnpm dev`
- To easily deploy, you can use Vercel and add the env variables to the project settings
- You can deploy independently of Vercel but you will need to set up the env variables in the hosting service you use

## TODO

- need to prefill set data when creating a workout. search in workout table for most recent occurance of the specified plan_id. then prefill the set data in the form (ideally have as the placeholder). in the input we have the values exercise_id and set_no. so need to store the previous plan data

1. find most recent workout for the plan_id
2. get the workout_exercise id for that workout_id
3. get set data (weight, reps, order) for each workout_exercise id
4. set out data in way where exercise weight and reps can be accessed solely through the exercise_id and set_no. have it so data["exercise_id"]["set_no"] = {weight, reps}. so data is object with exercise_id as key, and array of weight and reps where we can use set_no as the index.

- have user page where they can see their data

  - on the user page, can edit their details (being height, weight and age)

  - then need a separate user table in supabase that is linked to the auth table

  - see pbs per exercise

  - for pbs, can see a graph of weight increase over time for each exercise

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
