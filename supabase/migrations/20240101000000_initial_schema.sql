-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles (User Data)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  gender text check (gender in ('male', 'female', 'other')),
  weight_kg numeric, -- Current body weight
  height_cm numeric,
  fitness_goal text check (fitness_goal in ('muscle_gain', 'fat_loss', 'strength', 'recomp')),
  activity_level numeric, -- 1.2 to 1.9 multiplier
  tdee_calories integer, -- Calculated maintainance calories
  
  -- Training Settings
  training_frequency integer default 5, -- Days per week
  bench_press_1rm numeric default 0,
  squat_1rm numeric default 0,
  deadlift_1rm numeric default 0,
  
  -- Admin Role
  role text default 'user' check (role in ('user', 'admin')),
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Profiles
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
-- Allow profile creation via trigger (Auth) is handled separately or via insert policy
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);


-- 2. Exercises Library
create table public.exercises (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  target_muscle text not null, -- e.g. 'chest', 'back', 'legs'
  equipment text, -- 'barbell', 'dumbbell', 'machine'
  video_url text,
  is_official boolean default false, -- True = System preset, False = User custom
  created_by uuid references public.profiles(id), -- Null if system preset
  
  -- Bench Specialist Meta
  is_bench_accessory boolean default false, -- If true, recommended for Bench days
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Exercises
alter table public.exercises enable row level security;
create policy "Everyone can view official exercises" on public.exercises for select using (is_official = true);
create policy "Users can view own custom exercises" on public.exercises for select using (auth.uid() = created_by);
create policy "Admins can insert official exercises" on public.exercises for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Users can insert custom exercises" on public.exercises for insert with check (auth.uid() = created_by);


-- 3. Workout Logs (The Session)
create table public.workout_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  date date default current_date not null,
  split_day_name text, -- e.g. 'Push', 'Pull', 'Legs'
  
  -- Stats
  duration_minutes integer,
  feeling_rating integer, -- 1-5 scale
  bodyweight_today numeric,
  
  -- Nutrition Link
  carb_mode text check (carb_mode in ('high', 'moderate', 'low')),
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Logs
alter table public.workout_logs enable row level security;
create policy "Users can CRUD own logs" on public.workout_logs for all using (auth.uid() = user_id);


-- 4. Workout Sets (The Details)
create table public.workout_sets (
  id uuid default uuid_generate_v4() primary key,
  workout_log_id uuid references public.workout_logs(id) on delete cascade not null,
  exercise_id uuid references public.exercises(id) not null,
  
  set_order integer not null,
  weight_kg numeric not null,
  reps integer not null,
  rpe numeric, -- Rate of Perceived Exertion (1-10)
  
  is_pr boolean default false, -- Personal Record flag
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Sets
alter table public.workout_sets enable row level security;
create policy "Users can CRUD own sets" on public.workout_sets for all using (
  exists (select 1 from public.workout_logs where id = workout_log_id and user_id = auth.uid())
);


-- 5. Daily Nutrition (Tracking)
create table public.daily_nutrition (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  date date default current_date not null,
  
  target_calories integer,
  target_carbs integer,
  target_protein integer,
  target_fat integer,
  
  consumed_calories integer default 0,
  consumed_carbs integer default 0,
  consumed_protein integer default 0,
  consumed_fat integer default 0,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, date)
);

-- RLS for Nutrition
alter table public.daily_nutrition enable row level security;
create policy "Users can CRUD own nutrition" on public.daily_nutrition for all using (auth.uid() = user_id);


-- Function to handle new user signup (Trigger)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
