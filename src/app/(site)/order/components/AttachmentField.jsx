'use client';

import { Paperclip, X, FileText, Image } from 'lucide-react';
import { acceptedFileExtensions } from '@/lib/config/order';
import { formatBytes } from '../lib/files';

// Drag-and-drop / click file picker with a list of selected attachments.
export default function AttachmentField({
  attachments,
  fileError,
  dragOver,
  setDragOver,
  fileInputRef,
  onFileInput,
  onDrop,
  onRemove,
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 cursor-pointer transition-all duration-200 ${
          dragOver
            ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
            : 'border-[var(--color-border)] hover:border-[var(--color-border-hover)] bg-transparent hover:bg-white/[0.02]'
        }`}
      >
        <Paperclip className="w-5 h-5 text-[var(--color-text-muted)]" />
        <p className="text-sm text-[var(--color-text-muted)] text-center">
          <span className="text-[var(--color-accent)] font-medium">Click to attach</span> or drag &amp; drop files here
        </p>
        <p className="text-xs text-[var(--color-text-faint)]">
           Max 10 MB each · up to 5 files
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFileExtensions}
          className="hidden"
          onChange={onFileInput}
        />
      </div>

      {fileError && <span className="text-xs text-red-400 pl-1">{fileError}</span>}

      {attachments.length > 0 && (
        <ul className="flex flex-col gap-1.5 mt-1">
          {attachments.map((file, idx) => (
            <li
              key={`${file.name}-${idx}`}
              className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 bg-white/[0.03] border border-white/[0.06] text-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                {file.type.startsWith('image/') ? (
                  <Image className="w-4 h-4 shrink-0 text-[var(--color-accent-muted)]" />
                ) : (
                  <FileText className="w-4 h-4 shrink-0 text-[var(--color-accent-muted)]" />
                )}
                <span className="truncate text-[var(--color-text)]">{file.name}</span>
                <span className="shrink-0 text-xs text-[var(--color-text-faint)]">{formatBytes(file.size)}</span>
              </div>
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="shrink-0 text-[var(--color-text-faint)] hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
