import React, { useRef, useState } from 'react';
import {
  UserRound, UserPlus, Users, Building2, FileText, LineChart, CalendarDays, Camera,
  CloudUpload, ChevronRight, Plus, Filter, Download, Sparkles, Image as ImageIcon, MapPin, Eye, Waves, Dumbbell, ParkingCircle, ShieldCheck,
  Baby, ConciergeBell, ShoppingBag, PawPrint, Check, CircleCheck, Clock3, CircleX, Plane, Calendar, Info, KeyRound, MoreHorizontal, Save, FileSpreadsheet, Upload,
} from 'lucide-react';
import {
  Card, Badge, Stat, Stats, PageHead, Tabs, Table, SearchInput, Select, Field, Input, Textarea, Drawer, BarRow, Note, useToast, Avatar, Progress,
  Toggle, Check2, cx, Confirm,
} from '@/components/kit';
import { Security, SettingsLayout, FormDrawer } from '@/components/shared';
import { LEADS, SECONDARY, AGENTS, tempTone } from '@/data';
import { Button } from '@/components/ui/button';

/* ---------------- Dashboard ---------------- */
export function DashboardScreen({ go, leads, bookings, agents }) {
  const [period, setPeriod] = useState('This Month');
  const k = { 'This Month': 1, 'Last Month': 0.86, 'This Quarter': 2.7 }[period];
  const funnel = [['New Leads', 1284], ['Qualified', 742], ['Property Sales', 412], ['Bookings', 86], ['Closed', 54]];
  const pending = bookings.filter((b) => b.status === 'Pending').length;
  const unassigned = leads.filter((l) => !l.owner).length;
  return (
    <>
      <PageHead title="Admin Dashboard" sub="Organization-wide sales, lead and operational overview" actions={<Button onClick={() => go('import')}><CloudUpload />Import Leads</Button>} />
      <Stats>
        <Stat label="Total Leads" value="1,284" sub="+12.4% from last month" icon={UserRound} onClick={() => go('leads')} />
        <Stat label="Active Agents" value={agents.filter((a) => a.status === 'Active').length + 38} sub={`${agents.filter((a) => a.status !== 'Active').length + 3} pending invites`} icon={Users} onClick={() => go('people')} />
        <Stat label="Open Bookings" value="28" sub={`${pending + 5} need approval`} icon={FileText} onClick={() => go('bookings')} />
        <Stat label="Revenue GTV" value="AED 48.6M" sub="+18.2% from last month" icon={LineChart} />
      </Stats>
      <div className="dash-grid">
        <Card>
          <div className="card-head"><h3>Attention Required</h3><Button variant="outline" size="sm" onClick={() => go('audit')}>View all</Button></div>
          <div className="attn-list" style={{ padding: '0 20px 8px' }}>
            {[[pending + 5, 'Booking approvals', 'Admin review required', 'bookings'], [unassigned + 11, 'Unassigned leads', 'Need ownership assignment', 'assignments'], [5, 'Pending leave requests', 'Employee requests awaiting review', 'hr'], [agents.filter((a) => a.leads >= a.cap).length + 1, 'Capacity alerts', 'Agents at assignment capacity', 'assignments']].map(([n, a, b, to]) => (
              <div key={a} onClick={() => go(to)} role="button"><span className="attn-num">{n}</span><div style={{ flex: 1 }}><strong>{a}</strong><span>{b}</span></div><ChevronRight size={16} /></div>
            ))}
          </div>
        </Card>
        <Card className="card-pad">
          <div className="between" style={{ marginBottom: 20 }}><div className="card-title">Lead Funnel</div><Select style={{ width: 170 }} value={period} onChange={(e) => setPeriod(e.target.value)} options={['This Month', 'Last Month', 'This Quarter']} /></div>
          <div className="bars">{funnel.map(([a, b]) => <BarRow key={a} label={a} value={Math.round(b * k).toLocaleString()} pct={(b / 1284) * 100} />)}</div>
        </Card>
      </div>
    </>
  );
}

/* ---------------- Leads ---------------- */
export function LeadsScreen({ leads, agents, go, onCreate }) {
  const toast = useToast();
  const [q, setQ] = useState('');
  const [track, setTrack] = useState('All Tracks');
  const [owner, setOwner] = useState('All Owners');
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ name: '', phone: '', source: 'Manual', to: 'Unassigned', track: 'Property Sale' });
  const [err, setErr] = useState('');
  const rows = leads.filter((l) => (!q || `${l.name} ${l.id} ${l.phone}`.toLowerCase().includes(q.toLowerCase())) && (track === 'All Tracks' || l.track === track) && (owner === 'All Owners' || (owner === 'Unassigned' ? !l.owner : l.owner === owner)));
  const save = () => {
    if (!f.name.trim() || !f.phone.trim()) return setErr('Name and phone are required.');
    const id = `LEAD-${2052 + leads.length - LEADS.length}`;
    onCreate({ id, name: f.name, phone: f.phone, email: '—', temp: 'Warm', track: f.track, status: 'New', req: '—', owner: f.to === 'Unassigned' ? null : f.to, created: '26 Oct 2026', city: 'Dubai', country: 'UAE' });
    setOpen(false); setF({ name: '', phone: '', source: 'Manual', to: 'Unassigned', track: 'Property Sale' }); setErr(''); toast(`${id} created`);
  };
  return (
    <>
      <PageHead title="Leads" sub="View, create, import and manage leads across the organization" actions={<><Button onClick={() => setOpen(true)}><Plus />Create Lead</Button><Button variant="outline" onClick={() => go('import')}>Import</Button></>} />
      <Card className="table-card">
        <div className="toolbar">
          <SearchInput className="search" placeholder="Search name, phone or Lead ID" value={q} onChange={(e) => setQ(e.target.value)} />
          <Select style={{ flex: 1, minWidth: 150 }} value={track} onChange={(e) => setTrack(e.target.value)} options={['All Tracks', 'Property Sale', 'Convertible Notes', 'Secondary Market']} />
          <Select style={{ flex: 1, minWidth: 150 }} value={owner} onChange={(e) => setOwner(e.target.value)} options={['All Owners', 'Unassigned', ...agents.map((a) => a.name)]} />
          <Button variant="outline"><Filter />Filters</Button>
        </div>
        <Table rows={rows} rowKey={(l) => l.id} cols={[
          { h: 'Lead', r: (l) => <><b>{l.name}</b><span className="inline-id">{l.id} · {l.phone}</span></> }, { h: 'Temperature', r: (l) => <Badge tone={tempTone(l.temp)}>{l.temp}</Badge> },
          { h: 'Track', r: (l) => <Badge tone="b-gold">{l.track}</Badge> }, { h: 'Status', r: (l) => <Badge tone="b-plain">{l.status}</Badge> }, { h: 'Requirement', k: 'req' },
          { h: 'Owner', r: (l) => l.owner || <Button variant="destructive-outline" size="xs" onClick={() => go('assign', l.id)}>Unassigned · Assign</Button> }, { h: 'Created', k: 'created' },
        ]} />
      </Card>
      <Drawer open={open} onClose={() => setOpen(false)} title="Create Lead" sub="Complete the requested action"
        footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save}>Save</Button></>}>
        <Field label="Full Name" req><Input placeholder="Customer name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
        <Field label="Phone" req><Input placeholder="+971..." value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></Field>
        <Field label="Track"><Select value={f.track} onChange={(e) => setF({ ...f, track: e.target.value })} options={['Property Sale', 'Convertible Notes', 'Secondary Market']} /></Field>
        <Field label="Source"><Select value={f.source} onChange={(e) => setF({ ...f, source: e.target.value })} options={['Manual', 'Meta Leads', 'Google Ads', 'Website', 'Referral']} /></Field>
        <Field label="Assign To"><Select value={f.to} onChange={(e) => setF({ ...f, to: e.target.value })} options={['Unassigned', ...agents.map((a) => a.name)]} /></Field>
        {err && <span className="err">{err}</span>}
      </Drawer>
    </>
  );
}

/* ---------------- Lead import ---------------- */
export function LeadImportScreen({ onDone }) {
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [recent, setRecent] = useState([['Meta Leads · 284 rows', '30 Sep · 276 valid · 8 duplicates', 'Completed'], ['September Purchased Data · 500 rows', '29 Sep · 492 valid · 8 duplicates', 'Review'], ['Google Ads · 124 rows', '28 Sep · 124 valid', 'Completed']]);
  const [dupes, setDupes] = useState({ 'Rohan Gupta · +971 50 778 1100': 'Merge', 'Sana Mirza · +971 52 991 4432': 'Skip', 'Mayank Singh · +971 50 123 4567': 'Merge' });
  const inp = useRef();
  const steps = ['Upload', 'Map', 'Validate', 'Duplicates', 'Results'];
  const pick = (f) => { setFile({ name: f?.name || 'October_Campaign_Leads.csv', rows: 312 }); setStep(1); };
  const cols = [['Full Name', 'name'], ['Mobile', 'phone'], ['Email Address', 'email'], ['Budget', 'requirement'], ['Campaign', 'source']];
  return (
    <>
      <PageHead title="Lead Import" sub="Upload CSV, map fields, validate records and review duplicates" actions={<Button onClick={() => { setStep(0); inp.current?.click(); }}><CloudUpload />Upload CSV</Button>} />
      <div className="dash-grid" style={{ marginTop: 0 }}>
        <Card className="card-pad">
          <div className="small" style={{ fontWeight: 500, marginBottom: 14 }}>Import workflow</div>
          <div className="import-steps">{steps.map((s, i) => <button key={s} className={cx(i === step && 'active', i < step && 'done')} onClick={() => file && i <= step && setStep(i)}>{i + 1} {s}</button>)}</div>
          <div className="mt-5">
            {step === 0 && (
              <div className={cx('dropzone', drag && 'drag')} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]); }}>
                <CloudUpload /><strong>Drop CSV / Excel file here</strong><span>or choose a file from your computer</span>
                <input ref={inp} type="file" accept=".csv,.xlsx,.xls" hidden onChange={(e) => pick(e.target.files[0])} />
                <Button variant="outline" size="sm" className="mt-2" onClick={() => inp.current.click()}>Choose File</Button>
                <button className="link xs" onClick={() => pick()}>or use a sample file</button>
              </div>
            )}
            {step === 1 && <>
              <div className="row small"><FileSpreadsheet size={18} className="gold" /><b>{file.name}</b><span className="muted">· {file.rows} rows detected</span></div>
              <div className="stack mt-4" style={{ gap: 10 }}>
                {cols.map(([c, d]) => <div key={c} className="grid-2" style={{ alignItems: 'center', gap: 10 }}><div className="kv" style={{ padding: '10px 12px' }}><span>CSV column</span><strong>{c}</strong></div><Select defaultValue={d} options={[['name', 'Full name'], ['phone', 'Phone'], ['email', 'Email'], ['requirement', 'Requirement / budget'], ['source', 'Source'], ['skip', 'Do not import']]} /></div>)}
              </div>
              <div className="row mt-4" style={{ justifyContent: 'flex-end' }}><Button onClick={() => setStep(2)}>Validate records</Button></div>
            </>}
            {step === 2 && <>
              <div className="grid-3">{[['Valid', 296, 'green'], ['Missing phone', 6, 'red'], ['Duplicates', 3, 'gold']].map(([a, b, c]) => <div key={a} className="kv"><span>{a}</span><strong className={c} style={{ fontSize: 20 }}>{b}</strong></div>)}</div>
              <div className="mt-4"><Note>6 rows without a phone number will be skipped. Download them to fix and re-upload.</Note></div>
              <div className="row mt-4" style={{ justifyContent: 'flex-end' }}><Button variant="outline" onClick={() => toast('Error rows downloaded')}><Download />Error rows</Button><Button onClick={() => setStep(3)}>Review duplicates</Button></div>
            </>}
            {step === 3 && <>
              <div className="stack" style={{ gap: 8 }}>
                {Object.entries(dupes).map(([k, v]) => <div key={k} className="doc-row"><div><strong>{k}</strong><span>Matches an existing lead</span></div><div className="seg soft" style={{ width: 200 }}>{['Merge', 'Skip', 'Create'].map((o) => <button key={o} className={v === o ? 'on' : ''} style={{ height: 30, fontSize: 12 }} onClick={() => setDupes({ ...dupes, [k]: o })}>{o}</button>)}</div></div>)}
              </div>
              <div className="row mt-4" style={{ justifyContent: 'flex-end' }}><Button onClick={() => { setStep(4); setRecent([[`${file.name.replace(/\.\w+$/, '')} · ${file.rows} rows`, '26 Oct · 296 valid · 3 duplicates', 'Completed'], ...recent]); onDone(file.rows); toast('296 leads imported'); }}>Import 296 leads</Button></div>
            </>}
            {step === 4 && <div className="success" style={{ padding: 24 }}><CircleCheck /><h3>Import complete</h3><p>296 leads created · 2 merged · 1 skipped · 6 errors. New leads are unassigned until you route them.</p><Button variant="outline" size="sm" className="mt-4" onClick={() => { setFile(null); setStep(0); }}>Start another import</Button></div>}
          </div>
        </Card>
        <Card className="card-pad">
          <div className="small" style={{ fontWeight: 500, marginBottom: 4 }}>Recent imports</div>
          <div className="mini-list">{recent.map(([a, b, c], i) => <div key={i}><div><strong>{a}</strong><div className="xs muted" style={{ marginTop: 3 }}>{b}</div></div><Badge tone={c === 'Completed' ? 'b-green' : 'b-plain'}>{c}</Badge></div>)}</div>
        </Card>
      </div>
    </>
  );
}

/* ---------------- Assignments ---------------- */
export function AssignmentsScreen({ agents, leads, history, go }) {
  const toast = useToast();
  const [team, setTeam] = useState('All Teams');
  const [cap, setCap] = useState('All Capacity');
  const [rules, setRules] = useState({ 'Round-robin': true, 'Block at capacity': true, 'Manager assignment': true });
  const capOf = (a) => (a.leads >= a.cap ? 'At Capacity' : 'Available');
  const rows = agents.filter((a) => a.role === 'Agent' || a.name === 'Sarah Khan').filter((a) => (team === 'All Teams' || a.team === team) && (cap === 'All Capacity' || capOf(a) === cap));
  const firstUnassigned = leads.find((l) => !l.owner);
  return (
    <>
      <PageHead title="Assignments" sub="Assign, reassign and monitor ownership capacity" actions={<Button onClick={() => go('assign', firstUnassigned?.id)}><UserPlus />Assign Leads</Button>} />
      <Card className="table-card">
        <div className="toolbar"><Select style={{ flex: 1 }} value={team} onChange={(e) => setTeam(e.target.value)} options={['All Teams', 'Dubai Sales', 'Abu Dhabi Sales', 'Mumbai Sales']} /><Select style={{ flex: 1 }} value={cap} onChange={(e) => setCap(e.target.value)} options={['All Capacity', 'Available', 'At Capacity']} /></div>
        <Table rows={rows} cols={[
          { h: 'Agent', r: (a) => <b>{a.name}</b> }, { h: 'Team', k: 'team' }, { h: 'Active Leads', k: 'leads' }, { h: 'Capacity', k: 'cap' }, { h: 'Today Follow-ups', k: 'follow' },
          { h: 'Status', r: (a) => <Badge>{capOf(a)}</Badge> }, { h: 'Action', r: (a) => <Button variant="outline" size="xs" onClick={() => go('assign', leads.find((l) => l.owner === a.name)?.id)}>Reassign</Button> },
        ]} />
      </Card>
      <div className="dash-grid eq">
        <Card className="card-pad"><div className="small" style={{ fontWeight: 500, marginBottom: 6 }}>Assignment rules</div>
          {Object.entries(rules).map(([k, v]) => <div key={k} className="perm-row"><span>{k}</span><div className="row"><Badge tone={v ? (k === 'Manager assignment' ? 'b-gold' : 'b-green') : ''}>{v ? (k === 'Manager assignment' ? 'Allowed' : 'Enabled') : 'Off'}</Badge><Toggle on={v} onChange={(x) => { setRules({ ...rules, [k]: x }); toast(`${k} ${x ? 'enabled' : 'disabled'}`); }} label={k} /></div></div>)}
        </Card>
        <Card className="card-pad"><div className="small" style={{ fontWeight: 500, marginBottom: 6 }}>Ownership history</div>
          <div className="mini-list">{history.slice(0, 5).map(([a, b, c], i) => <div key={i}><strong>{a}</strong><span>{b} · {c}</span></div>)}</div>
        </Card>
      </div>
    </>
  );
}

export function AssignLeadScreen({ leads, agents, leadId, onBack, onAssign }) {
  const [id, setId] = useState(leadId || leads.find((l) => !l.owner)?.id || leads[0].id);
  const lead = leads.find((l) => l.id === id);
  const pool = agents.filter((a) => a.role === 'Agent' || a.name === 'Sarah Khan');
  const best = [...pool].filter((a) => a.leads < a.cap).sort((a, b) => a.leads / a.cap - b.leads / b.cap)[0];
  const [sel, setSel] = useState(best?.name);
  const [q, setQ] = useState('');
  const [method, setMethod] = useState('manual');
  const [prio, setPrio] = useState('High');
  const [notify, setNotify] = useState(true);
  const list = pool.filter((a) => !q || `${a.name} ${a.team}`.toLowerCase().includes(q.toLowerCase())).sort((a, b) => (a.name === best?.name ? -1 : b.name === best?.name ? 1 : 0));
  const target = method === 'round' ? best?.name : sel;
  return (
    <>
      <PageHead back={onBack} title="Assign lead" light sub="Choose the best available agent and confirm assignment details." actions={<Badge tone={lead.owner ? 'b-green' : 'b-gold'}>{lead.owner ? `Owned by ${lead.owner}` : 'Unassigned'}</Badge>} />
      <Card className="row" style={{ padding: '18px 20px', gap: 24, flexWrap: 'wrap' }}>
        <div className="row" style={{ minWidth: 260 }}><Avatar name={lead.name} size="lg" /><div><div className="row" style={{ gap: 6 }}><b style={{ fontSize: 16 }}>{lead.name}</b><span className="xs gold">{lead.id}</span></div><div className="xs muted" style={{ marginTop: 4 }}>{lead.email} · {lead.phone}</div>
          <Select style={{ marginTop: 8, height: 30, fontSize: 12, width: 220 }} value={id} onChange={(e) => setId(e.target.value)} options={leads.map((l) => [l.id, `Switch lead: ${l.name}`])} /></div></div>
        {[['Property interest', lead.track === 'Property Sale' ? '2-bed apartment · Downtown Dubai' : lead.track], ['Budget', lead.req], ['Source', 'Website enquiry'], ['Received', 'Today, 10:18 AM']].map(([a, b]) => <div key={a} style={{ flex: 1, minWidth: 130 }}><div className="xs muted" style={{ textTransform: 'uppercase', letterSpacing: '.04em' }}>{a}</div><div className="small mt-2" style={{ fontWeight: 500 }}>{b}</div></div>)}
      </Card>
      <Card className="mt-4" style={{ overflow: 'hidden' }}>
        <div className="between" style={{ padding: '14px 20px', borderBottom: '1px solid var(--line-2)' }}><div><div className="strong">Select agent</div><div className="xs muted" style={{ marginTop: 3 }}>Workload is updated in real time.</div></div><span className="xs gold row" style={{ gap: 5 }}><Sparkles size={13} />Best match highlighted</span></div>
        <div className="wide-left" style={{ gap: 0 }}>
          <div className="assign-list" style={{ padding: 16 }}>
            <div className="row"><SearchInput placeholder="Search by agent or team" value={q} onChange={(e) => setQ(e.target.value)} className="grow" /><Select style={{ width: 130 }} options={['All teams', 'Dubai Sales', 'Abu Dhabi Sales']} /></div>
            <div className="stack mt-4" style={{ gap: 10 }}>
              {list.map((a) => { const full = a.leads >= a.cap; const on = method === 'manual' ? sel === a.name : best?.name === a.name; return (
                <button key={a.name} disabled={full} onClick={() => { setMethod('manual'); setSel(a.name); }} className="row" style={{ border: `1px solid ${on ? 'var(--gold)' : 'var(--line)'}`, background: on ? '#fff9ec' : '#fff', borderRadius: 9, padding: '12px 14px', gap: 14, textAlign: 'left', opacity: full ? 0.7 : 1, cursor: full ? 'not-allowed' : 'pointer', flexWrap: 'wrap' }}>
                  <Avatar name={a.name} tone={on ? '' : 'grey'} /><div style={{ minWidth: 110 }}><b className="small">{a.name}</b><div className="xs muted">{a.team}</div></div>
                  <div style={{ flex: 1, minWidth: 110 }}><div className="between xs"><span className="muted">Active workload</span><b>{a.leads}/{a.cap}</b></div><Progress value={(a.leads / a.cap) * 100} className={cx('thin', !full && 'green')} /></div>
                  <div className="xs" style={{ minWidth: 80 }}><span className="muted">Today</span><div className="strong small">{a.follow} follow-ups</div></div>
                  <Badge tone={full ? 'b-gold' : 'b-green'}>{full ? 'At capacity' : 'Available'}</Badge><span className={cx('radio', on && 'on')} />
                </button>); })}
            </div>
          </div>
          <div style={{ padding: 16 }} className="stack">
            <Field label="Assignment method"><div className="seg soft"><button className={method === 'manual' ? 'on' : ''} onClick={() => setMethod('manual')}>Manual selection</button><button className={method === 'round' ? 'on' : ''} onClick={() => setMethod('round')}>Round robin</button></div></Field>
            <Field label="Assignment rule"><Select options={['Respect capacity limit', 'Allow over capacity', 'Same team only']} /></Field>
            <Field label="Priority"><div className="seg soft">{['Normal', 'High', 'Urgent'].map((x) => <button key={x} className={prio === x ? 'on' : ''} onClick={() => setPrio(x)}>{x}</button>)}</div></Field>
            <Field label="Note" right="Optional"><Textarea placeholder="Add context for the agent, next steps, or client preferences..." /></Field>
            <label className="row xs" style={{ cursor: 'pointer' }}><Check2 on={notify} onChange={setNotify} />Notify {target} by email and in-app notification</label>
          </div>
        </div>
        <div className="between" style={{ padding: '12px 20px', borderTop: '1px solid var(--line-2)', flexWrap: 'wrap' }}>
          <span className="xs muted row" style={{ gap: 6 }}><UserPlus size={14} className="green" />1 lead selected · Assigning to <b style={{ color: 'var(--text)' }}>{target}</b></span>
          <div className="row"><Button variant="outline" onClick={onBack}>Cancel</Button><Button disabled={!target || target === lead.owner} onClick={() => onAssign(id, target)}><UserPlus />Assign lead</Button></div>
        </div>
      </Card>
    </>
  );
}

/* ---------------- People ---------------- */
export function PeopleScreen({ agents, setAgents, log }) {
  const toast = useToast();
  const [tab, setTab] = useState('All');
  const [team, setTeam] = useState('All Teams');
  const [st, setSt] = useState('All Status');
  const [q, setQ] = useState('');
  const [add, setAdd] = useState(false);
  const [view, setView] = useState(null);
  const rows = agents.filter((a) => (tab === 'All' || (tab === 'Managers' ? a.role === 'Manager' : tab === 'Agents' ? a.role === 'Agent' : a.status === 'Inactive')) && (team === 'All Teams' || a.team === team) && (st === 'All Status' || a.status === st) && (!q || a.name.toLowerCase().includes(q.toLowerCase())));
  return (
    <>
      <PageHead title="People & Teams" sub="Manage Managers, Agents, teams and reporting relationships" actions={<Button onClick={() => setAdd(true)}><UserPlus />Add User</Button>} />
      <Tabs value={tab} onChange={setTab} tabs={['All', 'Managers', 'Agents', 'Inactive']} />
      <Card className="table-card mt-4">
        <div className="toolbar"><SearchInput className="search" placeholder="Search people" value={q} onChange={(e) => setQ(e.target.value)} /><Select style={{ flex: 1 }} value={team} onChange={(e) => setTeam(e.target.value)} options={['All Teams', 'Dubai Sales', 'Abu Dhabi Sales', 'Mumbai Sales']} /><Select style={{ flex: 1 }} value={st} onChange={(e) => setSt(e.target.value)} options={['All Status', 'Active', 'Pending Invite', 'Inactive']} /></div>
        <Table rows={rows} cols={[
          { h: 'Person', r: (a) => <b>{a.name}</b> }, { h: 'Role', r: (a) => <Badge tone={a.role === 'Manager' ? 'b-gold' : 'b-plain'}>{a.role}</Badge> }, { h: 'Team', k: 'team' }, { h: 'Reports To', k: 'reports' }, { h: 'Leads', k: 'leads' },
          { h: 'Status', r: (a) => <Badge tone={a.status === 'Active' ? 'b-green' : a.status === 'Inactive' ? 'b-red' : 'b-plain'}>{a.status}</Badge> }, { h: 'Action', r: (a) => <Button variant="outline" size="xs" onClick={() => setView(a)}>View</Button> },
        ]} />
      </Card>
      <FormDrawer open={add} title="Add User" onClose={() => setAdd(false)} saveLabel="Send invite"
        fields={[{ k: 'name', label: 'Full Name', ph: 'Employee name', req: true }, { k: 'email', label: 'Work Email', ph: 'name@durraniestates.com', type: 'email' }, { k: 'role', label: 'Role', options: ['Agent', 'Manager'] }, { k: 'team', label: 'Team', options: ['Dubai Sales', 'Abu Dhabi Sales', 'Mumbai Sales'] }, { k: 'reports', label: 'Reports To', options: ['Sarah Khan', 'David Ahmed', 'Admin'] }]}
        note={<Note tone="blue">An invitation email with a secure password link (valid 24 hours) will be sent.</Note>}
        onSave={(v) => { const n = v.name || 'New User'; setAgents([...agents, { name: n, id: 'AG-0' + (50 + agents.length), team: v.team, role: v.role, reports: v.reports, leads: 0, cap: 20, follow: 0, bookings: 0, revenue: '—', target: 0, status: 'Pending Invite' }]); setAdd(false); log('Invited user', n, `${v.role} · ${v.team}`); toast(`Invite sent to ${n}`); }} />
      <Drawer open={!!view} onClose={() => setView(null)} title={view?.name} sub={`${view?.role} · ${view?.team}`}
        footer={view && <><Button variant="destructive-outline" onClick={() => { setAgents(agents.map((a) => (a.name === view.name ? { ...a, status: a.status === 'Inactive' ? 'Active' : 'Inactive' } : a))); log(view.status === 'Inactive' ? 'Reactivated user' : 'Deactivated user', view.id, view.name); toast(view.status === 'Inactive' ? 'User reactivated' : 'User deactivated'); setView(null); }}>{view.status === 'Inactive' ? 'Reactivate' : 'Deactivate'}</Button>{view.status === 'Pending Invite' && <Button variant="outline" onClick={() => { toast('Invite resent'); }}>Resend invite</Button>}<Button onClick={() => setView(null)}>Done</Button></>}>
        {view && <>
          <div className="row"><Avatar name={view.name} size="lg" /><div><b>{view.name}</b><div className="xs muted" style={{ marginTop: 3 }}>{view.id} · Reports to {view.reports}</div></div></div>
          <div className="kv-tiles">{[['Active leads', `${view.leads}/${view.cap}`], ['Bookings', view.bookings], ['Revenue', view.revenue], ['Target', `${view.target}%`]].map(([a, b]) => <div key={a} className="kv"><span>{a}</span><strong>{b}</strong></div>)}</div>
          <Field label="Lead capacity"><Input type="number" defaultValue={view.cap} /></Field>
          <Field label="Team"><Select defaultValue={view.team} options={['Dubai Sales', 'Abu Dhabi Sales', 'Mumbai Sales']} /></Field>
        </>}
      </Drawer>
    </>
  );
}

/* ---------------- Add project ---------------- */
const AMENITIES = [['Swimming pool', Waves], ['Gym', Dumbbell], ['Parking', ParkingCircle], ['24/7 security', ShieldCheck], ["Children's area", Baby], ['Concierge', ConciergeBell], ['Retail', ShoppingBag], ['Pet friendly', PawPrint]];
function Section({ icon: I, title, sub, children }) {
  return (
    <Card className="card-pad">
      <div className="row" style={{ alignItems: 'flex-start' }}><span className="avatar sm" style={{ borderRadius: 8, background: 'var(--gold-50)', color: 'var(--gold)' }}><I size={15} /></span><div><div className="strong">{title}</div><div className="xs muted" style={{ marginTop: 3 }}>{sub}</div></div></div>
      <div className="divider" />{children}
    </Card>
  );
}
export function AddProjectScreen({ onCancel, onSave }) {
  const toast = useToast();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [am, setAm] = useState(['Swimming pool', 'Gym', 'Parking', '24/7 security']);
  const [extra, setExtra] = useState('');
  const [custom, setCustom] = useState([]);
  const [pub, setPub] = useState(true);
  const [status, setStatus] = useState('Under Construction');
  const [cover, setCover] = useState(false);
  const [tried, setTried] = useState(false);
  const save = () => { setTried(true); if (!name.trim()) { toast('Add a project name first'); return; } onSave(name); };
  const Actions = <div className="row" style={{ flexWrap: 'wrap' }}><Button variant="outline" onClick={onCancel}>Cancel</Button><Button variant="outline" onClick={() => toast('Draft saved')}><Save />Save draft</Button><Button onClick={save}><Plus />Add project</Button></div>;
  return (
    <>
      <PageHead crumbs={['Projects & Properties', 'Add project']} title="Add new project" light sub="Create a complete project profile for the property catalogue." actions={Actions} />
      <Note tone="blue">Fields marked with an asterisk are required. You can save a draft and complete the listing later.</Note>
      <div className="detail-grid">
        <div className="stack">
          <Section icon={Building2} title="Project information" sub="Core details shown throughout the catalogue.">
            <div className="stack">
              <Field label="Project name" req><Input placeholder="e.g. Durrani Creek Residences" value={name} onChange={(e) => setName(e.target.value)} style={tried && !name ? { borderColor: 'var(--red)' } : undefined} /></Field>
              <div className="grid-2">
                <Field label="Property type" req><Select options={['Residential tower', 'Villa community', 'Townhouses', 'Mixed use']} /></Field>
                <Field label="Developer" req><Select options={['Select developer', 'Durrani Developments', 'Emaar Partners', 'Palm Living Co.']} /></Field>
                <Field label="Project status" req><Select value={status} onChange={(e) => setStatus(e.target.value)} options={['Under Construction', 'Near Completion', 'Ready']} /></Field>
                <Field label="Expected completion"><Input type="month" /></Field>
              </div>
              <Field label="Project description" hint={`${desc.length} / 1,000 characters`}><Textarea maxLength={1000} placeholder="Describe the project, its architecture, community and key selling points..." value={desc} onChange={(e) => setDesc(e.target.value)} /></Field>
            </div>
          </Section>
          <Section icon={MapPin} title="Location & inventory" sub="Define where the project is and the scale of its inventory.">
            <div className="grid-2">
              <Field label="Emirate" req><Select options={['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah']} /></Field>
              <Field label="Area / community" req><Input placeholder="e.g. Business Bay" /></Field>
            </div>
            <div className="mt-4"><Field label="Full address" req><Input placeholder="Building, street, landmark and postal details" /></Field></div>
            <div className="grid-2 mt-4">
              <Field label="Total units" req><Input type="number" placeholder="0" /></Field>
              <Field label="Floor count" req><Input type="number" placeholder="0" /></Field>
              <Field label="Minimum price" req><div className="input-wrap"><Input placeholder="0" /><span className="suffix">AED</span></div></Field>
              <Field label="Maximum price" req><div className="input-wrap"><Input placeholder="0" /><span className="suffix">AED</span></div></Field>
              <Field label="Minimum area"><div className="input-wrap"><Input placeholder="0" /><span className="suffix">sq ft</span></div></Field>
              <Field label="Maximum area"><div className="input-wrap"><Input placeholder="0" /><span className="suffix">sq ft</span></div></Field>
            </div>
          </Section>
        </div>
        <div className="stack">
          <Section icon={ImageIcon} title="Project images" sub="Add a cover and gallery images for the listing.">
            <div className="dropzone" style={{ padding: 22 }}>
              {cover ? <><CircleCheck className="green" /><strong>cover-photo.jpg</strong><span>2.4 MB · ready</span></> : <><ImageIcon className="gold" /><strong>Upload a project cover</strong><span>Drag and drop or browse · JPG, PNG or WebP · 10 MB max</span></>}
              <Button variant="outline" size="sm" className="mt-2" onClick={() => setCover(true)}><Upload />{cover ? 'Replace cover' : 'Choose cover'}</Button>
            </div>
            <div className="grid-3 mt-3" style={{ gap: 8 }}>{[0, 1, 2].map((i) => <button key={i} className="dropzone" style={{ padding: 18, cursor: 'pointer' }} onClick={() => toast('Gallery picker opened')}><Plus /></button>)}</div>
            <div className="xs muted mt-2">Recommended cover ratio 16:9. Add up to 12 gallery images.</div>
          </Section>
          <Section icon={Sparkles} title="Amenities" sub="Select the facilities available in this project.">
            <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
              {[...AMENITIES, ...custom.map((c) => [c, Sparkles])].map(([a, I]) => { const on = am.includes(a); return <button key={a} className={cx('amenity', on && 'on')} onClick={() => setAm(on ? am.filter((x) => x !== a) : [...am, a])}><I />{a}{on && <Check />}</button>; })}
            </div>
            <div className="input-wrap mt-3"><Input placeholder="Add another amenity" value={extra} onChange={(e) => setExtra(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && extra.trim()) { setCustom([...custom, extra.trim()]); setAm([...am, extra.trim()]); setExtra(''); } }} style={{ paddingRight: 36 }} />
              <button className="eye gold" onClick={() => { if (extra.trim()) { setCustom([...custom, extra.trim()]); setAm([...am, extra.trim()]); setExtra(''); } }} aria-label="Add amenity"><Plus size={16} /></button></div>
          </Section>
          <Section icon={Eye} title="Publishing" sub="Review visibility before adding the project.">
            <div className="between"><div><div className="small strong">Publish to catalogue</div><div className="xs muted" style={{ marginTop: 3 }}>Make this project available to agents after creation.</div></div><Toggle on={pub} onChange={setPub} label="Publish" /></div>
            <div className="mt-3"><Note tone={pub ? 'green' : 'blue'}>{pub ? `The project will be listed as ${status}.` : 'The project will be saved but hidden from agents.'}</Note></div>
          </Section>
        </div>
      </div>
      <div className="between mt-5" style={{ borderTop: '1px solid var(--line)', paddingTop: 16, flexWrap: 'wrap' }}><span className="xs muted">Your changes are not saved yet.</span>{Actions}</div>
    </>
  );
}

/* ---------------- Bookings & approvals ---------------- */
export function BookingsApprovalScreen({ bookings, onDecide }) {
  const toast = useToast();
  const [tab, setTab] = useState('Booking');
  const [sel, setSel] = useState(null);
  const [dec, setDec] = useState('Approve');
  const [note, setNote] = useState('');
  const [err, setErr] = useState('');
  const [docs, setDocs] = useState([['DOC-8821', 'SPA', 'Marina Views · U-3102', 'Sarah Johnson', 'Pending'], ['DOC-8824', 'Passport', 'Durrani Towers · U-2003', 'Mayank Singh', 'Pending'], ['DOC-8810', 'Proof of Address', 'Palm Residences · U-4101', 'Ali Ahmed', 'Approved']]);
  const pend = bookings.filter((b) => b.status === 'Pending').length;
  const save = () => {
    if (dec === 'Reject' && !note.trim()) return setErr('Add a reason — rejections are recorded in the audit log.');
    onDecide(sel.id, dec, note); toast(`${sel.id} ${dec === 'Approve' ? 'approved' : dec === 'Reject' ? 'rejected' : 'sent back for changes'}`); setSel(null);
  };
  return (
    <>
      <PageHead title="Bookings & Approvals" sub="Review booking, document and SPA approval queues" />
      <Stats>
        <Stat label="Pending Booking" value={pend + 5} sub="Requires review" /><Stat label="Documents" value={docs.filter((d) => d[4] === 'Pending').length + 10} sub="Pending Admin review" />
        <Stat label="SPA Review" value="4" sub="Awaiting approval" /><Stat label="Approved Today" value={bookings.filter((b) => b.status === 'Approved').length + 8} sub="+22% vs yesterday" />
      </Stats>
      <Card className="table-card" style={{ marginTop: 16 }}>
        <Tabs className="in-card" value={tab} onChange={setTab} tabs={['Booking', 'Documents', 'SPA']} />
        {tab === 'Booking' && <Table rows={bookings} cols={[
          { h: 'Booking', r: (b) => <b>{b.id}</b> }, { h: 'Customer', k: 'customer' }, { h: 'Project / Unit', r: (b) => `${b.project} · ${b.unit}` }, { h: 'Base Price', k: 'short' }, { h: 'Discount', k: 'discount' },
          { h: 'Agent / Manager', r: (b) => `${b.agent.split(' ')[0]} / ${b.manager.split(' ')[0]}` }, { h: 'Status', r: (b) => <Badge tone={b.status === 'Pending' ? 'b-plain' : undefined}>{b.status}</Badge> },
          { h: 'Action', r: (b) => <Button variant="outline" size="xs" onClick={() => { setSel(b); setDec('Approve'); setNote(''); setErr(''); }}>Review</Button> },
        ]} />}
        {tab === 'Documents' && <Table rows={docs} cols={[{ h: 'Document', r: (d) => <b>{d[0]}</b> }, { h: 'Type', r: (d) => d[1] }, { h: 'Booking', r: (d) => d[2] }, { h: 'Customer', r: (d) => d[3] }, { h: 'Status', r: (d) => <Badge>{d[4]}</Badge> },
          { h: 'Action', r: (d) => d[4] === 'Pending' ? <div className="row" style={{ gap: 6 }}><Button size="xs" onClick={() => { setDocs(docs.map((x) => (x[0] === d[0] ? [...x.slice(0, 4), 'Approved'] : x))); toast(`${d[0]} approved`); }}>Approve</Button><Button variant="outline" size="xs" onClick={() => { setDocs(docs.map((x) => (x[0] === d[0] ? [...x.slice(0, 4), 'Rejected'] : x))); toast(`${d[0]} rejected`); }}>Reject</Button></div> : '—' }]} />}
        {tab === 'SPA' && <Table rows={[['SPA-301', 'Sarah Johnson', 'Marina Views · U-3102', 'Drafted', 'Pending'], ['SPA-298', 'Ali Ahmed', 'Palm Residences · U-4101', 'Signed by buyer', 'Pending'], ['SPA-290', 'Lisa Ray', 'Durrani Towers · U-2001', 'Countersigned', 'Approved']]}
          cols={['SPA', 'Customer', 'Unit', 'Stage', 'Status'].map((h, i) => ({ h, r: (r) => (i === 4 ? <Badge>{r[4]}</Badge> : i === 0 ? <b>{r[0]}</b> : r[i]) }))} />}
      </Card>
      <Drawer open={!!sel} onClose={() => setSel(null)} title="Booking Approval" sub="Complete the requested action" footer={<><Button variant="outline" onClick={() => setSel(null)}>Cancel</Button><Button onClick={save}>Save Decision</Button></>}>
        {sel && <>
          <div className="detail-line"><span>Booking</span><strong>{sel.id} · {sel.project} {sel.unit}</strong></div>
          <div className="detail-line"><span>Customer</span><strong>{sel.customer}</strong></div>
          <div className="detail-line"><span>Base Price</span><strong>{sel.price}</strong></div>
          <div className="detail-line"><span>Discount</span><strong>{sel.discount}</strong></div>
          <div className="detail-line"><span>Documents</span><strong>{sel.docs}</strong></div>
          <Field label="Decision"><Select value={dec} onChange={(e) => { setDec(e.target.value); setErr(''); }} options={['Approve', 'Reject', 'Request changes']} /></Field>
          <Field label="Review Notes" req={dec === 'Reject'}><Textarea placeholder="Add review notes..." value={note} onChange={(e) => setNote(e.target.value)} /></Field>
          {err ? <span className="err">{err}</span> : <Note>Rejection requires a reason and will be recorded in the audit log.</Note>}
        </>}
      </Drawer>
    </>
  );
}

/* ---------------- Secondary / CN / Commission ---------------- */
export function SecondaryMarketScreen({ log }) {
  const toast = useToast();
  const [tab, setTab] = useState('Listings');
  const [rows, setRows] = useState(SECONDARY.map((r, i) => ({ ...r, ref: `SM-200${i + 1}`, status: ['Pending Review', 'Active', 'Match Ready', 'Pending Review'][i] })));
  const [st, setSt] = useState('All Status');
  const [open, setOpen] = useState(null);
  const [add, setAdd] = useState(false);
  const shown = rows.filter((r) => (tab === 'Buyer Leads' ? r.type === 'Buyer' : tab === 'Seller Leads' ? r.type === 'Seller' : tab === 'Matches' ? /Match/.test(r.status) : true) && (st === 'All Status' || r.status === st));
  return (
    <>
      <PageHead title="Secondary Market" sub="Review resale listings, buyer/seller leads and matches" actions={<Button onClick={() => setAdd(true)}><Plus />Add Listing</Button>} />
      <Tabs value={tab} onChange={setTab} tabs={['Listings', 'Buyer Leads', 'Seller Leads', 'Matches', 'Deals']} />
      <Card className="table-card mt-4">
        <div className="toolbar"><SearchInput className="search" placeholder="Search property, owner or lead" /><Select style={{ flex: 1 }} value={st} onChange={(e) => setSt(e.target.value)} options={['All Status', 'Pending Review', 'Active', 'Match Ready']} /></div>
        <Table rows={shown} empty="No deals in progress yet." cols={[{ h: 'Listing', r: (r) => <b>{r.ref}</b> }, { h: 'Type', k: 'type' }, { h: 'Property', k: 'property' }, { h: 'Asking Price', k: 'price' }, { h: 'Owner / Lead', k: 'who' }, { h: 'Status', r: (r) => <Badge tone={r.status === 'Active' ? 'b-green' : 'b-plain'}>{r.status}</Badge> }, { h: 'Action', r: (r) => <Button variant="outline" size="xs" onClick={() => setOpen(r)}>Open</Button> }]} />
      </Card>
      <Drawer open={!!open} onClose={() => setOpen(null)} title={open?.ref} sub={open?.property}
        footer={open && <><Button variant="outline" onClick={() => setOpen(null)}>Close</Button>{open.status === 'Pending Review' && <Button onClick={() => { setRows(rows.map((r) => (r.ref === open.ref ? { ...r, status: 'Active' } : r))); log('Approved listing', open.ref, open.property); toast('Listing approved and published'); setOpen(null); }}>Approve listing</Button>}</>}>
        {open && [['Type', open.type], ['Owner / Lead', open.who], ['Asking price', open.price], ['Agent', open.agent], ['Status', open.status], ['Last activity', open.last]].map(([a, b]) => <div key={a} className="detail-line"><span>{a}</span><strong>{b}</strong></div>)}
      </Drawer>
      <FormDrawer open={add} title="Add Secondary Market Listing" onClose={() => setAdd(false)} fields={[{ k: 'type', label: 'Type', options: ['Seller', 'Buyer'] }, { k: 'who', label: 'Owner / Lead', ph: 'Full name' }, { k: 'p', label: 'Property', ph: 'Community · unit' }, { k: 'price', label: 'Asking price', ph: 'AED' }]}
        onSave={(v) => { setRows([{ ref: `SM-20${10 + rows.length}`, type: v.type, who: v.who || '—', property: v.p || '—', price: v.price ? `AED ${v.price}` : '—', status: 'Active', agent: 'Admin', last: 'Just now' }, ...rows]); setAdd(false); toast('Listing added'); }} />
    </>
  );
}

export function ConvertibleNotesScreen({ log }) {
  const toast = useToast();
  const [rows, setRows] = useState([['Emma Wilson', 'Information Shared', 'Active', 'AED 2M', '6 months', 'Archit'], ['Lisa Ray', 'Admin Review', 'Waiting for Admin', 'AED 5M', '3 months', 'Sarah'], ['David Chen', 'Proceeding', 'Active', 'AED 3M', '12 months', 'Omar']]);
  const [sel, setSel] = useState(null);
  const [add, setAdd] = useState(false);
  return (
    <>
      <PageHead title="Convertible Notes" sub="Admin review of CN pipeline, escalations and document status" actions={<Button onClick={() => setAdd(true)}><Plus />Create CN Lead</Button>} />
      <Stats><Stat label="CN Leads" value="126" sub="Active pipeline" /><Stat label="Admin Review" value={rows.filter((r) => r[1] === 'Admin Review').length + 13} sub="Needs action" /><Stat label="Proceeding" value="22" sub="Current stage" /><Stat label="Completed" value="31" sub="This quarter" /></Stats>
      <Card className="table-card" style={{ marginTop: 16 }}>
        <Table rows={rows} cols={[{ h: 'Lead', r: (r) => <b>{r[0]}</b> }, { h: 'Stage', r: (r) => <Badge tone="b-gold">{r[1]}</Badge> }, { h: 'Status', r: (r) => r[2] }, { h: 'Expected Amount', r: (r) => r[3] }, { h: 'Timeline', r: (r) => r[4] }, { h: 'Owner', r: (r) => r[5] },
          { h: 'Admin Action', r: (r) => <Button variant="outline" size="xs" onClick={() => setSel(r)}>{r[1] === 'Proceeding' ? 'View' : 'Review'}</Button> }]} />
      </Card>
      <Drawer open={!!sel} onClose={() => setSel(null)} title={`CN · ${sel?.[0]}`} sub={sel?.[1]}
        footer={sel && <><Button variant="outline" onClick={() => setSel(null)}>Close</Button>{sel[1] !== 'Proceeding' && <Button onClick={() => { setRows(rows.map((r) => (r[0] === sel[0] ? [r[0], 'Proceeding', 'Active', ...r.slice(3)] : r))); log('Approved CN', sel[0], sel[3]); toast('Moved to Proceeding'); setSel(null); }}>Approve & proceed</Button>}</>}>
        {sel && <>{[['Expected amount', sel[3]], ['Timeline', sel[4]], ['Owner', sel[5]], ['KYC documents', '2 of 3 verified']].map(([a, b]) => <div key={a} className="detail-line"><span>{a}</span><strong>{b}</strong></div>)}<Field label="Admin notes"><Textarea placeholder="Notes for the agent" /></Field></>}
      </Drawer>
      <FormDrawer open={add} title="Create CN Lead" onClose={() => setAdd(false)} fields={[{ k: 'n', label: 'Lead', options: LEADS.map((l) => l.name) }, { k: 'a', label: 'Expected Amount', ph: 'AED' }, { k: 't', label: 'Timeline', options: ['3 months', '6 months', '12 months'] }, { k: 'o', label: 'Owner', options: ['Archit', 'Sarah', 'Omar'] }]}
        onSave={(v) => { setRows([[v.n, 'New', 'Active', v.a ? `AED ${v.a}` : '—', v.t, v.o], ...rows]); setAdd(false); toast('CN lead created'); }} />
    </>
  );
}

export function CommissionScreen() {
  const [m, setM] = useState('September 2026');
  return (
    <>
      <PageHead title="Commission" sub="View property, agent and target achievement information" actions={<Select style={{ width: 200 }} value={m} onChange={(e) => setM(e.target.value)} options={['September 2026', 'August 2026', 'July 2026']} />} />
      <Stats><Stat label="Property Commission" value="AED 1.26M" sub="Current month" /><Stat label="Agent Commission" value="AED 486K" sub="Current month" /><Stat label="Target Achievement" value="112%" sub="Organization" /><Stat label="Broker Receipts" value="18/22" sub="Tracked" /></Stats>
      <Card className="table-card" style={{ marginTop: 16 }}>
        <Table rows={[['Archit Batham', 'Dubai Sales', 9, 'AED 126K', 'AED 48K', 'AED 2.6M', 118], ['Sarah Khan', 'Dubai Sales', 12, 'AED 180K', 'AED 62K', 'AED 3.2M', 124], ['Omar Ali', 'Abu Dhabi', 7, 'AED 96K', 'AED 35K', 'AED 2.1M', 102]]}
          cols={['Agent', 'Team', 'Closed Deals', 'Property Commission', 'Agent Commission', 'Target', 'Achievement'].map((h, i) => ({ h, r: (r) => (i === 6 ? <Badge tone="b-green">{r[6]}%</Badge> : r[i]) }))} />
      </Card>
      <div className="mt-4"><Note>Commission slab/calculation configuration is intentionally not hard-coded; final rules remain configurable per the product specification.</Note></div>
    </>
  );
}

/* ---------------- HR ---------------- */
export function HRScreen({ go }) {
  const toast = useToast();
  const [tab, setTab] = useState('Attendance');
  const [emp, setEmp] = useState('All Employees');
  const [st, setSt] = useState('All Status');
  const [leaves, setLeaves] = useState([['Archit Batham', 'Annual Leave', 'Oct 4 – Oct 5', 2, 'Pending'], ['Neha Sharma', 'Casual Leave', 'Oct 7', 1, 'Pending'], ['Rahul Mehta', 'Annual Leave', 'Oct 10 – Oct 12', 3, 'Pending'], ['Omar Ali', 'Sick Leave', 'Sep 22', 1, 'Approved'], ['Maya Patel', 'Annual Leave', 'Oct 1 – Oct 3', 3, 'Pending'], ['Sarah Khan', 'Casual Leave', 'Sep 30', 1, 'Approved']]);
  const [pol, setPol] = useState({ annual: 22, casual: 6, sick: 10, carry: true, half: true });
  const [confirm, setConfirm] = useState(null);
  const rows = [['Archit Batham', 'Agent', 'Dubai Sales', '09:15 AM', '07:45 PM', 'Present'], ['Sarah Khan', 'Manager', 'Dubai Sales', '09:02 AM', '—', 'Present'], ['Omar Ali', 'Agent', 'Abu Dhabi', '10:11 AM', '—', 'Late'], ['Maya Patel', 'Agent', 'Mumbai Sales', '—', '—', 'On Leave']];
  return (
    <>
      <PageHead title="HR & Attendance" sub="Manage employee attendance, leave and regularisation" actions={<Button onClick={() => go('mark-attendance')}><CalendarDays />Mark Attendance</Button>} />
      <Tabs value={tab} onChange={setTab} tabs={['Attendance', 'Leave', 'Leave Settings']} />
      {tab === 'Attendance' && <>
        <Stats style={{ marginTop: 16 }}><Stat label="Present Today" value="64" sub="92%" /><Stat label="Late" value="5" sub="Today" /><Stat label="On Leave" value="4" sub="Today" /><Stat label="Regularisation" value="8" sub="Pending review" /></Stats>
        <Card className="table-card" style={{ marginTop: 16 }}>
          <div className="toolbar"><SearchInput className="search" placeholder="Search employee" /><Select style={{ flex: 1 }} value={emp} onChange={(e) => setEmp(e.target.value)} options={['All Employees', 'Agents', 'Managers']} /><Select style={{ flex: 1 }} value={st} onChange={(e) => setSt(e.target.value)} options={['All Status', 'Present', 'Late', 'On Leave']} /></div>
          <Table rows={rows.filter((r) => (st === 'All Status' || r[5] === st) && (emp === 'All Employees' || r[1] + 's' === emp))} cols={[{ h: 'Employee', r: (r) => <b>{r[0]}</b> }, { h: 'Role', r: (r) => r[1] }, { h: 'Team', r: (r) => r[2] }, { h: 'Check In', r: (r) => r[3] }, { h: 'Check Out', r: (r) => r[4] }, { h: 'Status', r: (r) => <Badge tone={r[5] === 'Present' ? 'b-green' : 'b-plain'}>{r[5]}</Badge> }, { h: 'Action', r: () => <Button variant="outline" size="xs" onClick={() => go('mark-attendance')}>Review</Button> }]} />
        </Card>
      </>}
      {tab === 'Leave' && <Card className="table-card mt-4">
        <Table rows={leaves} cols={[{ h: 'Employee', r: (r) => <b>{r[0]}</b> }, { h: 'Type', r: (r) => r[1] }, { h: 'Dates', r: (r) => r[2] }, { h: 'Days', r: (r) => r[3] }, { h: 'Status', r: (r) => <Badge>{r[4]}</Badge> },
          { h: 'Action', r: (r) => r[4] === 'Pending' ? <div className="row" style={{ gap: 6 }}><Button size="xs" onClick={() => setConfirm([r, 'Approved'])}>Approve</Button><Button variant="outline" size="xs" onClick={() => setConfirm([r, 'Rejected'])}>Reject</Button></div> : '—' }]} />
      </Card>}
      {tab === 'Leave Settings' && <Card className="card-pad mt-4">
        <div className="card-title">Leave policy</div><div className="card-sub">Annual entitlements applied to every employee.</div>
        <div className="grid-3 mt-5">{[['annual', 'Annual leave (days)'], ['casual', 'Casual leave (days)'], ['sick', 'Sick leave (days)']].map(([k, l]) => <Field key={k} label={l}><Input type="number" value={pol[k]} onChange={(e) => setPol({ ...pol, [k]: e.target.value })} /></Field>)}</div>
        <div className="mt-4">
          <div className="perm-row"><span>Carry forward unused annual leave (max 5 days)</span><Toggle on={pol.carry} onChange={(v) => setPol({ ...pol, carry: v })} /></div>
          <div className="perm-row"><span>Allow half-day leave</span><Toggle on={pol.half} onChange={(v) => setPol({ ...pol, half: v })} /></div>
        </div>
        <div className="row mt-5" style={{ justifyContent: 'flex-end' }}><Button onClick={() => toast('Leave policy saved')}>Save Changes</Button></div>
      </Card>}
      <Confirm open={!!confirm} title={`Are you sure you want to ${confirm?.[1] === 'Approved' ? 'approve' : 'reject'}?`} body={`${confirm?.[0][0]} · ${confirm?.[0][1]} · ${confirm?.[0][2]}`} confirm={confirm?.[1] === 'Approved' ? 'Approve' : 'Reject'} danger={confirm?.[1] === 'Rejected'}
        onCancel={() => setConfirm(null)} onConfirm={() => { setLeaves(leaves.map((l) => (l === confirm[0] ? [...l.slice(0, 4), confirm[1]] : l))); toast(`Leave ${confirm[1].toLowerCase()}`); setConfirm(null); }} />
    </>
  );
}

const ROSTER0 = [
  { name: 'Archit Batham', role: 'Agent · Dubai Sales', st: 'Present', in: '09:15 AM', out: '07:45 PM', loc: 'Head Office', upd: '9:16 AM' },
  { name: 'Sarah Khan', role: 'Manager · Dubai Sales', st: 'Present', in: '09:02 AM', out: '—', loc: 'Head Office', upd: '9:04 AM' },
  { name: 'Omar Ali', role: 'Agent · Abu Dhabi', st: 'Late', in: '10:11 AM', out: '—', loc: 'Abu Dhabi', upd: '10:12 AM' },
  { name: 'Areeba Patel', role: 'Agent · Dubai Sales', st: 'Present', in: '09:12 AM', out: '—', loc: 'Head Office', upd: 'Just now' },
  { name: 'Maya Patel', role: 'Agent · Mumbai Sales', st: 'On Leave', in: '—', out: '—', loc: '—', upd: 'Yesterday' },
  { name: 'Rayan Hussain', role: 'Agent · Dubai Sales', st: 'Absent', in: '—', out: '—', loc: '—', upd: 'Not marked' },
];
const stTone = { Present: 'b-green', Late: 'b-gold', 'On Leave': 'b-purple', Absent: 'b-red' };
export function MarkAttendanceScreen({ onBack, log }) {
  const toast = useToast();
  const [roster, setRoster] = useState(ROSTER0);
  const [sel, setSel] = useState('Areeba Patel');
  const cur = roster.find((r) => r.name === sel);
  const [f, setF] = useState({ st: cur.st, in: '09:12', out: '18:00', loc: 'Durrani Estates Head Office', notes: 'Client meeting scheduled off-site at 2:00 PM.' });
  const [q, setQ] = useState('');
  const [fs, setFs] = useState('All status');
  const pick = (r) => { setSel(r.name); setF({ st: r.st === '—' ? 'Present' : r.st, in: r.in === '—' ? '' : '09:00', out: '18:00', loc: 'Durrani Estates Head Office', notes: '' }); };
  const marked = roster.filter((r) => r.upd !== 'Not marked').length;
  const save = () => {
    const t12 = (t) => { if (!t) return '—'; const [h, m] = t.split(':'); const H = +h; return `${String(((H + 11) % 12) + 1).padStart(2, '0')}:${m} ${H < 12 ? 'AM' : 'PM'}`; };
    setRoster(roster.map((r) => (r.name === sel ? { ...r, st: f.st, in: ['Absent', 'On Leave'].includes(f.st) ? '—' : t12(f.in), loc: ['Absent', 'On Leave'].includes(f.st) ? '—' : f.loc.replace('Durrani Estates ', ''), upd: 'Just now' } : r)));
    log('Marked attendance', sel, f.st); toast(`Attendance saved for ${sel}`);
  };
  return (
    <>
      <PageHead crumbs={['HR & Attendance', 'Mark Attendance']} title="Mark Attendance" light actions={<Button variant="outline" onClick={onBack}>← Back to Attendance</Button>} />
      <Card className="row" style={{ padding: '14px 18px', gap: 24, flexWrap: 'wrap' }}>
        <div className="row"><span className="avatar sm" style={{ borderRadius: 8, background: 'var(--gold-50)', color: 'var(--gold)' }}><Calendar size={15} /></span><div><b className="small">Monday, 26 October 2026</b><div className="xs muted">Today's attendance</div></div></div>
        <div><div className="xs muted" style={{ textTransform: 'uppercase' }}>General shift</div><b className="small">09:00 AM – 06:00 PM</b></div>
        <div><div className="xs muted" style={{ textTransform: 'uppercase' }}>Team coverage</div><b className="small">{67 + marked} of 78 employees marked</b></div>
        <div style={{ flex: 1, minWidth: 200 }}><div className="between xs"><span className="muted">Today's completion</span><b className="green">{Math.round(((67 + marked) / 78) * 100)}%</b></div><Progress value={((67 + marked) / 78) * 100} className="green" /></div>
      </Card>
      <div className="wide-left mt-4" style={{ alignItems: 'start', gap: 16 }}>
        <Card className="table-card">
          <div className="card-head"><h3>Today's attendance roster <Badge>78 employees</Badge></h3><button className="link" style={{ color: 'var(--muted)', fontSize: 12 }} onClick={() => toast('Roster exported')}><Download size={14} />Export roster</button></div>
          <div className="toolbar" style={{ paddingTop: 0 }}><SearchInput className="search" placeholder="Search employee or ID" value={q} onChange={(e) => setQ(e.target.value)} /><Select style={{ width: 120 }} value={fs} onChange={(e) => setFs(e.target.value)} options={['All status', 'Present', 'Late', 'Absent', 'On Leave']} /></div>
          <Table rows={roster.filter((r) => (!q || r.name.toLowerCase().includes(q.toLowerCase())) && (fs === 'All status' || r.st === fs))} rowKey={(r) => r.name} selected={sel} onRow={pick} cols={[
            { h: 'Employee', r: (r) => <div className="cell-lead"><Avatar name={r.name} size="sm" tone={r.name === sel ? '' : 'grey'} /><div><strong>{r.name}</strong><span>{r.role}</span></div></div> }, { h: 'Status', r: (r) => <Badge tone={stTone[r.st]}>{r.st}</Badge> },
            { h: 'Check In', k: 'in' }, { h: 'Location', k: 'loc' }, { h: 'Updated', r: (r) => <span className="xs muted">{r.upd}</span> }, { h: 'Action', r: (r) => <Button variant="outline" size="xs" onClick={(e) => { e.stopPropagation(); pick(r); }}>Edit</Button> },
          ]} />
        </Card>
        <Card>
          <div className="card-head" style={{ borderBottom: '1px solid var(--line-2)' }}><div><h3>Attendance details</h3><div className="sub">Add or update one employee record</div></div><Badge>Unsaved</Badge></div>
          <div className="card-pad stack">
            <Field label="Employee" req><Select value={sel} onChange={(e) => pick(roster.find((r) => r.name === e.target.value))} options={roster.map((r) => r.name)} /></Field>
            <Field label="Attendance status" req><div className="grid-2" style={{ gap: 8 }}>{[['Present', CircleCheck], ['Late', Clock3], ['Absent', CircleX], ['On Leave', Plane]].map(([s, I]) => <Button key={s} variant={f.st === s ? 'soft' : 'outline'} size="sm" onClick={() => setF({ ...f, st: s })}><I />{s}</Button>)}</div></Field>
            {!['Absent', 'On Leave'].includes(f.st) && <div className="grid-2"><Field label="Check-in time"><Input type="time" value={f.in} onChange={(e) => setF({ ...f, in: e.target.value })} /></Field><Field label="Check-out time"><Input type="time" value={f.out} onChange={(e) => setF({ ...f, out: e.target.value })} /></Field></div>}
            {!['Absent', 'On Leave'].includes(f.st) && <Field label="Work location"><Select value={f.loc} onChange={(e) => setF({ ...f, loc: e.target.value })} options={['Durrani Estates Head Office', 'Abu Dhabi', 'Client site', 'Remote']} /></Field>}
            <Field label="Notes (optional)" right={`${f.notes.length} / 250`}><Textarea maxLength={250} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} /></Field>
            <div className="note blue"><Info />This record was last updated {cur.upd.toLowerCase()} by {cur.name === 'Areeba Patel' ? 'Archit Batham' : 'system'}.</div>
          </div>
          <div className="drawer-foot"><Button variant="outline" onClick={() => pick(cur)}>Clear</Button><Button onClick={save}><CalendarDays />Mark Attendance</Button></div>
        </Card>
      </div>
    </>
  );
}

/* ---------------- Reports / Audit ---------------- */
export function ReportsScreen() {
  const toast = useToast();
  return (
    <>
      <PageHead title="Reports & MIS" sub="Organization reporting across leads, activity, sales and teams" actions={<><Select style={{ width: 170 }} options={['September 2026', 'August 2026', 'Q3 2026']} /><Button variant="outline" onClick={() => toast('Report exported')}><Download />Export</Button></>} />
      <Stats><Stat label="Lead Conversion" value="6.8%" sub="Lead → booking" /><Stat label="Qualified Leads" value="742" sub="57.8% of intake" /><Stat label="Bookings" value="86" sub="This period" /><Stat label="Closed Revenue" value="AED 18.4M" sub="+11.6%" /></Stats>
      <div className="dash-grid eq">
        <Card className="card-pad"><div className="small" style={{ fontWeight: 500, marginBottom: 18 }}>Lead source</div>
          <div className="bars">{[['Meta / Instagram', 382], ['Google Ads', 296], ['Manual', 214], ['CSV / Purchased', 392]].map(([a, b]) => <BarRow key={a} label={a} value={b} pct={(b / 550) * 100} />)}</div></Card>
        <Card className="card-pad"><div className="small" style={{ fontWeight: 500, marginBottom: 4 }}>Agent performance</div>
          <div className="mini-list">{[['Sarah Khan', '12 bookings · 124% target'], ['Archit Batham', '9 bookings · 118% target'], ['Omar Ali', '7 bookings · 102% target'], ['Maya Patel', '3 bookings · 71% target']].map(([a, b]) => <div key={a}><strong>{a}</strong><span>{b}</span></div>)}</div></Card>
      </div>
    </>
  );
}

export function AuditScreen({ audit }) {
  const toast = useToast();
  const [q, setQ] = useState('');
  const [a, setA] = useState('All Actions');
  const rows = audit.filter((r) => (!q || r.join(' ').toLowerCase().includes(q.toLowerCase())) && (a === 'All Actions' || r[2].toLowerCase().includes(a.toLowerCase().replace(/s$/, ''))));
  return (
    <>
      <PageHead title="Audit Log" sub="Immutable record of ownership, approvals and important system actions" actions={<Button variant="outline" onClick={() => toast('Audit log exported')}><Download />Export Log</Button>} />
      <Card className="table-card">
        <div className="toolbar"><SearchInput className="search" placeholder="Search action, user or Lead ID" value={q} onChange={(e) => setQ(e.target.value)} /><Select style={{ flex: 1 }} value={a} onChange={(e) => setA(e.target.value)} options={['All Actions', 'Approved', 'Rejected', 'Assigned', 'Reassigned', 'Created', 'Imported']} /></div>
        <Table rows={rows} cols={[{ h: 'Time', r: (r) => r[0] }, { h: 'User', r: (r) => <b>{r[1]}</b> }, { h: 'Action', r: (r) => r[2] }, { h: 'Entity', r: (r) => r[3] }, { h: 'Details', r: (r) => r[4] }, { h: 'Source', r: (r) => <Badge tone="b-gold">{r[5]}</Badge> }]} />
      </Card>
    </>
  );
}

/* ---------------- Settings ---------------- */
const PERM_COLS = ['View', 'Create', 'Edit', 'Assign', 'Approve', 'Export', 'Manage'];
const PERM_GROUPS = [
  ['Leads', [['Lead records', 'Pipeline, contact details and activity', '1111010'], ['Lead import', 'Bulk imports and duplicate resolution', '1100100']]],
  ['Projects & properties', [['Projects', 'Developer projects and inventory', '1111110'], ['Properties', 'Units, availability and pricing', '1110010']]],
  ['Bookings & approvals', [['Bookings', 'Reservations, holds and cancellations', '1111110'], ['Approval requests', 'Discounts, exceptions and overrides', '1001101']]],
  ['Secondary market', [['Resale listings', 'Owner listings and buyer enquiries', '1110110']]],
  ['Reports', [['Reports & MIS', 'Sales, activity and performance reports', '1000010']]],
  ['Team management', [['People & teams', 'Members, teams and reporting lines', '1111000'], ['Roles', 'Role definitions and access controls', '1000000']]],
  ['Settings', [['Organization settings', 'Defaults, rules and preferences', '1010000'], ['Integrations', 'Connected apps and credentials', '1000000']]],
];
const ROLES = [['Administrator', '2 members', 'System role · Full access', 'Active'], ['Manager', '8 members', 'Sales and approval access', 'Active'], ['Agent', '42 members', 'Assigned leads and inventory', 'Active'], ['Marketing Coordinator', '3 members', 'Custom role · Campaign support', 'Draft']];
const roleBits = (role, bits) => {
  if (role === 'Administrator') return '1111111';
  if (role === 'Marketing Coordinator') return '1000010';
  if (role === 'Agent') return bits.slice(0, 3).replace(/1$/, '0') + '0000';
  return bits;
};
const roleSeed = (role) => Object.fromEntries(PERM_GROUPS.flatMap(([, items]) => items.map(([n, , bits]) => [n, roleBits(role, bits).split('').map((b) => b === '1')])));

export function SettingsScreen({ onLogout }) {
  const [s, setS] = useState('Organization');
  return (
    <SettingsLayout sub="Configure organization preferences, permissions and account settings" items={['Organization', 'Roles & Permissions', 'Lead Rules', 'Admin Profile', 'Security', 'Logout']} value={s} onChange={setS} onLogout={onLogout}>
      {s === 'Organization' && <OrgSettings />}
      {s === 'Roles & Permissions' && <RolesPerms />}
      {s === 'Lead Rules' && <LeadRules />}
      {s === 'Admin Profile' && <AdminProfile />}
      {s === 'Security' && <Security />}
    </SettingsLayout>
  );
}

export function OrgSettings() {
  const toast = useToast();
  const [p, setP] = useState({ 'Admin can override Manager hold': true, 'Ownership history is immutable': true, 'Booking requires Admin approval': true });
  return (
    <Card className="card-pad">
      <div className="card-title">Organization settings</div><div className="card-sub">Manage core CRM configuration.</div>
      <div className="grid-2 mt-5">
        <Field label="Organization Name"><Input defaultValue="Durrani Estates" /></Field>
        <Field label="Default Currency"><Select options={['AED', 'USD', 'INR']} /></Field>
        <Field label="Lead Capacity Rule"><Select options={['Block at capacity', 'Warn at capacity', 'No limit']} /></Field>
        <Field label="Default Lead Temperature"><Select options={['Warm', 'Hot', 'Cold']} /></Field>
      </div>
      <div className="sect-title mt-5">Permissions</div>
      {Object.entries(p).map(([k, v]) => <div key={k} className="perm-row"><span>{k}</span><div className="row"><Badge tone={v ? 'b-green' : ''}>{v ? 'Enabled' : 'Disabled'}</Badge><Toggle on={v} onChange={(x) => setP({ ...p, [k]: x })} label={k} /></div></div>)}
      <div className="row mt-5" style={{ justifyContent: 'flex-end' }}><Button onClick={() => toast('Organization settings saved')}>Save Changes</Button></div>
    </Card>
  );
}

export function RolesPerms() {
  const toast = useToast();
  const [roles, setRoles] = useState(ROLES);
  const [role, setRole] = useState('Manager');
  const [perms, setPerms] = useState(() => Object.fromEntries(ROLES.map((r) => [r[0], roleSeed(r[0])])));
  const [add, setAdd] = useState(false);
  const cur = perms[role];
  const locked = role === 'Administrator';
  const flip = (n, i) => setPerms({ ...perms, [role]: { ...cur, [n]: cur[n].map((b, j) => (j === i ? !b : b)) } });
  const r = roles.find((x) => x[0] === role);
  return (
    <Card>
      <div className="card-head" style={{ alignItems: 'flex-start' }}><div><h3 style={{ fontWeight: 500, fontSize: 16 }}>Role management</h3><div className="sub">Define role access and keep your team aligned with the right level of control.</div></div><Button size="sm" onClick={() => setAdd(true)}><Plus />Add Role</Button></div>
      <div className="role-cards" style={{ padding: '0 20px 20px' }}>
        {roles.map(([n, m, d, st]) => <button key={n} className={cx('role-card', role === n && 'active')} onClick={() => setRole(n)}><div className="between"><strong>{n}</strong><Badge tone={st === 'Active' ? 'b-green' : ''}>{st}</Badge></div><div className="m">{m}</div><div className="d">{d}</div></button>)}
      </div>
      <div style={{ borderTop: '1px solid var(--line-2)', padding: 20 }}>
        <div className="between" style={{ alignItems: 'flex-start' }}><div><div className="row" style={{ gap: 8 }}><b>{role} permissions</b><Badge tone={r[3] === 'Active' ? 'b-green' : ''}>{r[3]}</Badge></div><div className="xs muted" style={{ marginTop: 4 }}>{r[1]} · {locked ? 'System role — permissions cannot be edited.' : 'Click a box to grant or remove access.'}</div></div><button className="icon-btn" style={{ border: '1px solid var(--line)' }}><MoreHorizontal /></button></div>
        <div className="perm-table mt-4 table-scroll">
          <table>
            <thead><tr><th>Capability</th>{PERM_COLS.map((c) => <th key={c} style={{ textTransform: 'none', fontSize: 11.5 }}>{c}</th>)}</tr></thead>
            <tbody>
              {PERM_GROUPS.map(([g, items]) => (
                <React.Fragment key={g}>
                  <tr className="perm-group"><td colSpan={8}><span>{g}</span></td></tr>
                  {items.map(([n, d]) => <tr key={n}><td><div className="small">{n}</div><small>{d}</small></td>{cur[n].map((b, i) => <td key={i}><Check2 on={b} disabled={locked} onChange={() => flip(n, i)} /></td>)}</tr>)}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row mt-4" style={{ justifyContent: 'flex-end' }}><Button variant="outline" onClick={() => { setPerms({ ...perms, [role]: roleSeed(role) }); toast('Permissions reset'); }}>Reset</Button><Button onClick={() => toast(`${role} permissions saved`)}>Save Changes</Button></div>
      </div>
      <FormDrawer open={add} title="Add Role" onClose={() => setAdd(false)} fields={[{ k: 'n', label: 'Role name', ph: 'e.g. Sales Coordinator' }, { k: 'b', label: 'Start from', options: ['Agent', 'Manager', 'Marketing Coordinator'] }, { k: 'd', label: 'Description', area: true }]}
        onSave={(v) => { const n = v.n || 'New Role'; setRoles([...roles, [n, '0 members', v.d || 'Custom role', 'Draft']]); setPerms({ ...perms, [n]: roleSeed(v.b) }); setRole(n); setAdd(false); toast('Role created as draft'); }} />
    </Card>
  );
}

export function LeadRules() {
  const toast = useToast();
  const [r, setR] = useState({ rr: true, cap: true, stale: true, dup: true });
  return (
    <Card className="card-pad">
      <div className="card-title">Lead rules</div><div className="card-sub">Routing, capacity and hygiene rules applied to every new lead.</div>
      <div className="grid-2 mt-5">
        <Field label="Default routing"><Select options={['Round-robin within team', 'Manager assigns', 'Leave unassigned']} /></Field>
        <Field label="Default agent capacity"><Input type="number" defaultValue={25} /></Field>
        <Field label="Reassign if no contact within"><Select options={['24 hours', '48 hours', '72 hours']} /></Field>
        <Field label="Duplicate match on"><Select options={['Phone or email', 'Phone only', 'Email only']} /></Field>
      </div>
      <div className="mt-4">
        {[['rr', 'Round-robin assignment for imports'], ['cap', 'Block assignment at capacity'], ['stale', 'Flag leads with no activity for 7 days'], ['dup', 'Auto-merge exact duplicates']].map(([k, l]) => <div key={k} className="perm-row"><span>{l}</span><Toggle on={r[k]} onChange={(v) => setR({ ...r, [k]: v })} label={l} /></div>)}
      </div>
      <div className="row mt-5" style={{ justifyContent: 'flex-end' }}><Button onClick={() => toast('Lead rules saved')}>Save Changes</Button></div>
    </Card>
  );
}

export function AdminProfile() {
  const toast = useToast();
  return (
    <div className="stack">
      <Card className="between" style={{ padding: 18, flexWrap: 'wrap' }}>
        <div className="row" style={{ gap: 14 }}><Avatar name="Amina Durrani" size="lg" /><div><div className="row" style={{ gap: 8 }}><b style={{ fontSize: 18 }}>Amina Durrani</b><Badge tone="b-green" dot>Active</Badge></div><div className="small gold" style={{ marginTop: 4 }}>Administrator · Agent Module</div><div className="xs muted" style={{ marginTop: 4 }}>Full account access · Last updated 24 Sep 2026</div></div></div>
        <Button variant="outline" size="sm" onClick={() => toast('Photo picker opened')}><Camera />Change photo</Button>
      </Card>
      <div className="grid-2" style={{ alignItems: 'start' }}>
        <Card className="card-pad"><div className="strong">Personal & contact information</div><div className="xs muted" style={{ marginTop: 3 }}>Update the administrator's personal details and contact channels.</div>
          <div className="grid-2 mt-4"><Field label="First name"><Input defaultValue="Amina" /></Field><Field label="Last name"><Input defaultValue="Durrani" /></Field><Field label="Email address" hint="Verified work email"><Input defaultValue="amina.durrani@durraniestates.ae" /></Field><Field label="Phone number" hint="Primary contact number"><Input defaultValue="+971 50 482 7193" /></Field></div></Card>
        <Card className="card-pad"><div className="strong">Job & security</div><div className="xs muted" style={{ marginTop: 3 }}>Manage the role and internal organization details for this account.</div>
          <div className="grid-2 mt-4"><Field label="Job title"><Input defaultValue="CRM Administrator" /></Field><Field label="Department"><Select options={['Operations', 'Sales', 'Finance']} /></Field></div>
          <div className="perm-row mt-3"><div className="row"><span className="avatar sm" style={{ borderRadius: 8, background: 'var(--gold-50)', color: 'var(--gold)' }}><KeyRound size={14} /></span><div><div className="small strong">Password</div><div className="xs muted">Last changed 45 days ago</div></div></div><button className="link" onClick={() => toast('Password reset link sent')}>Change password</button></div></Card>
      </div>
      <div className="row" style={{ justifyContent: 'flex-end' }}><Button variant="outline">Cancel</Button><Button onClick={() => toast('Profile saved')}>Save changes</Button></div>
    </div>
  );
}
