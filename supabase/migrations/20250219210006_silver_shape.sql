/*
  # Newsletter Subscriptions Schema

  1. New Tables
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamptz)
      - `status` (text)

  2. Security
    - Enable RLS
    - Add policies for admin access
*/

-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text CHECK (status IN ('active', 'unsubscribed')) DEFAULT 'active'
);

-- Enable RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow insert for all users"
  ON newsletter_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow read for admins"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow update for admins"
  ON newsletter_subscriptions
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');