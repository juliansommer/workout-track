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
- have user page where they can see their data
- on the user page, can edit their details (being height, weight and age)
- then need a seperate user table in supabase that is linked to the auth table
