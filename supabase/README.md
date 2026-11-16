# Supabase Database Setup for TECH GALLERY 2027

This directory contains the PostgreSQL migrations and seed data for the Tech Gallery 2027 platform.

## Quick Setup via Supabase Web Dashboard

1. Log in to [Supabase](https://supabase.com) and create or open your project.
2. In the left navigation, go to **SQL Editor**.
3. Create a **New query**.
4. Copy the entire contents of `migrations/001_initial_schema.sql` and run it.
   - This creates tables (`profiles`, `events`, `registrations`, `projects`, `project_images`, `gallery`, `faqs`, `admin_users`, `festival_settings`), indexes, and Row Level Security (RLS) policies.
5. Create another query, copy the contents of `migrations/002_seed_data.sql`, and run it.
   - This inserts the official 8 festival events (18–24 January 2027), FAQs, settings, and starter gallery entries.
6. In **Project Settings** > **API**, copy your `URL`, `anon public` key, and `service_role` key into your `.env` files.

## Setup via Supabase CLI

```bash
supabase link --project-ref <your-project-id>
supabase db push
```

