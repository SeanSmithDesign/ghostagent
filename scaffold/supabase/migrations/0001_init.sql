create table projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  scope text,
  jurisdiction text,
  readiness int,
  status text default 'draft'
);

create table waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);
