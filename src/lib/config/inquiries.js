// ─── inquiries table contract ────────────────────────────────────────────────
// Keep in sync with supabase/migrations/*_inquiries_contact_type.sql
// and the CHECK constraint inquiries_contact_type_check in Postgres.

/** Values allowed by inquiries.contact_type in Postgres. */
export const INQUIRY_DB_CONTACT_TYPES = Object.freeze(['email', 'phone']);

/** Contact picker values on the /order form UI. */
export const INQUIRY_UI_CONTACT_TYPES = Object.freeze(['whatsapp', 'email']);

/** Map UI selection to the DB contact_type column before INSERT. */
export function toInquiryDbContactType(uiContactType) {
  return uiContactType === 'email' ? 'email' : 'phone';
}

export function isEmailContactType(contactType) {
  return contactType === 'email';
}
