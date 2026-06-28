'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { services, domains } from '@/lib/data';
import Logo from '@/components/Logo';
import { supabase } from '@/lib/supabase';
import ChatPanel from './ChatPanel';
import {
  Search, X, LogOut, Clock, User,
  BookOpen, FileText, CheckCircle2,
  Loader2, Inbox, Users,
  AlertCircle, Zap,
  StickyNote, Paperclip, Image, Download, MessageSquare,
} from 'lucide-react';
import { getFirebaseMessaging, getToken, onMessage } from '@/lib/firebase';

// ─── Constants ────────────────────────────────────────────────────────────────

const TEAM_AVATARS = {
  Zain:    { initials: 'Z', color: 'from-violet-500 to-purple-600' },
  Hasnain: { initials: 'H', color: 'from-blue-500 to-cyan-600' },
  Sibtain: { initials: 'S', color: 'from-emerald-500 to-teal-600' },
};

const EMAIL_TO_NAME = {
  'admsibtain@acezon.app': 'Sibtain',
  'admzain@acezon.app':    'Zain',
  'admhasnain@acezon.app': 'Hasnain',
};

const STATUS_META = {
  new:         { label: 'New',         dot: 'bg-blue-400',    badge: 'text-blue-400 bg-blue-400/10 border-blue-400/20'     },
  claimed:     { label: 'Claimed',     dot: 'bg-amber-400',   badge: 'text-amber-400 bg-amber-400/10 border-amber-400/20'   },
  in_progress: { label: 'In Progress', dot: 'bg-violet-400',  badge: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
  completed:   { label: 'Completed',   dot: 'bg-emerald-400', badge: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
};

const FILTER_TABS = [
  { key: 'inbox', label: 'Inbox' },
  { key: 'work',  label: 'My Work' },
  { key: 'done',  label: 'Done' },
];

const TABLE_HEADERS         = ['Client', 'Contact', 'Service', 'Subject', 'Time', 'Status', 'Assigned', 'Actions'];
const TABLE_HEADERS_TEAM    = ['Client', 'Contact', 'Service', 'Subject', 'Time', 'Status', 'Assigned'];
const HEADER_HIDDEN_CLASS   = { Service: 'hidden lg:table-cell', Subject: 'hidden md:table-cell', Time: 'hidden xl:table-cell', Assigned: 'hidden md:table-cell' };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(iso) {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1)  return 'just now';
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-PK', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function shortId(id) {
  return (id || '').slice(0, 8).toUpperCase();
}

function getServiceLabel(serviceId, customService) {
  if (serviceId === 'other') return customService || 'Other / Custom';
  return services.find(s => s.id === serviceId)?.name || serviceId || '—';
}

function getDomainLabel(domainId) {
  if (domainId === 'other') return 'Other';
  return domains.find(d => d.id === domainId)?.name || domainId || '—';
}

function getTeamColor(name) {
  return TEAM_AVATARS[name]?.color || 'from-slate-500 to-slate-600';
}

function getTeamInitials(name) {
  return TEAM_AVATARS[name]?.initials || name?.slice(0, 2).toUpperCase() || '??';
}

function getDisplayName(email) {
  return EMAIL_TO_NAME[email] || email?.split('@')[0] || 'You';
}

function isActiveWork(inquiry) {
  return inquiry.status === 'claimed' || inquiry.status === 'in_progress';
}

function isCompletedToday(inquiry) {
  if (inquiry.status !== 'completed' || !inquiry.completed_at) return false;
  return new Date(inquiry.completed_at).toDateString() === new Date().toDateString();
}

function sortInquiries(rows) {
  return [...rows].sort((a, b) => new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0));
}

function mergeRealtimeInquiry(rows, payload) {
  if (payload.eventType === 'DELETE') {
    return rows.filter(i => i.id !== payload.old?.id);
  }
  const incoming = payload.new;
  if (!incoming?.id) return rows;
  const exists = rows.some(i => i.id === incoming.id);
  const nextRows = exists
    ? rows.map(i => i.id === incoming.id ? { ...i, ...incoming } : i)
    : [incoming, ...rows];
  return sortInquiries(nextRows);
}

// ─── Download helper ──────────────────────────────────────────────────────────

async function downloadAttachment(url, fileName, setDownloading) {
  try {
    setDownloading(true);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  } catch (err) {
    console.error('Download failed:', err);
    alert('Download failed. Please try again.');
  } finally {
    setDownloading(false);
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MemberAvatar({ name, size = 'md' }) {
  const sz = size === 'sm' ? 'w-7 h-7 text-[10px]' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-9 h-9 text-xs';
  return (
    <div className={`${sz} rounded-xl bg-gradient-to-br ${getTeamColor(name)} flex items-center justify-center font-bold text-white shrink-0`}>
      {getTeamInitials(name)}
    </div>
  );
}

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.new;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${meta.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

function AttachmentItem({ url }) {
  const [downloading, setDownloading] = useState(false);
  const fileName = decodeURIComponent(url.split('/').pop());
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);

  return (
    <button
      type="button"
      disabled={downloading}
      onClick={() => downloadAttachment(url, fileName, setDownloading)}
      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] active:scale-[0.98] transition-all group disabled:opacity-60 disabled:cursor-not-allowed text-left"
    >
      {isImage
        ? <Image className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-faint)] group-hover:text-white transition-colors" />
        : <FileText className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-faint)] group-hover:text-white transition-colors" />
      }
      <span className="text-xs text-[var(--color-text)] truncate flex-1">{fileName}</span>
      {downloading
        ? <Loader2 className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-faint)] animate-spin" />
        : <Download className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-faint)] opacity-0 group-hover:opacity-100 transition-opacity" />
      }
    </button>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar({ userName, inquiries, onLogout, onChatOpen, chatUnread }) {
  const newCount = inquiries.filter(i => i.status === 'new').length;

  return (
    <header className="sticky top-0 z-30 bg-black/60 backdrop-blur-[20px] border-b border-white/[0.07]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 h-14 flex items-center gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <Logo className="w-7 h-7" />
          <span className="font-bold text-white text-base tracking-[-0.02em] hidden sm:block">Acezon</span>
          <span className="text-[var(--color-border-hover)] text-sm hidden sm:block">/</span>
          <span className="text-[var(--color-text-muted)] text-sm font-medium hidden sm:block">Admin</span>
        </div>

        {newCount > 0 && (
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {newCount} new
          </span>
        )}

        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.07]">
            <MemberAvatar name={userName} size="sm" />
            <span className="text-sm font-medium text-[var(--color-text)] hidden sm:block">{userName}</span>
          </div>
          <button
            onClick={onChatOpen}
            className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-faint)] hover:text-white hover:bg-white/[0.06] transition-all"
            title="Team chat"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {chatUnread && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
          <button
            onClick={onLogout}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-faint)] hover:text-white hover:bg-white/[0.06] transition-all"
            title="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Stats Row ────────────────────────────────────────────────────────────────

function StatsRow({ stats }) {
  const cards = [
    { label: 'Unclaimed',       value: stats.unclaimed,      icon: AlertCircle,  color: 'text-amber-400',   bg: 'bg-amber-400/[0.06]'  },
    { label: 'My Active',       value: stats.myActive,       icon: Zap,          color: 'text-violet-400',  bg: 'bg-violet-400/[0.06]' },
    { label: 'Completed Today', value: stats.completedToday, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/[0.06]' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[var(--color-text-muted)] text-xs font-medium">{c.label}</span>
              <div className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center`}>
                <Icon className={`w-3.5 h-3.5 ${c.color}`} />
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-[var(--color-text-heading)]">{c.value}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Filters Bar ──────────────────────────────────────────────────────────────

function FiltersBar({ search, setSearch, activeTab, setActiveTab, counts }) {
  const isTeamView = activeTab === 'team';

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-faint)] pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name, subject, phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-border-focus)] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] hover:text-white transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="flex gap-2 shrink-0">
        <div className="flex gap-1 p-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-x-auto">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                activeTab === tab.key ? 'bg-white text-black' : 'text-[var(--color-text-muted)] hover:text-white'
              }`}
            >
              {tab.label}
              {counts[tab.key] > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab.key ? 'bg-black/20' : 'bg-white/10'}`}>
                  {counts[tab.key]}
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setActiveTab(isTeamView ? 'inbox' : 'team')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
            isTeamView
              ? 'bg-violet-500/15 text-violet-400 border-violet-500/30 hover:bg-violet-500/25'
              : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:text-white hover:border-[var(--color-border-hover)]'
          }`}
          title="Toggle team view"
        >
          <Users className="w-3.5 h-3.5" />
          <span className="hidden sm:block">Team Activity</span>
        </button>
      </div>
    </div>
  );
}

// ─── Inquiry Table Row (desktop) ──────────────────────────────────────────────

function InquiryRow({ inquiry, userName, onClaim, onRelease, onStatusChange, onClick, isSelected, readOnly = false, showActions = true }) {
  const isMyInquiry = inquiry.claimed_by === userName;
  const canClaim = !readOnly && inquiry.status === 'new';
  const canAct = !readOnly && isMyInquiry && inquiry.status !== 'completed';

  return (
    <tr
      onClick={onClick}
      className={`border-b border-[var(--color-border)] cursor-pointer transition-colors duration-150 ${
        isSelected ? 'bg-white/[0.04] [box-shadow:inset_3px_0_0_0_rgb(167,139,250)]' : 'hover:bg-white/[0.025]'
      }`}
    >
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-3)] flex items-center justify-center text-xs font-bold text-[var(--color-text-muted)] shrink-0">
            {inquiry.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <div className="font-semibold text-sm text-[var(--color-text-heading)]">{inquiry.name}</div>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(inquiry.id); }}
              title="Copy full ID"
              className="text-[10px] text-[var(--color-text-faint)] font-mono hover:text-white transition-colors cursor-copy"
            >
              {shortId(inquiry.id)}
            </button>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <div className="text-xs text-[var(--color-text-muted)] font-mono">{inquiry.country_dial} {inquiry.phone}</div>
      </td>
      <td className="px-4 py-3.5 hidden lg:table-cell">
        <div className="text-xs text-[var(--color-text)] font-medium truncate max-w-[180px]">
          {getServiceLabel(inquiry.service_id, inquiry.custom_service)}
        </div>
        <div className="text-[11px] text-[var(--color-text-faint)]">{getDomainLabel(inquiry.domain_id)}</div>
      </td>
      <td className="px-4 py-3.5 hidden md:table-cell">
        <div className="flex items-center gap-1.5">
          <div className="text-xs text-[var(--color-text)] font-medium truncate max-w-[150px]">{inquiry.subject}</div>
          {inquiry.notes && <StickyNote className="w-3 h-3 shrink-0 text-[var(--color-text-faint)]" title="Has notes" />}
        </div>
      </td>
      <td className="px-4 py-3.5 hidden xl:table-cell">
        <div className="text-xs text-[var(--color-text-muted)]">{timeAgo(inquiry.submitted_at)}</div>
      </td>
      <td className="px-4 py-3.5">
        <StatusBadge status={inquiry.status} />
      </td>
      <td className="px-4 py-3.5 hidden md:table-cell">
        {inquiry.claimed_by ? (
          <div className="flex items-center gap-2">
            <MemberAvatar name={inquiry.claimed_by} size="sm" />
            <span className={`text-xs font-medium ${isMyInquiry ? 'text-[var(--color-text-heading)]' : 'text-[var(--color-text-muted)]'}`}>
              {isMyInquiry ? 'You' : inquiry.claimed_by}
            </span>
          </div>
        ) : (
          <span className="text-[11px] text-[var(--color-text-faint)]">Unclaimed</span>
        )}
      </td>
      {showActions && (
        <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
          <div className="flex items-center gap-1.5">
            {canClaim && (
              <button onClick={() => onClaim(inquiry.id)} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white text-black hover:opacity-90 active:scale-95 transition-all">
                Claim
              </button>
            )}
            {canAct && inquiry.status === 'claimed' && (
              <button onClick={() => onStatusChange(inquiry.id, 'in_progress')} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/20 hover:bg-violet-500/25 transition-all">
                Start
              </button>
            )}
            {canAct && inquiry.status === 'in_progress' && (
              <button onClick={() => onStatusChange(inquiry.id, 'completed')} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25 transition-all">
                Done
              </button>
            )}
            {!readOnly && isMyInquiry && inquiry.status !== 'completed' && (
              <button onClick={() => onRelease(inquiry.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--color-text-faint)] hover:text-red-400 hover:bg-red-400/10 transition-all" title="Release claim">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </td>
      )}
    </tr>
  );
}

// ─── Mobile Card ──────────────────────────────────────────────────────────────

function InquiryCard({ inquiry, userName, onClaim, onStatusChange, onClick, readOnly = false }) {
  const isMyInquiry = inquiry.claimed_by === userName;
  const canClaim = !readOnly && inquiry.status === 'new';
  const canAct = !readOnly && isMyInquiry && inquiry.status !== 'completed';

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-xl p-4 cursor-pointer transition-all duration-200 hover:bg-[var(--color-surface-2)]" onClick={onClick}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-3)] flex items-center justify-center text-xs font-bold text-[var(--color-text-muted)] shrink-0">
            {inquiry.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm text-[var(--color-text-heading)] truncate">{inquiry.name}</div>
            <div className="text-[11px] text-[var(--color-text-faint)] font-mono">{shortId(inquiry.id)}</div>
          </div>
        </div>
        <StatusBadge status={inquiry.status} />
      </div>
      <div className="mb-3">
        <div className="text-sm text-[var(--color-text)] font-medium truncate mb-0.5">{inquiry.subject}</div>
        <div className="text-xs text-[var(--color-text-muted)] truncate">
          {getDomainLabel(inquiry.domain_id)} · {getServiceLabel(inquiry.service_id, inquiry.custom_service)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-faint)]">
          <Clock className="w-3 h-3" />
          {timeAgo(inquiry.submitted_at)}
          {inquiry.claimed_by && (
            <>
              <span className="text-[var(--color-border-hover)]">·</span>
              <MemberAvatar name={inquiry.claimed_by} size="sm" />
              <span>{inquiry.claimed_by}</span>
            </>
          )}
        </div>
        <div className="flex gap-1.5" onClick={e => e.stopPropagation()}>
          {readOnly && <span className="text-[11px] text-[var(--color-text-faint)]">Tracking</span>}
          {canClaim && (
            <button onClick={() => onClaim(inquiry.id)} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white text-black hover:opacity-90 transition-all">
              Claim
            </button>
          )}
          {canAct && inquiry.status === 'in_progress' && (
            <button onClick={() => onStatusChange(inquiry.id, 'completed')} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25 transition-all">
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ activeTab, search }) {
  const isSearching = Boolean(search.trim());
  const emptyCopy = {
    inbox: 'No unclaimed inquiries',
    work:  'No active work',
    team:  'No assigned inquiries',
    done:  'No completed inquiries yet',
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center mb-5">
        <Inbox className="w-7 h-7 text-[var(--color-text-faint)]" />
      </div>
      <h3 className="font-semibold text-[var(--color-text-heading)] mb-2">
        {isSearching ? 'No results found' : emptyCopy[activeTab] || 'No inquiries yet'}
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] max-w-xs leading-relaxed">
        {isSearching
          ? 'Try adjusting your search or filter.'
          : 'When clients submit the Hire Expert form, inquiries will appear here.'}
      </p>
    </div>
  );
}

// ─── Detail Drawer ────────────────────────────────────────────────────────────

function SectionLabel({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <Icon className="w-3.5 h-3.5 text-[var(--color-text-faint)]" />
      <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-faint)]">{label}</span>
    </div>
  );
}

function DetailRow({ label, value, mono = false }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-[var(--color-text-faint)] shrink-0">{label}</span>
      <span className={`text-xs text-[var(--color-text)] text-right ${mono ? 'font-mono' : 'font-medium'}`}>{value || '—'}</span>
    </div>
  );
}

function DetailDrawer({ inquiry, userName, onClose, onClaim, onRelease, onStatusChange, readOnly = false }) {
  const isMyInquiry = inquiry.claimed_by === userName;
  const canClaim = !readOnly && inquiry.status === 'new';
  const canAct = !readOnly && isMyInquiry;
  const [notes, setNotes] = useState(inquiry.notes || '');

  useEffect(() => { setNotes(inquiry.notes || ''); }, [inquiry.id, inquiry.notes]);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-[#0e0e0e] border-l border-[var(--color-border)] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] shrink-0">
          <div>
            <div className="font-semibold text-[var(--color-text-heading)] text-sm">Inquiry Details</div>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(inquiry.id)}
              title="Copy full ID"
              className="text-[11px] text-[var(--color-text-faint)] font-mono mt-0.5 hover:text-white transition-colors cursor-copy text-left"
            >
              {shortId(inquiry.id)}
            </button>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-faint)] hover:text-white hover:bg-white/[0.06] transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <StatusBadge status={inquiry.status} />
            <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-faint)]">
              <Clock className="w-3 h-3" />
              {formatDate(inquiry.submitted_at)}
            </div>
          </div>

          <section>
            <SectionLabel icon={User} label="Client" />
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-2">
              <DetailRow label="Name"    value={inquiry.name} />
              <DetailRow label="Phone"   value={`${inquiry.country_dial || ''} ${inquiry.phone || ''}`} mono />
              <DetailRow label="Country" value={inquiry.country_name || '—'} />
              {inquiry.phone && (
                <a
                  href={`https://wa.me/${(inquiry.country_dial || '').replace(/\D/g, '')}${inquiry.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Message on WhatsApp
                </a>
              )}
            </div>
          </section>

          <section>
            <SectionLabel icon={BookOpen} label="Assignment" />
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-2">
              <DetailRow label="Subject" value={inquiry.subject} />
              <DetailRow label="Domain"  value={getDomainLabel(inquiry.domain_id)} />
              <DetailRow label="Service" value={getServiceLabel(inquiry.service_id, inquiry.custom_service)} />
            </div>
          </section>

          <section>
            <SectionLabel icon={FileText} label="Description" />
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4">
              <p className="text-sm text-[var(--color-text)] leading-relaxed whitespace-pre-wrap">
                {inquiry.description || '—'}
              </p>
            </div>
          </section>

          {inquiry.attachments?.length > 0 && (
            <section>
              <SectionLabel icon={Paperclip} label={`Attachments (${inquiry.attachments.length})`} />
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-2">
                {inquiry.attachments.map((url, idx) => (
                  <AttachmentItem key={idx} url={url} />
                ))}
              </div>
            </section>
          )}

          {inquiry.claimed_by && (
            <section>
              <SectionLabel icon={Users} label="Assigned" />
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <MemberAvatar name={inquiry.claimed_by} size="md" />
                  <div>
                    <div className="font-semibold text-sm text-[var(--color-text-heading)]">
                      {inquiry.claimed_by === userName ? `${inquiry.claimed_by} (You)` : inquiry.claimed_by}
                    </div>
                    <div className="text-xs text-[var(--color-text-faint)]">Claimed {timeAgo(inquiry.claimed_at)}</div>
                  </div>
                </div>
                {inquiry.completed_at && <DetailRow label="Completed" value={formatDate(inquiry.completed_at)} />}
              </div>
            </section>
          )}

          <section>
            <SectionLabel icon={StickyNote} label="Internal Notes" />
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              onBlur={() => { if (!readOnly) onStatusChange(inquiry.id, inquiry.status, notes); }}
              placeholder="Add internal notes about this inquiry..."
              rows={3}
              readOnly={readOnly}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-border-focus)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all resize-none read-only:cursor-default read-only:text-[var(--color-text-muted)]"
            />
          </section>
        </div>

        <div className="px-6 py-4 border-t border-[var(--color-border)] shrink-0 flex flex-col gap-2">
          {readOnly && (
            <div className="flex items-center justify-center gap-2 py-2.5 text-xs text-[var(--color-text-faint)]">
              {inquiry.claimed_by && <MemberAvatar name={inquiry.claimed_by} size="sm" />}
              Tracking only{inquiry.claimed_by ? ` - handled by ${inquiry.claimed_by}` : ''}
            </div>
          )}
          {canClaim && (
            <button onClick={() => onClaim(inquiry.id)} className="w-full py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all">
              Claim This Inquiry
            </button>
          )}
          {canAct && inquiry.status === 'claimed' && (
            <button onClick={() => onStatusChange(inquiry.id, 'in_progress')} className="w-full py-2.5 rounded-xl bg-violet-500/15 text-violet-400 border border-violet-500/20 text-sm font-semibold hover:bg-violet-500/25 active:scale-[0.98] transition-all">
              Mark as In Progress
            </button>
          )}
          {canAct && inquiry.status === 'in_progress' && (
            <button onClick={() => onStatusChange(inquiry.id, 'completed')} className="w-full py-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-sm font-semibold hover:bg-emerald-500/25 active:scale-[0.98] transition-all">
              Mark as Completed ✓
            </button>
          )}
          {!readOnly && isMyInquiry && inquiry.status === 'completed' && (
            <button onClick={() => onStatusChange(inquiry.id, 'in_progress')} className="w-full py-2.5 rounded-xl bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border border-[var(--color-border)] text-sm font-semibold hover:text-white transition-all">
              Reopen
            </button>
          )}
          {!readOnly && isMyInquiry && inquiry.status !== 'completed' && (
            <button onClick={() => { onRelease(inquiry.id); onClose(); }} className="w-full py-2.5 rounded-xl text-red-400 bg-red-400/[0.06] border border-red-400/15 text-sm font-medium hover:bg-red-400/10 active:scale-[0.98] transition-all">
              Release Claim
            </button>
          )}
          {!readOnly && !canClaim && !isMyInquiry && inquiry.status !== 'completed' && inquiry.claimed_by && (
            <div className="flex items-center justify-center gap-2 py-2.5 text-xs text-[var(--color-text-faint)]">
              <MemberAvatar name={inquiry.claimed_by} size="sm" />
              Handled by {inquiry.claimed_by}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

export default function AdminDashboard({ initialEmail }) {
  const userName = getDisplayName(initialEmail);

  const [inquiries,   setInquiries]   = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [fetchError,  setFetchError]  = useState('');
  const [actionError, setActionError] = useState('');
  const [search,      setSearch]      = useState('');
  const [activeTab,   setActiveTab]   = useState('inbox');
  const [selectedId,  setSelectedId]  = useState(null);
  const [chatOpen,     setChatOpen]     = useState(false);
  const [chatUnread,   setChatUnread]   = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const chatOpenRef                     = useRef(false);
  const audioCtxRef                     = useRef(null);

  // Pick up the AudioContext that was unlocked on the login page click.
  // No interaction needed here — the login button gesture already satisfied
  // the browser's autoplay policy.
  useEffect(() => {
    audioCtxRef.current = window.__adminAudioCtx || null;
  }, []);

  // ── FCM Push Notifications setup ───────────────────────────────────────────
  useEffect(() => {
    const setupFCM = async () => {
      try {
        // Register the Firebase service worker
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

        const messaging = getFirebaseMessaging();
        if (!messaging) return;

        // Request notification permission
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          console.warn('[FCM] Notification permission denied');
          return;
        }

        // Get FCM token
        const token = await getToken(messaging, {
          vapidKey: 'BDITDKRKvyqA5wZO7Pu62NWC6POwHuOrO_1y6EGU7ojV3Y7cR2fHHbkKAjR300t7mNEPUUJpkvgfEBdnIF0jUEY',
          serviceWorkerRegistration: registration,
        });

        if (token) {
          // Save token to Supabase — upsert so it updates if token refreshes
          await supabase.from('fcm_tokens').upsert(
            { user_email: initialEmail, token, updated_at: new Date().toISOString() },
            { onConflict: 'user_email' }
          );
          console.log('[FCM] Token saved');
        }

        // Handle foreground messages (tab is open and active)
        onMessage(messaging, (payload) => {
          console.log('[FCM] Foreground message:', payload);
          // We already handle new orders via Supabase realtime,
          // so foreground messages are intentionally ignored here
          // to avoid duplicate notifications.
        });

      } catch (err) {
        console.error('[FCM] Setup error:', err);
      }
    };

    setupFCM();
  }, [initialEmail]);

  // ── Single chat channel: fetches messages + drives unread dot ──────────────
  // localStorage key is per-user so each admin has their own last-seen cursor.
  const lastSeenKey = `chat_last_seen_${userName}`;

  const playSound = useCallback(() => {
    try {
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      fetch('/Sounds/chat_sound.mp3')
        .then(r => r.arrayBuffer())
        .then(buf => ctx.decodeAudioData(buf))
        .then(decoded => {
          const src = ctx.createBufferSource();
          src.buffer = decoded;
          src.connect(ctx.destination);
          src.start(0);
        })
        .catch(() => {});
    } catch (e) {}
  }, []);

  const markSeen = useCallback(() => {
    localStorage.setItem(lastSeenKey, new Date().toISOString());
    setChatUnread(false);
  }, [lastSeenKey]);

  useEffect(() => {
    // Initial fetch — after loading history, check if any messages arrived
    // since this user last had the chat open.
    supabase
      .from('admin_messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(200)
      .then(({ data, error }) => {
        if (error || !data) return;
        setChatMessages(data);
        // Check for unread messages from others since last seen
        const lastSeen = localStorage.getItem(lastSeenKey);
        const hasUnread = data.some(msg =>
          msg.sender_name !== userName &&
          (!lastSeen || new Date(msg.created_at) > new Date(lastSeen))
        );
        if (hasUnread) setChatUnread(true);
      });

    const channel = supabase
      .channel('admin_chat')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'admin_messages',
      }, (payload) => {
        const msg = payload.new;
        if (!msg?.id) return;
        // Append new message (avoid duplicates)
        setChatMessages(prev =>
          prev.some(m => m.id === msg.id) ? prev : [...prev, msg]
        );
        // Show unread dot and play sound if message is from someone else
        if (msg.sender_name !== userName) {
          if (!chatOpenRef.current) {
            setChatUnread(true);
          } else {
            // Chat is open — update last seen immediately
            localStorage.setItem(lastSeenKey, new Date().toISOString());
          }
          playSound();
        }
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('[admin_chat] realtime connected');
        }
      });

    return () => { supabase.removeChannel(channel); };
  }, [userName, lastSeenKey, playSound]);

  const fetchInquiries = useCallback(async ({ showLoading = false } = {}) => {
    if (showLoading) setLoading(true);
    setFetchError('');
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('submitted_at', { ascending: false });
      if (error) throw error;
      setInquiries(data ?? []);
    } catch (err) {
      console.error('fetchInquiries:', err);
      setFetchError('Failed to load inquiries. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries({ showLoading: true });

    // Redirect all tabs to login on sign-out
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        window.location.href = '/admin/login';
      }
    });

    const channel = supabase
      .channel('inquiries-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, (payload) => {
        setFetchError('');
        setInquiries(current => mergeRealtimeInquiry(current, payload));
      })
      .subscribe((status, error) => {
        if (error) console.error('inquiries realtime subscription:', error);
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') fetchInquiries();
      });

    const refreshOnFocus = () => {
      if (document.visibilityState === 'visible') fetchInquiries();
    };
    document.addEventListener('visibilitychange', refreshOnFocus);

    const syncInterval = window.setInterval(() => fetchInquiries(), 10000);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener('visibilitychange', refreshOnFocus);
      window.clearInterval(syncInterval);
      supabase.removeChannel(channel);
    };
  }, [fetchInquiries]);

  const handleLogout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('signOut error:', err);
      window.location.href = '/admin/login';
    }
  }, []);

  const handleClaim = useCallback(async (id) => {
    setActionError('');
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .update({ status: 'claimed', claimed_by: userName, claimed_at: new Date().toISOString() })
        .eq('id', id)
        .eq('status', 'new')
        .is('claimed_by', null)
        .select();
      if (error) throw error;
      if (!data?.length) setActionError('This inquiry was already claimed by another admin.');
      fetchInquiries();
    } catch (err) {
      console.error('handleClaim:', err);
      setActionError('Failed to claim inquiry. Please try again.');
    }
  }, [userName, fetchInquiries]);

  const handleRelease = useCallback(async (id) => {
    setActionError('');
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: 'new', claimed_by: null, claimed_at: null, completed_at: null })
        .eq('id', id)
        .eq('claimed_by', userName);
      if (error) throw error;
      fetchInquiries();
    } catch (err) {
      console.error('handleRelease:', err);
      setActionError('Failed to release inquiry. Please try again.');
    }
  }, [userName, fetchInquiries]);

  const handleStatusChange = useCallback(async (id, newStatus, newNotes) => {
    setActionError('');
    try {
      const updates = { status: newStatus };
      if (newNotes !== undefined) updates.notes = newNotes;
      if (newStatus === 'completed') updates.completed_at = new Date().toISOString();
      if (newStatus !== 'completed') updates.completed_at = null;
      const { error } = await supabase
        .from('inquiries')
        .update(updates)
        .eq('id', id)
        .eq('claimed_by', userName);
      if (error) throw error;
      fetchInquiries();
    } catch (err) {
      console.error('handleStatusChange:', err);
      setActionError('Failed to update inquiry status. Please try again.');
    }
  }, [userName, fetchInquiries]);

  const filtered = useMemo(() => inquiries
    .filter(inq => {
      if (activeTab === 'inbox') return inq.status === 'new' && !inq.claimed_by;
      if (activeTab === 'work')  return isActiveWork(inq) && inq.claimed_by === userName;
      if (activeTab === 'team')  return Boolean(inq.claimed_by) || inq.status === 'completed';
      if (activeTab === 'done')  return inq.status === 'completed' && inq.claimed_by === userName;
      return false;
    })
    .filter(inq => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        inq.name?.toLowerCase().includes(q) ||
        inq.subject?.toLowerCase().includes(q) ||
        inq.phone?.includes(q) ||
        inq.description?.toLowerCase().includes(q)
      );
    }),
  [inquiries, activeTab, search, userName]);

  const stats = useMemo(() => ({
    unclaimed:      inquiries.filter(i => i.status === 'new' && !i.claimed_by).length,
    myActive:       inquiries.filter(i => isActiveWork(i) && i.claimed_by === userName).length,
    completedToday: inquiries.filter(isCompletedToday).length,
  }), [inquiries, userName]);

  const counts = useMemo(() => ({
    inbox: inquiries.filter(i => i.status === 'new' && !i.claimed_by).length,
    work:  inquiries.filter(i => isActiveWork(i) && i.claimed_by === userName).length,
    team:  inquiries.filter(i => Boolean(i.claimed_by)).length,
    done:  inquiries.filter(i => i.status === 'completed' && i.claimed_by === userName).length,
  }), [inquiries, userName]);

  const selectedInquiry = useMemo(
    () => inquiries.find(i => i.id === selectedId) || null,
    [inquiries, selectedId]
  );

  const isTeamView = activeTab === 'team';

  if (loading) return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-[var(--color-text-muted)]" />
    </div>
  );

  if (fetchError && inquiries.length === 0) return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center gap-4 px-4">
      <AlertCircle className="w-8 h-8 text-red-400" />
      <p className="text-sm text-red-400 text-center max-w-sm">{fetchError}</p>
      <button onClick={fetchInquiries} className="px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:opacity-90 transition-all">
        Retry
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <TopBar
          userName={userName}
          inquiries={inquiries}
          onLogout={handleLogout}
          onChatOpen={() => {
            if (chatOpenRef.current) {
              chatOpenRef.current = false; setChatOpen(false);
            } else {
              chatOpenRef.current = true; setChatOpen(true); markSeen();
            }
          }}
          chatUnread={chatUnread}
        />

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-heading)]">Inquiries</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Manage and track all client inquiries in real-time.</p>
        </div>

        {actionError && (
          <div className="flex items-center gap-2.5 mb-4 px-4 py-3 rounded-xl bg-red-400/10 border border-red-400/20 text-sm text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {actionError}
            <button onClick={() => setActionError('')} className="ml-auto text-red-400/60 hover:text-red-400 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {fetchError && (
          <div className="flex items-center gap-2.5 mb-4 px-4 py-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-sm text-amber-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {fetchError} Showing last loaded data.
          </div>
        )}

        <StatsRow stats={stats} />
        <FiltersBar search={search} setSearch={setSearch} activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} />

        {filtered.length === 0 ? (
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
            <EmptyState activeTab={activeTab} search={search} />
          </div>
        ) : (
          <>
            <div className="hidden md:block bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    {(isTeamView || activeTab === 'done' ? TABLE_HEADERS_TEAM : TABLE_HEADERS).map(h => (
                      <th key={h} className={`px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-faint)] ${HEADER_HIDDEN_CLASS[h] || ''}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(inq => (
                    <InquiryRow
                      key={inq.id}
                      inquiry={inq}
                      userName={userName}
                      onClaim={handleClaim}
                      onRelease={handleRelease}
                      onStatusChange={handleStatusChange}
                      onClick={() => setSelectedId(inq.id)}
                      isSelected={selectedId === inq.id}
                      readOnly={isTeamView}
                      showActions={!isTeamView && activeTab !== 'done'}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 gap-3 md:hidden">
              {filtered.map(inq => (
                <InquiryCard
                  key={inq.id}
                  inquiry={inq}
                  userName={userName}
                  onClaim={handleClaim}
                  onStatusChange={handleStatusChange}
                  onClick={() => setSelectedId(inq.id)}
                  readOnly={isTeamView}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {selectedInquiry && (
        <DetailDrawer
          inquiry={selectedInquiry}
          userName={userName}
          onClose={() => setSelectedId(null)}
          onClaim={handleClaim}
          onRelease={handleRelease}
          onStatusChange={handleStatusChange}
          readOnly={isTeamView}
        />
      )}
      {chatOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => { chatOpenRef.current = false; setChatOpen(false); }}
          />
          <ChatPanel
            userName={userName}
            messages={chatMessages}
            onClose={() => { chatOpenRef.current = false; setChatOpen(false); }}
          />
        </>
      )}

    </div>
  );
}