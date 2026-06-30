'use client';

import { useEffect } from 'react';
import { logError } from '@/lib/logger';

// Last-resort boundary for errors thrown in the root layout itself. It replaces
// the entire document, so it ships its own <html>/<body> and uses inline styles
// (globals.css may not be available at this point).
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    logError('global-error', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#0a0a0a', color: '#ededed' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Something went wrong</h1>
            <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>A critical error occurred. Please try again.</p>
            <button
              onClick={() => reset()}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '0.75rem',
                border: 'none',
                background: '#ededed',
                color: '#0a0a0a',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
