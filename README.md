# Next.js Workout Track App

This project uses Next.js with React, TypeScript, Tailwind CSS and Supabase to create a fully featured workout tracking app.

# Features

- 🖥️ View 800+ exercises
- 📝 Create, edit and delete plan and workout
- 🔑 Full authentication using Supabase with Google SSO
- 🔐 Full Row Level Security to prevent unauthorised database changes
- ✅ Forms using react-hook-form with validation using zod
- 📈 Scalable relational database architecture
- 📣 Environment variables validated on build using zod
- 🌙 Full dark and light mode theming using next-themes
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
