'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Send, MessageSquare, Loader2 } from 'lucide-react';
import { TEAM_AVATARS } from '@/lib/data/team';

// ─── Constants ────────────────────────────────────────────────────────────────

// TEAM_AVATARS imported from '@/lib/data/team' — edit members there.

function getColor(name) {
  return TEAM_AVATARS[name]?.color || 'from-slate-500 to-slate-600';
}
function getInitials(name) {
  return TEAM_AVATARS[name]?.initials || name?.slice(0, 2).toUpperCase() || '?';
}

function Avatar({ name, size = 'sm' }) {
  const sz = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-9 h-9 text-xs';
  return (
    <div className={`${sz} rounded-xl bg-gradient-to-br ${getColor(name)} flex items-center justify-center font-bold text-white shrink-0`}>
      {getInitials(name)}
    </div>
  );
}

function formatTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' });
}

function formatDay(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-PK', { day: '2-digit', month: 'short' });
}

// ─── ChatPanel Component ──────────────────────────────────────────────────────
// Messages are fetched and managed here. AdminDashboard owns the realtime
// channel for unread dot detection to avoid duplicate channel conflicts.

export default function ChatPanel({ userName, messages, onClose }) {
  const [input,      setInput]      = useState('');
  const [sending,    setSending]    = useState(false);
  const [error,      setError]      = useState('');
  const [tableReady, setTableReady] = useState(true);
  const [loading,    setLoading]    = useState(messages.length === 0);
  const bottomRef                   = useRef(null);
  const inputRef                    = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // If messages were passed in already loaded, skip loading state
  useEffect(() => {
    if (messages.length > 0) setLoading(false);
  }, [messages]);

  // Focus input on open
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // Initial fetch to detect if table exists (only on first open)
  useEffect(() => {
    if (messages.length > 0) return; // already have messages from parent
    supabase
      .from('admin_messages')
      .select('id')
      .limit(1)
      .then(({ error: err }) => {
        if (err?.code === '42P01') setTableReady(false);
        setLoading(false);
      });
  }, [messages.length]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput('');
    setSending(true);
    setError('');
    try {
      const { error: err } = await supabase
        .from('admin_messages')
        .insert({ sender_name: userName, message: text });
      if (err) throw err;
    } catch (e) {
      console.error('handleSend:', e);
      setError('Failed to send. Please try again.');
      setInput(text);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Group messages by day
  const grouped = messages.reduce((acc, msg) => {
    const day = formatDay(msg.created_at);
    if (!acc.length || acc[acc.length - 1].day !== day) {
      acc.push({ day, msgs: [msg] });
    } else {
      acc[acc.length - 1].msgs.push(msg);
    }
    return acc;
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col w-[340px] sm:w-[380px] h-[520px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-[var(--shadow-lg)] overflow-hidden">

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-2)] shrink-0">
        <div className="w-8 h-8 rounded-xl bg-white/[0.06] flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white leading-none">Team Chat</div>
          <div className="text-[11px] text-[var(--color-text-faint)] mt-0.5">Zain · Hasnain · Sibtain</div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-[var(--color-text-faint)] hover:text-white hover:bg-white/[0.06] transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-5 h-5 animate-spin text-[var(--color-text-faint)]" />
          </div>
        )}

        {!loading && !tableReady && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
            <MessageSquare className="w-8 h-8 text-[var(--color-text-faint)]" />
            <p className="text-sm text-[var(--color-text-muted)] font-medium">Chat table not set up yet</p>
            <p className="text-xs text-[var(--color-text-faint)] leading-relaxed">
              Run the SQL below in your Supabase dashboard to enable chat:
            </p>
            <pre className="w-full text-left text-[10px] text-emerald-400 bg-emerald-400/5 border border-emerald-400/20 rounded-xl p-3 overflow-x-auto leading-relaxed whitespace-pre-wrap">{`CREATE TABLE admin_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE admin_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins_read" ON admin_messages
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "admins_insert" ON admin_messages
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
ALTER PUBLICATION supabase_realtime ADD TABLE admin_messages;`}</pre>
          </div>
        )}

        {!loading && tableReady && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
            <MessageSquare className="w-8 h-8 text-[var(--color-text-faint)]" />
            <p className="text-sm text-[var(--color-text-muted)]">No messages yet</p>
            <p className="text-xs text-[var(--color-text-faint)]">Say hi to the team!</p>
          </div>
        )}

        {!loading && tableReady && grouped.map(({ day, msgs }) => (
          <div key={day}>
            {/* Day divider */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-px bg-[var(--color-border)]" />
              <span className="text-[10px] text-[var(--color-text-faint)] font-medium shrink-0">{day}</span>
              <div className="flex-1 h-px bg-[var(--color-border)]" />
            </div>

            <div className="space-y-2">
              {msgs.map((msg, idx) => {
                const isMe = msg.sender_name === userName;
                const prevMsg = idx > 0 ? msgs[idx - 1] : null;
                const showAvatar = !prevMsg || prevMsg.sender_name !== msg.sender_name;

                return (
                  <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-7 shrink-0">
                      {!isMe && showAvatar && <Avatar name={msg.sender_name} size="sm" />}
                    </div>
                    <div className={`flex flex-col gap-0.5 max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                      {!isMe && showAvatar && (
                        <span className="text-[10px] text-[var(--color-text-faint)] ml-1">{msg.sender_name}</span>
                      )}
                      <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed break-words ${
                        isMe
                          ? 'bg-white text-black rounded-br-sm'
                          : 'bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] rounded-bl-sm'
                      }`}>
                        {msg.message}
                      </div>
                      <span className="text-[9px] text-[var(--color-text-faint)] px-1">
                        {formatTime(msg.created_at)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-1.5 text-xs text-red-400 bg-red-400/10 border-t border-red-400/20 text-center">
          {error}
        </div>
      )}

      {/* Input */}
      {tableReady && (
        <div className="flex items-end gap-2 px-3 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface-2)] shrink-0">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message the team…"
            rows={1}
            className="flex-1 resize-none bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-border-focus)] rounded-xl px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all max-h-28 leading-relaxed"
            style={{ scrollbarWidth: 'none' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white text-black hover:opacity-90 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          >
            {sending
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Send className="w-4 h-4" />
            }
          </button>
        </div>
      )}
    </div>
  );
}