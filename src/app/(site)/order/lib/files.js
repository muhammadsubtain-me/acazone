// ─── Order attachment helpers ────────────────────────────────────────────────
// Client-side helpers for the order form's file picker. The authoritative
// validation happens server-side (/api/create-upload-url) and in the Storage
// bucket policy — these just give the user fast, friendly feedback.

import { allowedFileTypes, maxFileSize } from '@/lib/config/order';

export function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Filters incoming files against the shared config. Returns the accepted files
// plus the last rejection message (if any) for inline display.
export function filterValidFiles(incoming) {
  const valid = [];
  let error = '';
  for (const file of incoming) {
    if (!allowedFileTypes.includes(file.type)) {
      error = `"${file.name}" is not a supported file type.`;
      continue;
    }
    if (file.size > maxFileSize) {
      error = `"${file.name}" exceeds the 10 MB limit.`;
      continue;
    }
    valid.push(file);
  }
  return { valid, error };
}
