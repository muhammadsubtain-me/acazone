-- ============================================================================
-- inquiries.contact_type — application contract
-- ============================================================================
-- Keep in sync with src/lib/config/inquiries.js
--
-- DB values:
--   email  — client chose email on the order form
--   phone  — client chose WhatsApp / phone (UI label is "WhatsApp")
--
-- The order form sends contact_type "whatsapp"; /api/submit-order maps it to
-- "phone" before INSERT. Do NOT store "whatsapp" unless this constraint is
-- updated and src/lib/config/inquiries.js is changed to match.
--
-- attachments: optional json/jsonb array of flat Storage object paths.
-- An empty array [] is valid (no files attached).
-- ============================================================================

ALTER TABLE public.inquiries
  DROP CONSTRAINT IF EXISTS inquiries_contact_type_check;

ALTER TABLE public.inquiries
  ADD CONSTRAINT inquiries_contact_type_check
  CHECK (contact_type IN ('email', 'phone'));

COMMENT ON COLUMN public.inquiries.contact_type IS
  'Allowed: email, phone. Order form UI maps whatsapp -> phone.';

COMMENT ON COLUMN public.inquiries.attachments IS
  'Optional array of flat inquiry-files Storage paths; empty array is valid.';
