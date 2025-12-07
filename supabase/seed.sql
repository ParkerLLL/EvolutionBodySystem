-- 1. Seed Exercises (The "Golden Standard" Library)

-- Chest
insert into public.exercises (name, target_muscle, equipment, is_official, is_bench_accessory) values
('Barbell Bench Press', 'chest', 'barbell', true, true),
('Incline Barbell Bench Press', 'chest', 'barbell', true, true),
('Dumbbell Bench Press', 'chest', 'dumbbell', true, false),
('Incline Dumbbell Press', 'chest', 'dumbbell', true, false),
('Cable Crossover', 'chest', 'machine', true, false),
('Dips', 'chest', 'bodyweight', true, true),
('Push-ups', 'chest', 'bodyweight', true, false),
('Pec Deck Machine', 'chest', 'machine', true, false);

-- Back
insert into public.exercises (name, target_muscle, equipment, is_official, is_bench_accessory) values
('Deadlift', 'back', 'barbell', true, false),
('Pull-Ups', 'back', 'bodyweight', true, true),
('Barbell Row', 'back', 'barbell', true, true),
('Seated Cable Row', 'back', 'machine', true, true),
('Lat Pulldown', 'back', 'machine', true, false),
('T-Bar Row', 'back', 'machine', true, true),
('Face Pulls', 'back', 'machine', true, false);

-- Legs (Quads/Hogs)
insert into public.exercises (name, target_muscle, equipment, is_official, is_bench_accessory) values
('Barbell Squat', 'legs', 'barbell', true, false),
('Front Squat', 'legs', 'barbell', true, false),
('Leg Press', 'legs', 'machine', true, false),
('Bulgarian Split Squat', 'legs', 'dumbbell', true, false),
('Romanian Deadlift', 'legs', 'barbell', true, false),
('Leg Extension', 'legs', 'machine', true, false),
('Leg Curl', 'legs', 'machine', true, false),
('Calf Raises', 'legs', 'machine', true, false);

-- Shoulders
insert into public.exercises (name, target_muscle, equipment, is_official, is_bench_accessory) values
('Overhead Press (OHP)', 'shoulders', 'barbell', true, true),
('Seated Dumbbell Shoulder Press', 'shoulders', 'dumbbell', true, false),
('Lateral Raises', 'shoulders', 'dumbbell', true, false),
('Front Raises', 'shoulders', 'dumbbell', true, false),
('Rear Delt Fly', 'shoulders', 'dumbbell', true, false);

-- Arms (Triceps/Biceps)
insert into public.exercises (name, target_muscle, equipment, is_official, is_bench_accessory) values
('Close-Grip Bench Press', 'triceps', 'barbell', true, true),
('Skullcrushers', 'triceps', 'barbell', true, true),
('Tricep Pushdown', 'triceps', 'machine', true, false),
('Barbell Curl', 'biceps', 'barbell', true, false),
('Dumbbell Curl', 'biceps', 'dumbbell', true, false),
('Hammer Curl', 'biceps', 'dumbbell', true, false),
('Preacher Curl', 'biceps', 'machine', true, false);


-- 2. Seed Admin User (Optional / Placeholder)
-- Note: Real users are created via Auth, this is just for reference in logic
-- insert into public.profiles (id, email, role) values ('UUID-FROM-AUTH', 'admin@evolution.com', 'admin');
