# SocialFind (Phase 1 + 2)
1. Create a Supabase project. Run `supabase/schema.sql` in the SQL editor.
2. Create public Storage buckets `avatars` and `covers`; add owner-folder policies (see the end of schema.sql).
3. `cp .env.example .env.local` and fill in the keys. The service-role key is server-only.
4. `npm install && npm run dev`
5. Sign up, then insert your user id into `admin_roles` to access the admin panel.
