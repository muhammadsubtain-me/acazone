import { X, StickyNote } from 'lucide-react';
import { timeAgo, shortId, getServiceLabel, getDomainLabel } from '../lib/format';
import StatusBadge from './StatusBadge';
import MemberAvatar from './MemberAvatar';

export default function InquiryRow({ inquiry, userName, onClaim, onRelease, onStatusChange, onClick, isSelected, readOnly = false, showActions = true }) {
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
        {inquiry.contact_type === 'email' ? (
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
            <svg className="w-3 h-3 shrink-0 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span className="truncate max-w-[160px]">{inquiry.contact}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-mono">
            <svg className="w-3 h-3 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {inquiry.country_dial} {inquiry.phone}
          </div>
        )}
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
