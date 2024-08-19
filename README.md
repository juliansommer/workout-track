# Next.js Workout Track App

This project uses Next.js with React, TypeScript, Tailwind CSS and Supabase to create a fully featured workout tracking app. Getting this running locally would be a lot of effort due to having to set up all the Supabase stuff and process the data so I do not recommend it.

# Features

- View 800+ exercises
- (WIP) Create, edit and delete plan and workout
- Full auth using Supabase with Google SSO and protected routes with Next.js middleware
- Full Row Level Security implemented using Supabase to prevent unauthorised changes to the database
- Images hosted in Supabase Bucket
- Scalable relational database architecture
- Environment variables validated with Zod on build
- Full dark and light mode theming using next-themes
- Progress bar for page transitions using next-nprogress-bar
- Styling using shadcn/ui

# Schema Diagram

![schema](https://github.com/user-attachments/assets/32ffc229-7a2e-4e29-9b97-43c70ef59587)

# Note

- The reason process.env is still being used for environment variables, is that if I import { env } and use that for the environment variables, it will ship the env code to the client, which increases bundle size. I still get the benefits of using zod and checking the environment variables at build time, but without shipping zod to the client. The bundle size increase is minor, about 15kB but there is no point of using env apart from consistency as I get all the benefits of checking env variables on build, I do not need strong typing for them in general.

# TODO

- validate forms using zod?
- add sonner for toasts maybe
- add option to add sets and notes for each exercise in a workout plan
- edit plan page
- delete plan option
- create workout page
- edit workout page
- delete workout page
- make landing page
- make exercise table have search option, filter option (by muscle)
- favourite exercises
- personal bests per exercise per user
