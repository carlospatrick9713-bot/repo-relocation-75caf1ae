-- Create storage bucket for tourist photos
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'tourist-photos',
  'tourist-photos',
  true,
  10485760, -- 10MB limit
  array['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
);

-- Create table for photo metadata
create table public.tourist_photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  storage_path text not null,
  caption text,
  location text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Enable RLS
alter table public.tourist_photos enable row level security;

-- Policy: Users can insert their own photos
create policy "Users can insert own photos"
on public.tourist_photos
for insert
to authenticated
with check (auth.uid() = user_id);

-- Policy: Users can view their own photos
create policy "Users can view own photos"
on public.tourist_photos
for select
to authenticated
using (auth.uid() = user_id);

-- Policy: Premium users can view all photos
create policy "Premium users can view all photos"
on public.tourist_photos
for select
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.is_premium = true
  )
);

-- Policy: Users can update their own photos
create policy "Users can update own photos"
on public.tourist_photos
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Policy: Users can delete their own photos
create policy "Users can delete own photos"
on public.tourist_photos
for delete
to authenticated
using (auth.uid() = user_id);

-- Storage policies for the bucket
create policy "Users can upload their own photos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'tourist-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can view their own photos in storage"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'tourist-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Premium users can view all photos in storage"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'tourist-photos' AND
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.is_premium = true
  )
);

create policy "Users can update their own photos in storage"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'tourist-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'tourist-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete their own photos in storage"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'tourist-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Add trigger for updated_at
create trigger update_tourist_photos_updated_at
before update on public.tourist_photos
for each row
execute function public.update_updated_at();
