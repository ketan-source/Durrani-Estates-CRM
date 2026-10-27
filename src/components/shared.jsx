import React, { useMemo, useState } from 'react';
import { MapPin, Building2, Bookmark, FileText, Heart, MessageCircle, Mail, CircleCheck, Bell, Clock3, UserRound, CalendarDays, CheckCircle2, Camera, KeyRound, Plus } from 'lucide-react';
import city from '../assets/city.jpg';
import { PROJECTS, NOTIFICATIONS } from '../data';
import { Card, Badge, PageHead, SearchInput, Select, Table, Field, Input, Toggle, Avatar, useToast, cx, Drawer } from './kit';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const IMG = city;

/* ---------- Project catalogue ---------- */
export function ProjectCatalogue({ title = 'Project Catalogue', sub = 'Match qualified requirements to the catalogue, shortlist and share properties.', onOpen, action, cta = 'Shortlist for another lead', onCta }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('Status');
  const [type, setType] = useState('Unit Type');
  const [cityF, setCityF] = useState('All City');
  const list = useMemo(() => PROJECTS.filter((p) =>
    (!q || (p.name + p.dev).toLowerCase().includes(q.toLowerCase())) &&
    (status === 'Status' || p.status === status) &&
    (type === 'Unit Type' || p.types.includes(type)) &&
    (cityF === 'All City' || p.city.startsWith(cityF))
  ), [q, status, type, cityF]);
  return (
    <>
      <PageHead title={title} sub={sub} actions={action} />
      <Card className="filters-bar">
        <SearchInput className="search" placeholder="Product name, supplier" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select options={['All Country', 'UAE', 'India']} />
        <Select value={cityF} onChange={(e) => setCityF(e.target.value)} options={['All City', 'Dubai', 'Abu Dhabi']} />
        <Select value={status} onChange={(e) => setStatus(e.target.value)} options={['Status', 'Under Construction', 'Near Completion', 'Ready']} />
        <Select value={type} onChange={(e) => setType(e.target.value)} options={['Unit Type', 'Studio', '1BR', '2BR', '3BR', '4BR', '5BR']} />
      </Card>
      {list.length === 0 && <Card><div className="empty">No projects match these filters.</div></Card>}
      <div className="project-grid">
        {list.map((p, i) => (
          <Card key={p.id} className="pcard" onClick={() => onOpen(p)}>
            <div className="pimg" style={{ backgroundImage: `url(${IMG})`, backgroundPosition: `${(i * 23) % 100}% 50%` }}>
              <div className="tags">
                <span className="chip-w">{p.status}</span>
                {i % 2 === 0 && <span className="chip-w"><Bookmark />Shortlisted</span>}
              </div>
            </div>
            <div className="pbody">
              <h3>{p.name}</h3>
              <div className="meta"><MapPin />{p.city}</div>
              <div className="meta"><Building2 />{p.dev} · {p.price}</div>
              <div className="ids">
                <div className="kv"><span>Project ID</span><strong>{p.id}</strong></div>
                <div className="kv"><span>Handover</span><strong>{p.handover}</strong></div>
              </div>
              <div className="unit-pills">{p.types.map((t) => <span key={t}>{t}</span>)}</div>
              <Button className="w-full" onClick={(e) => { e.stopPropagation(); onCta?.(p); }}><FileText />{cta}</Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export function ProjectDetail({ project: p, admin, onShortlist }) {
  const toast = useToast();
  const [fav, setFav] = useState(true);
  const [units, setUnits] = useState(p.units);
  return (
    <>
      <div className="p-hero" style={{ backgroundImage: `url(${IMG})` }}>
        <div>
          <div className="row" style={{ gap: 6 }}><span className="chip-w">{p.status}</span><span className="chip-w">{p.commission} commission</span></div>
          <h2>{p.name}</h2>
          <div className="meta"><MapPin size={13} />{p.city} · {p.dev}</div>
        </div>
      </div>
      <div className="detail-grid">
        <div className="stack">
          <Card>
            <div className="card-head" style={{ borderBottom: '1px solid var(--line-2)' }}><h3>About this project</h3></div>
            <div className="card-pad">
              <p className="small" style={{ lineHeight: 1.6 }}>{p.about}</p>
              <div className="kv-tiles mt-4">
                <div className="kv"><span>Project ID</span><strong>{p.id}</strong></div>
                <div className="kv"><span>Developer</span><strong>{p.dev}</strong></div>
                <div className="kv"><span>Sales contact</span><strong>+971 4 123 1231</strong></div>
                <div className="kv"><span>Location</span><strong>{p.city}</strong></div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="card-head" style={{ borderBottom: '1px solid var(--line-2)' }}><h3>Amenities</h3></div>
            <div className="card-pad row" style={{ flexWrap: 'wrap', gap: 8 }}>
              {p.amenities.map((a) => <span key={a} className="amenity"><CircleCheck />{a}</span>)}
            </div>
          </Card>
          <Card className="table-card">
            <div className="card-head"><div><h3>Available Units</h3><div className="sub">{units.length} units</div></div>
              {admin && <Button variant="outline" size="sm" onClick={() => { setUnits([...units, [`U-${9000 + units.length}`, '1 Bedroom', '700 sqft', 'AED 1,100,000', 'Available']]); toast('Unit added'); }}><Plus />Add unit</Button>}
            </div>
            <Table cols={[{ h: 'Unit', r: (u) => <b>{u[0]}</b> }, { h: 'Type', r: (u) => u[1] }, { h: 'Size', r: (u) => u[2] }, { h: 'Price', r: (u) => u[3] }, { h: 'Status', r: (u) => <Badge>{u[4]}</Badge> }]} rows={units} />
          </Card>
        </div>
        <div className="stack">
          <Card>
            <div className="card-head" style={{ borderBottom: '1px solid var(--line-2)' }}><h3>Actions</h3></div>
            <div className="card-pad stack" style={{ gap: 8 }}>
              {admin ? (
                <>
                  <Button className="w-full" onClick={() => toast('Project saved')}>Edit project</Button>
                  <Button variant="outline" className="w-full" onClick={() => toast('Availability sheet exported')}>Export availability</Button>
                  <Button variant="outline" className="w-full" onClick={() => toast('Project unpublished from catalogue')}>Unpublish from catalogue</Button>
                </>
              ) : (
                <>
                  <Button variant={fav ? 'soft' : 'outline'} className="w-full" onClick={() => setFav(!fav)}><Heart fill={fav ? 'currentColor' : 'none'} />{fav ? 'Favorited' : 'Add to favorites'}</Button>
                  <Button variant="outline" className="w-full" onClick={() => toast('Brochure shared via WhatsApp')}><MessageCircle />Share via WhatsApp</Button>
                  <Button variant="outline" className="w-full" onClick={() => toast('Brochure sent via email')}><Mail />Share via Email</Button>
                  <Button variant="outline" className="w-full" onClick={() => toast('Availability request sent to developer')}>Request Availability</Button>
                  {onShortlist && <Button className="w-full" onClick={() => onShortlist(p)}><Bookmark />Shortlist for a lead</Button>}
                </>
              )}
            </div>
          </Card>
          <Card>
            <div className="card-head" style={{ borderBottom: '1px solid var(--line-2)' }}><h3>Payment Plan</h3></div>
            <div className="card-pad small">{p.plan}</div>
          </Card>
          <Card>
            <div className="card-head" style={{ borderBottom: '1px solid var(--line-2)' }}><h3>Key Details</h3></div>
            <div className="card-pad kv-tiles">
              <div className="kv"><span>Unit types</span><strong>{p.types.join(', ')}</strong></div>
              <div className="kv"><span>Pricing</span><strong>{p.price}</strong></div>
              <div className="kv"><span>Handover</span><strong>{p.handover}</strong></div>
              <div className="kv"><span>Commission</span><strong>{p.commission}</strong></div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

/* ---------- notifications ---------- */
const NI = { check: CheckCircle2, clock: Clock3, user: UserRound, calendar: CalendarDays, file: FileText };
export function Notifications() {
  const [items, setItems] = useState(NOTIFICATIONS);
  const [tab, setTab] = useState('All');
  const list = tab === 'Unread' ? items.filter((i) => i.fresh) : items;
  return (
    <>
      <PageHead title="Notifications" sub="Updates on leads, bookings, approvals and attendance."
        actions={<Button variant="outline" onClick={() => setItems(items.map((i) => ({ ...i, fresh: false })))}>Mark all as read</Button>} />
      <Card className="table-card">
        <div className="toolbar"><div className="pills">{['All', 'Unread'].map((t) => <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}{t === 'Unread' ? ` (${items.filter((i) => i.fresh).length})` : ''}</button>)}</div></div>
        {list.length === 0 && <div className="empty">You're all caught up.</div>}
        {list.map((n, i) => {
          const I = NI[n.icon] || Bell;
          return (
            <div key={i} className="row" style={{ alignItems: 'flex-start', padding: '16px 20px', borderTop: '1px solid var(--line-2)', background: n.fresh ? '#fffdf7' : '#fff', gap: 12 }}>
              <span className="avatar sm" style={{ background: 'var(--gold-50)', color: 'var(--gold)' }}><I size={15} /></span>
              <div style={{ flex: 1 }}>
                <div className="row" style={{ gap: 8 }}><strong style={{ fontSize: 13.5 }}>{n.t}</strong>{n.fresh && <Badge tone="b-gold">New</Badge>}</div>
                <p className="small muted" style={{ marginTop: 4 }}>{n.d}</p>
                <span className="xs" style={{ color: 'var(--faint)' }}>{n.time}</span>
              </div>
            </div>
          );
        })}
      </Card>
    </>
  );
}

/* ---------- settings pieces ---------- */
export function ProfileForm({ name, role, email, phone, title = 'Profile', sub = 'Update your personal and work details.' }) {
  const toast = useToast();
  return (
    <Card className="card-pad">
      <div className="card-title">{title}</div>
      <div className="card-sub">{sub}</div>
      <div className="row mt-5 mt-4"><Avatar name={name} size="lg" /><Button variant="outline" size="sm" onClick={() => toast('Photo picker opened')}><Camera />Change photo</Button></div>
      <div className="grid-2 mt-5">
        <Field label="Full Name"><Input defaultValue={name} /></Field>
        <Field label="Role"><Input defaultValue={role} disabled /></Field>
        <Field label="Work Email"><Input defaultValue={email} /></Field>
        <Field label="Phone"><Input defaultValue={phone} /></Field>
      </div>
      <div className="row mt-5" style={{ justifyContent: 'flex-end' }}><Button onClick={() => toast('Profile saved')}>Save Changes</Button></div>
    </Card>
  );
}

export function NotificationPrefs() {
  const toast = useToast();
  const [s, setS] = useState({ 'New lead assigned': true, 'Follow-up reminders': true, 'Booking status changes': true, 'Leave approvals': false, 'Weekly performance digest': true });
  return (
    <Card className="card-pad">
      <div className="card-title">Notifications</div>
      <div className="card-sub">Choose which updates reach you in-app and by email.</div>
      <div className="mt-3">
        {Object.entries(s).map(([k, v]) => (
          <div key={k} className="perm-row"><span>{k}</span><Toggle on={v} onChange={(x) => setS({ ...s, [k]: x })} label={k} /></div>
        ))}
      </div>
      <div className="row mt-5" style={{ justifyContent: 'flex-end' }}><Button onClick={() => toast('Notification preferences saved')}>Save Changes</Button></div>
    </Card>
  );
}

export function Preferences() {
  const toast = useToast();
  const init = { thumbs: true, closed: false, split: true, email: true, wa: true, digest: false };
  const [t, setT] = useState(init);
  const tile = (k, a, b) => <div className="pref-tile"><div><strong>{a}</strong><span>{b}</span></div><Toggle on={t[k]} onChange={(v) => setT({ ...t, [k]: v })} label={a} /></div>;
  return (
    <Card className="card-pad">
      <div className="card-title">Preferences</div>
      <div className="card-sub">Personalise how your workspace looks and works.</div>
      <div className="divider" />
      <div className="sect-title">Language & region</div>
      <div className="sect-sub">Choose your locale and how dates and times appear across the module.</div>
      <div className="grid-3">
        <Field label="Language"><Select options={['English (India)', 'English (UK)', 'Arabic']} /></Field>
        <Field label="Region"><Select options={['India', 'United Arab Emirates']} /></Field>
        <Field label="Time zone"><Select options={['(GMT+05:30) India Standard Time', '(GMT+04:00) Gulf Standard Time']} /></Field>
        <Field label="Date format"><Select options={['DD/MM/YYYY · 01/10/2026', 'MM/DD/YYYY · 10/01/2026']} /></Field>
        <Field label="Time format"><Select options={['12-hour · 5:30 PM', '24-hour · 17:30']} /></Field>
        <Field label="First day of week"><Select options={['Monday', 'Sunday']} /></Field>
      </div>
      <div className="divider" />
      <div className="sect-title">Workspace defaults</div>
      <div className="sect-sub">Set the view you want to see when you start work.</div>
      <div className="grid-3">
        <Field label="Default landing page"><Select options={['Home Dashboard', 'My Leads', 'Project Catalogue']} /></Field>
        <Field label="Listing layout"><Select options={['Comfortable cards', 'Compact list']} /></Field>
        <Field label="Results per page"><Select options={['25 listings', '50 listings', '100 listings']} /></Field>
      </div>
      <div className="divider" />
      <div className="sect-title">Listing display</div>
      <div className="sect-sub">Control which listing details are shown while you browse.</div>
      <div className="pref-tiles">{tile('thumbs', 'Show thumbnails', 'Display property images')}{tile('closed', 'Show closed listings', 'Include sold and leased')}{tile('split', 'Open split view', 'Keep results in context')}</div>
      <div className="divider" />
      <div className="sect-title">Communication preferences</div>
      <div className="sect-sub">Choose how you receive lead and activity updates.</div>
      <div className="pref-tiles">{tile('email', 'Email updates', 'Lead and booking activity')}{tile('wa', 'WhatsApp alerts', 'New high-intent leads')}{tile('digest', 'Daily digest', 'One summary at 6:00 PM')}</div>
      <div className="row mt-5" style={{ justifyContent: 'flex-end' }}>
        <Button variant="outline" onClick={() => { setT(init); toast('Preferences reset'); }}>Reset to defaults</Button>
        <Button onClick={() => toast('Preferences saved')}>Save Changes</Button>
      </div>
    </Card>
  );
}

export function Security() {
  const toast = useToast();
  const [tfa, setTfa] = useState(true);
  return (
    <Card className="card-pad">
      <div className="card-title">Security</div>
      <div className="card-sub">Password and sign-in protection for this account.</div>
      <div className="perm-row mt-3"><div className="row"><span className="avatar sm" style={{ background: 'var(--gold-50)', color: 'var(--gold)' }}><KeyRound size={14} /></span><div><div className="strong small">Password</div><div className="xs muted">Last changed 45 days ago</div></div></div><button className="link" onClick={() => toast('Password reset link sent to your email')}>Change password</button></div>
      <div className="perm-row"><div><div className="strong small">Two-step verification</div><div className="xs muted">Ask for a code when signing in from a new device</div></div><Toggle on={tfa} onChange={setTfa} label="Two-step verification" /></div>
      <div className="perm-row"><div><div className="strong small">Active sessions</div><div className="xs muted">Chrome on macOS · Dubai · now</div></div><Button variant="outline" size="sm" onClick={() => toast('Signed out of other sessions')}>Sign out others</Button></div>
    </Card>
  );
}

export function SettingsLayout({ sub, items, value, onChange, onLogout, children }) {
  return (
    <>
      <PageHead title="Settings" sub={sub} />
      <div className="settings">
        <div className="set-nav">
          {items.map((i) => <button key={i} className={value === i ? 'active' : ''} onClick={() => (i === 'Logout' ? onLogout() : onChange(i))}>{i}</button>)}
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}

/* generic "simple form drawer" used for many create/add flows */
export function FormDrawer({ open, title, sub, fields, onClose, onSave, saveLabel = 'Save', note }) {
  const [v, setV] = useState({});
  if (!open) return null;
  const first = (o) => (Array.isArray(o[0]) ? o[0][0] : o[0]);
  const defaults = Object.fromEntries(fields.filter((f) => f.options).map((f) => [f.k, first(f.options)]));
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  return (
    <Drawer open title={title} sub={sub || 'Complete the requested action'} onClose={() => { setV({}); onClose(); }}
      footer={<><Button variant="outline" onClick={() => { setV({}); onClose(); }}>Cancel</Button><Button onClick={() => { onSave({ ...defaults, ...v }); setV({}); }}>{saveLabel}</Button></>}>
      {fields.map((f) => (
        <Field key={f.k} label={f.label} req={f.req}>
          {f.options ? <Select value={v[f.k] ?? first(f.options)} onChange={set(f.k)} options={f.options} />
            : f.area ? <Textarea placeholder={f.ph} value={v[f.k] || ''} onChange={set(f.k)} />
              : <Input placeholder={f.ph} type={f.type} value={v[f.k] || ''} onChange={set(f.k)} />}
        </Field>
      ))}
      {note}
    </Drawer>
  );
}
