CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  is_complete BOOLEAN NOT NULL DEFAULT false,
  priority TEXT CHECK (priority IN ('Baja', 'Media', 'Alta')) DEFAULT 'Media',
  due_date TIMESTAMPTZ NOT NULL,
  completion_date TIMESTAMPTZ NULL, 
  user_id INTEGER REFERENCES users(id),
  category_id INTEGER REFERENCES categories(id)
);