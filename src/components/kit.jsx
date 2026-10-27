/*
  Thin app-level wrappers around shadcn/ui components (src/components/ui/*).
  Pages import from here so they keep a compact API (tables from column configs,
  side panels that become bottom sheets on phones, etc.).
*/
import React, { createContext, useContext, useState, useCallback, useId } from 'react';
import { ChevronRight, ChevronLeft, CircleAlert, CircleCheck, ArrowLeft, Search } from 'lucide-react';
import { toast as sonner } from 'sonner';
import { cn } from '@/lib/utils';
import { initials, statusTone } from '@/data';
import { Button } from '@/components/ui/button';
import { Badge as UIBadge } from '@/components/ui/badge';
import { Card as UICard } from '@/components/ui/card';
import { Input as UIInput } from '@/components/ui/input';
import { Textarea as UITextarea } from '@/components/ui/textarea';
import { NativeSelect } from '@/components/ui/native-select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress as UIProgress } from '@/components/ui/progress';
import { Avatar as UIAvatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs as UITabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table as UITable, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

export const cx = cn;
export { Button };

/* ---------- brand ---------- */
export function Logo({ size = 1 }) {
  const gid = `lg-gold-${useId().replace(/:/g, '')}`;
  return (
    <div className="flex items-center" style={{ gap: 9 * size }}>
      <svg className="logo-mark" width={30 * size} height={34 * size} viewBox="0 0 34 38" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e2ad35" />
            <stop offset="1" stopColor="#a87000" />
          </linearGradient>
        </defs>
        <path d="M3 22a14 14 0 0 0 28 0" stroke={`url(#${gid})`} strokeWidth="2" strokeLinecap="round" />
        <rect x="8" y="16" width="3" height="18" rx="1" fill={`url(#${gid})`} />
        <rect x="13" y="6" width="3.4" height="29" rx="1" fill={`url(#${gid})`} />
        <rect x="18.5" y="1" width="3.4" height="34" rx="1" fill={`url(#${gid})`} />
        <rect x="24" y="12" width="3" height="21" rx="1" fill={`url(#${gid})`} />
      </svg>
      <div className="logo-text" style={{ lineHeight: 0.95, color: '#a87000' }}>
        <div style={{ fontWeight: 600, fontSize: 14.5 * size, letterSpacing: '.04em' }}>DURRANI</div>
        <div style={{ fontWeight: 600, fontSize: 14.5 * size, letterSpacing: '.04em' }}>ESTATES</div>
        <div style={{ fontSize: 5.5 * size, letterSpacing: '.16em', color: '#a8a29e', marginTop: 3 * size }}>REAL ESTATE CONSULTANT</div>
      </div>
    </div>
  );
}

const AV = { sm: 'size-8 text-[11px]', lg: 'size-14 text-base', '': 'size-9 text-xs' };
export function Avatar({ name, size = '', tone = '' }) {
  return (
    <UIAvatar className={AV[size] || AV['']}>
      <AvatarFallback className={cn('font-semibold', tone === 'grey' ? 'bg-muted text-muted-foreground' : 'bg-primary-soft text-primary-strong')}>{initials(name)}</AvatarFallback>
    </UIAvatar>
  );
}

const TONE = { 'b-gold': 'gold', 'b-green': 'green', 'b-red': 'red', 'b-blue': 'blue', 'b-purple': 'purple', 'b-plain': 'outline', 'b-solid': 'default', '': 'neutral' };
export function Badge({ children, tone, dot, className }) {
  const t = tone === undefined ? statusTone(String(children)) : tone;
  return (
    <UIBadge variant={TONE[t] || 'neutral'} className={className}>
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </UIBadge>
  );
}

export function Card({ className, children, ...p }) {
  return <UICard className={className} {...p}>{children}</UICard>;
}

export function Field({ label, req, hint, children, right }) {
  return (
    <label className="flex min-w-0 flex-col gap-2">
      {label && (
        <span className="flex items-center justify-between gap-2 text-sm font-medium leading-none">
          <span>{label}{req && <span className="text-destructive"> *</span>}</span>
          {right && <span className="text-xs font-normal text-muted-foreground">{right}</span>}
        </span>
      )}
      {children}
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}
export const Input = (p) => <UIInput {...p} />;
export const Textarea = (p) => <UITextarea {...p} />;
export function Select({ options = [], className, style, ...p }) {
  return (
    <NativeSelect className={className} style={style} {...p}>
      {options.map((o) => (Array.isArray(o) ? <option key={o[0]} value={o[0]}>{o[1]}</option> : <option key={o}>{o}</option>))}
    </NativeSelect>
  );
}
export function SearchInput({ className, ...p }) {
  return (
    <div className={cn('input-wrap', className)}>
      <Search />
      <UIInput {...p} />
    </div>
  );
}
export function Toggle({ on, onChange, label }) {
  return <Switch checked={!!on} onCheckedChange={(v) => onChange?.(v)} aria-label={label} />;
}
export function Check2({ on, onChange, disabled }) {
  return <Checkbox checked={!!on} disabled={disabled} onCheckedChange={(v) => onChange?.(!!v)} />;
}
export function Progress({ value, className }) {
  const c = className || '';
  return <UIProgress value={value} className={cn(c.includes('thin') && 'h-1.5', c.includes('green') && 'bg-success/15')} indicatorClassName={c.includes('green') ? 'bg-success' : undefined} />;
}

/* ---------- layout pieces ---------- */
export function PageHead({ title, sub, actions, back, crumbs, light, children }) {
  return (
    <div className="page-head">
      {back && <Button variant="outline" size="icon" onClick={back} aria-label="Back" className="self-center"><ArrowLeft /></Button>}
      <div className="titles">
        {crumbs && (
          <div className="breadline">
            {crumbs.map((c, i) => (
              <React.Fragment key={i}>{i > 0 && <ChevronRight />}{i === crumbs.length - 1 ? <b>{c}</b> : <span>{c}</span>}</React.Fragment>
            ))}
          </div>
        )}
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {children}
      {actions && <div className="actions">{actions}</div>}
    </div>
  );
}

export function Stat({ label, value, sub, tone, icon: Icon, progress, onClick, unit }) {
  return (
    <UICard className={cn('stat gap-0', onClick && 'clickable')} onClick={onClick}>
      {Icon && <Icon className="ico" />}
      <div className="label">{label}</div>
      <div className="value">{value}{unit && <small>{unit}</small>}</div>
      {progress !== undefined && <UIProgress value={progress} />}
      {sub && <div className={cn('delta', tone)}>{sub}</div>}
    </UICard>
  );
}
export const Stats = ({ children, style }) => <div className="stats" style={style}>{children}</div>;

export function Tabs({ tabs, value, onChange, className = '' }) {
  return (
    <UITabs value={value} onValueChange={onChange} className={cn(className.replace(/\b(in-card|dark)\b/g, ''))}>
      <TabsList variant="line" className={cn(className.includes('in-card') && 'px-3')}>
        {tabs.map((t) => {
          const [key, label, Icon] = Array.isArray(t) ? t : [t, t];
          return <TabsTrigger key={key} value={key}>{Icon && <Icon />}{label}</TabsTrigger>;
        })}
      </TabsList>
    </UITabs>
  );
}
export function Pills({ items, value, onChange }) {
  return (
    <UITabs value={value} onValueChange={onChange}>
      <TabsList>{items.map((i) => <TabsTrigger key={i} value={i}>{i}</TabsTrigger>)}</TabsList>
    </UITabs>
  );
}

export function Table({ cols, rows, onRow, empty = 'No records match these filters.', rowKey, selected, compact }) {
  return (
    <UITable className={compact ? '' : 'min-w-[720px]'}>
      <TableHeader>
        <TableRow className="hover:bg-transparent">{cols.map((c, i) => <TableHead key={i} style={c.w ? { width: c.w } : undefined}>{c.h}</TableHead>)}</TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 && <TableRow className="hover:bg-transparent"><TableCell colSpan={cols.length}><div className="empty">{empty}</div></TableCell></TableRow>}
        {rows.map((r, ri) => {
          const k = rowKey ? rowKey(r) : ri;
          return (
            <TableRow key={k} className={cn(onRow && 'click')} data-state={selected === k ? 'selected' : undefined} onClick={onRow ? () => onRow(r) : undefined}>
              {cols.map((c, ci) => <TableCell key={ci}>{c.r ? c.r(r, ri) : r[c.k]}</TableCell>)}
            </TableRow>
          );
        })}
      </TableBody>
    </UITable>
  );
}

export function Pagination({ shown, total }) {
  const [p, setP] = useState(1);
  return (
    <div className="pagination">
      <span>Showing 1–{shown} of {total} leads</span>
      <div className="pages">
        <Button variant="outline" size="icon-sm" aria-label="Previous page" onClick={() => setP(Math.max(1, p - 1))}><ChevronLeft /></Button>
        {[1, 2, 3].map((n) => <Button key={n} variant={p === n ? 'default' : 'outline'} size="icon-sm" onClick={() => setP(n)}>{n}</Button>)}
        <span className="px-1 self-center">…</span>
        <Button variant={p === 26 ? 'default' : 'outline'} size="icon-sm" onClick={() => setP(26)}>26</Button>
        <Button variant="outline" size="icon-sm" aria-label="Next page" onClick={() => setP(Math.min(26, p + 1))}><ChevronRight /></Button>
      </div>
    </div>
  );
}

export function BarRow({ label, value, pct, note }) {
  return (
    <div className="bar-row">
      <div className="between"><span>{label}</span><b>{value}</b></div>
      <UIProgress value={pct} />
      {note && <small>{note}</small>}
    </div>
  );
}

/* ---------- overlays ---------- */
// Right-hand side panel on desktop, bottom sheet on phones.
export function Drawer({ open, title, sub, onClose, children, footer }) {
  const mobile = useIsMobile();
  return (
    <Sheet open={!!open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side={mobile ? 'bottom' : 'right'} className={mobile ? '' : 'sm:max-w-[460px]'}>
        {mobile && <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-border" />}
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className={sub ? '' : 'sr-only'}>{sub || title}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">{children}</div>
        {footer && <SheetFooter className="pb-[max(1rem,env(safe-area-inset-bottom))] [&>[data-slot=button]]:max-sm:flex-1">{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  );
}

export function Confirm({ open, title, body, confirm = 'Confirm', danger, onCancel, onConfirm }) {
  return (
    <AlertDialog open={!!open} onOpenChange={(o) => !o && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{body}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={danger ? 'destructive' : 'default'} onClick={onConfirm}>{confirm}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const Note = ({ children, tone }) => <div className={cn('note', tone)}><CircleAlert />{children}</div>;
export const Success = ({ title, body }) => (
  <div className="success"><CircleCheck /><h3>{title}</h3><p>{body}</p></div>
);

/* ---------- toast (sonner) ---------- */
const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);
export function ToastProvider({ children }) {
  const push = useCallback((msg) => sonner.success(msg), []);
  return (
    <ToastCtx.Provider value={push}>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster position="bottom-center" />
    </ToastCtx.Provider>
  );
}

export function useForm(init) {
  const [v, setV] = useState(init);
  const bind = (k) => ({ value: v[k] ?? '', onChange: (e) => setV((s) => ({ ...s, [k]: e.target.value })) });
  return [v, bind, setV];
}
