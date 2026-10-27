// Mock data for the prototype. Everything here is illustrative.

export const LEADS = [
  { id: 'LEAD-1023', name: 'Mayank Singh', phone: '+971 50 123 4567', email: 'mayank@example.com', temp: 'Cold', track: 'Property Sale', status: 'Follow up', req: 'AED 1.2M - 15.2M', owner: 'Archit Batham', team: 'Dubai Sales', city: 'Dubai', country: 'UAE', created: '30 Sep 2026', stage: 'Contacted' },
  { id: 'LEAD-2045', name: 'Sarah Johnson', phone: '+971 52 765 4321', email: 'sarah@example.com', temp: 'Warm', track: 'Property Sale', status: 'Review', req: 'AED 750K - 5.1M', owner: 'Sarah Khan', team: 'Dubai Sales', city: 'Dubai', country: 'UAE', created: '30 Sep 2026', stage: 'Qualified' },
  { id: 'LEAD-2046', name: 'Ali Ahmed', phone: '+971 55 987 6543', email: 'ali@example.com', temp: 'Hot', track: 'Property Sale', status: 'Meeting', req: 'AED 3.5M - 10M', owner: 'Omar Ali', team: 'Abu Dhabi Sales', city: 'Abu Dhabi', country: 'UAE', created: '30 Sep 2026', stage: 'Site Visit' },
  { id: 'LEAD-2047', name: 'Emma Wilson', phone: '+971 50 987 1111', email: 'emma@example.com', temp: 'Cold', track: 'Convertible Notes', status: 'Follow up', req: 'AED 920K - 4.2M', owner: 'Archit Batham', team: 'Dubai Sales', city: 'Sharjah', country: 'UAE', created: '29 Sep 2026', stage: 'Contacted' },
  { id: 'LEAD-2048', name: 'John Doe', phone: '+971 52 654 3210', email: 'john@example.com', temp: 'Warm', track: 'Secondary Market', status: 'Meeting', req: 'AED 2M - 8M', owner: 'Omar Ali', team: 'Abu Dhabi Sales', city: 'Dubai', country: 'UAE', created: '29 Sep 2026', stage: 'Negotiation' },
  { id: 'LEAD-2049', name: 'Lisa Ray', phone: '+971 55 321 9876', email: 'lisa@example.com', temp: 'Hot', track: 'Convertible Notes', status: 'Active', req: 'AED 1M - 6.5M', owner: 'Maya Patel', team: 'Mumbai Sales', city: 'Mumbai', country: 'India', created: '28 Sep 2026', stage: 'Qualified' },
  { id: 'LEAD-2050', name: 'David Chen', phone: '+971 55 441 2200', email: 'david@example.com', temp: 'Warm', track: 'Property Sale', status: 'Follow up', req: 'AED 1.4M - 4M', owner: 'Archit Batham', team: 'Dubai Sales', city: 'Dubai', country: 'UAE', created: '28 Sep 2026', stage: 'New' },
  { id: 'LEAD-2051', name: 'Nadia Khan', phone: '+971 50 112 8821', email: 'nadia@example.com', temp: 'Hot', track: 'Property Sale', status: 'New', req: 'AED 2M - 6M', owner: null, team: '—', city: 'Dubai', country: 'UAE', created: '30 Sep 2026', stage: 'New' },
];

export const PROJECTS = [
  { id: 'P-1011', name: 'Durrani Towers', city: 'Dubai, UAE', dev: 'Durrani Developments', price: 'AED 1.2M — 3.5M', types: ['1BR', '2BR', '3BR'], status: 'Under Construction', handover: 'Q4 2027', commission: '2.5%', plan: '60/40 payment plan · 1% monthly during construction', about: 'A 42-storey residential tower in Business Bay with canal views, a sky lounge and direct metro access.', amenities: ['Sky Lounge', 'Infinity Pool', 'Gym', 'Concierge'], units: [['U-2001', 'Studio', '450 sqft', 'AED 800,000', 'Available'], ['U-2002', '1 Bedroom', '720 sqft', 'AED 1,150,000', 'Available'], ['U-2003', '2 Bedroom', '1,050 sqft', 'AED 1,750,000', 'Reserved']] },
  { id: 'P-1012', name: 'Marina Views', city: 'Dubai, UAE', dev: 'Durrani Developments', price: 'AED 800K — 2.1M', types: ['Studio', '1BR', '2BR'], status: 'Near Completion', handover: 'Q2 2026', commission: '2.5%', plan: '1% monthly post-handover for 5 years', about: 'Contemporary marina-side living with glass balconies and direct access to the promenade.', amenities: ['Marina Walk Access', 'Rooftop Lounge', 'Co-working Space', 'Smart Home'], units: [['U-3101', 'Studio', '430 sqft', 'AED 800,000', 'Available'], ['U-3102', '1 Bedroom', '690 sqft', 'AED 1,150,000', 'Available'], ['U-3103', '2 Bedroom', '990 sqft', 'AED 1,950,000', 'Booked']] },
  { id: 'P-1013', name: 'Palm Residences', city: 'Dubai, UAE', dev: 'Palm Living Co.', price: 'AED 2.2M — 8.5M', types: ['2BR', '3BR', '4BR'], status: 'Ready', handover: 'Ready', commission: '2%', plan: '20% down · 80% on transfer', about: 'Beachfront apartments on the Palm Jumeirah crescent with private beach and resort amenities.', amenities: ['Private Beach', 'Spa', 'Kids Club', 'Valet'], units: [['U-4101', '2 Bedroom', '1,180 sqft', 'AED 2,400,000', 'Available'], ['U-4102', '3 Bedroom', '1,700 sqft', 'AED 4,250,000', 'Available']] },
  { id: 'P-1014', name: 'Durrani Villas', city: 'Abu Dhabi, UAE', dev: 'Durrani Developments', price: 'AED 3.5M — 7.2M', types: ['3BR', '4BR', '5BR'], status: 'Under Construction', handover: 'Q1 2028', commission: '3%', plan: '50/50 payment plan', about: 'Gated villa community on Saadiyat with landscaped parks and a community clubhouse.', amenities: ['Clubhouse', 'Parks', 'Private Garden', 'Security'], units: [['U-5101', '3 Bedroom', '2,600 sqft', 'AED 3,500,000', 'Available'], ['U-5102', '4 Bedroom', '3,200 sqft', 'AED 5,200,000', 'Available']] },
  { id: 'P-1015', name: 'Creek Heights', city: 'Dubai, UAE', dev: 'Emaar Partners', price: 'AED 1.1M — 2.9M', types: ['1BR', '2BR'], status: 'Near Completion', handover: 'Q3 2026', commission: '2%', plan: '10% down · 70% during construction', about: 'Twin towers on Dubai Creek Harbour with skyline views and a retail podium.', amenities: ['Retail Podium', 'Pool', 'Gym'], units: [['U-6101', '1 Bedroom', '780 sqft', 'AED 1,100,000', 'Available']] },
  { id: 'P-1016', name: 'Downtown Lofts', city: 'Dubai, UAE', dev: 'Durrani Developments', price: 'AED 1.6M — 4.4M', types: ['Studio', '1BR', '2BR'], status: 'Ready', handover: 'Ready', commission: '2.5%', plan: 'Cash or mortgage', about: 'Industrial-style lofts two minutes from Dubai Mall with double-height ceilings.', amenities: ['Rooftop Pool', 'Cinema Room', 'Gym'], units: [['U-7101', 'Studio', '520 sqft', 'AED 1,600,000', 'Available']] },
];

export const AGENTS = [
  { name: 'Archit Batham', id: 'AG-021', team: 'Dubai Sales', role: 'Agent', reports: 'Sarah Khan', leads: 25, cap: 25, follow: 9, bookings: 9, revenue: 'AED 3.1M', target: 118, status: 'Active' },
  { name: 'Sarah Khan', id: 'AG-012', team: 'Dubai Sales', role: 'Manager', reports: 'Admin', leads: 18, cap: 25, follow: 7, bookings: 12, revenue: 'AED 4.2M', target: 124, status: 'Active' },
  { name: 'Omar Ali', id: 'AG-034', team: 'Abu Dhabi Sales', role: 'Agent', reports: 'David Ahmed', leads: 11, cap: 20, follow: 4, bookings: 7, revenue: 'AED 2.4M', target: 102, status: 'Active' },
  { name: 'Maya Patel', id: 'AG-041', team: 'Mumbai Sales', role: 'Agent', reports: 'Neha Shah', leads: 20, cap: 20, follow: 6, bookings: 3, revenue: 'AED 980K', target: 71, status: 'Pending Invite' },
  { name: 'David Ahmed', id: 'AG-008', team: 'Abu Dhabi Sales', role: 'Manager', reports: 'Admin', leads: 48, cap: 60, follow: 11, bookings: 6, revenue: 'AED 3.3M', target: 96, status: 'Active' },
];

export const TEAM = [
  { name: 'Archit Batham', id: 'AG-021', leads: 24, hot: 6, follow: 8, bookings: 4, revenue: 'AED 3.1M', target: 118 },
  { name: 'Neha Sharma', id: 'AG-034', leads: 31, hot: 8, follow: 11, bookings: 6, revenue: 'AED 4.2M', target: 126 },
  { name: 'Rahul Mehta', id: 'AG-018', leads: 19, hot: 3, follow: 5, bookings: 3, revenue: 'AED 2.4M', target: 92 },
  { name: 'Aarav Shah', id: 'AG-041', leads: 14, hot: 2, follow: 3, bookings: 1, revenue: 'AED 980K', target: 71 },
];

export const BOOKINGS = [
  { id: 'BKG-10021', customer: 'Sarah Johnson', project: 'Marina Views', unit: 'U-3102', price: 'AED 1,150,000', short: 'AED 1.15M', discount: 'AED 50K', agent: 'Archit Batham', manager: 'Sarah Khan', status: 'Pending Admin', docs: '1 uploaded · 2 pending' },
  { id: 'BKG-10018', customer: 'Ali Ahmed', project: 'Palm Residences', unit: 'U-4101', price: 'AED 2,400,000', short: 'AED 2.4M', discount: 'AED 100K', agent: 'Rahul Mehta', manager: 'Neha Shah', status: 'Approved', docs: '3 uploaded' },
  { id: 'BKG-10014', customer: 'Mayank Singh', project: 'Durrani Towers', unit: 'U-2003', price: 'AED 1,750,000', short: 'AED 1.75M', discount: 'AED 75K', agent: 'Neha Sharma', manager: 'David Ahmed', status: 'Pending Admin', docs: '2 uploaded · 1 pending' },
  { id: 'BKG-10009', customer: 'Lisa Ray', project: 'CN Growth Plan', unit: '—', price: 'AED 1,200,000', short: 'AED 1.2M', discount: '—', agent: 'Archit Batham', manager: 'Sarah Khan', status: 'Rejected', docs: '3 uploaded' },
];

export const CN = [
  { lead: 'Emma Wilson', stage: 'Qualified', status: 'Active', amount: 'AED 920K', timeline: '3 months', owner: 'Archit', next: 'Follow-up' },
  { lead: 'Lisa Ray', stage: 'Admin Review', status: 'Waiting for Admin', amount: 'AED 1M', timeline: '6 months', owner: 'Sarah', next: 'Admin review' },
  { lead: 'David Chen', stage: 'Information Shared', status: 'Follow-up Required', amount: 'AED 2M', timeline: '12 months', owner: 'Omar', next: 'Call' },
];
export const CN_STAGES = ['New', 'Contacted', 'Qualified', 'Information Shared', 'Interested', 'Documents/Review', 'Admin Review', 'Proceeding', 'Completed', 'Closed'];

export const SECONDARY = [
  { ref: 'SM-101', type: 'Buyer', who: 'John Doe', property: 'Dubai Hills', price: 'AED 2M – 8M', status: 'Matched', agent: 'Neha Sharma', last: 'Today 11:20' },
  { ref: 'SM-102', type: 'Seller', who: 'Samantha Lee', property: 'Marina Views · 2BR', price: 'AED 2.2M', status: 'Available', agent: 'Archit Batham', last: 'Today 10:40' },
  { ref: 'SM-103', type: 'Buyer', who: 'Michael Chen', property: 'Palm Residences', price: 'AED 4M – 6M', status: 'Follow-up', agent: 'Rahul Mehta', last: 'Yesterday' },
  { ref: 'SM-104', type: 'Seller', who: 'Nadia Ali', property: 'Durrani Towers · 1802', price: 'AED 3.8M', status: 'Pending Review', agent: 'Aarav Shah', last: 'Yesterday' },
];

export const ATTENDANCE_LOG = [
  ['Sep 23 2026', '09:30 AM', '07:00', 'Present'], ['Sep 24 2026', '10:00 AM', '06:45', 'Absent'], ['Sep 25 2026', '11:15 AM', '07:30', 'Late Arrived'],
  ['Sep 26 2026', '08:45 AM', '08:00', 'Miss punch'], ['Sep 27 2026', '09:00 AM', '06:30', 'Early Leave'], ['Sep 28 2026', '10:30 AM', '07:15', 'Leave'],
  ['Sep 29 2026', '09:15 AM', '07:45', 'Present'], ['Oct 01 2026', '09:15 AM', '07:45', 'Present'], ['Oct 02 2026', '09:15 AM', '07:45', 'Late Arrived'],
];

export const NOTIFICATIONS = [
  { t: 'Booking approved', d: 'BKG-10018 · Palm Residences U-4101 was approved by Admin.', time: '10 min ago', fresh: true, icon: 'check' },
  { t: 'Follow-up due', d: 'Mayank Singh (LEAD-1023) follow-up is due at 2:00 PM today.', time: '35 min ago', fresh: true, icon: 'clock' },
  { t: 'New lead assigned', d: 'Nadia Khan (LEAD-2051) has been assigned to you by Sarah Khan.', time: '2 hours ago', icon: 'user' },
  { t: 'Leave request approved', d: 'Your annual leave for Oct 4 – Oct 5 has been approved.', time: 'Yesterday', icon: 'calendar' },
  { t: 'Document pending', d: 'BKG-10021 still needs Proof of Address and a signed booking form.', time: 'Yesterday', icon: 'file' },
];

export const AUDIT = [
  ['10:42 AM', 'Admin User', 'Approved booking', 'BKG-10012', 'Palm Residences · U-4101', 'Admin'],
  ['10:24 AM', 'Admin User', 'Reassigned lead', 'LEAD-2048', 'Sarah Khan → Omar Ali', 'Admin'],
  ['09:51 AM', 'Sarah Khan', 'Created lead', 'LEAD-2051', 'Nadia Khan', 'Manager'],
  ['09:34 AM', 'Admin User', 'Approved document', 'DOC-8821', 'SPA · Marina Views', 'Admin'],
  ['09:12 AM', 'Archit Batham', 'Submitted booking', 'BKG-10021', 'Marina Views · U-3102', 'Agent'],
  ['Yesterday', 'Neha Sharma', 'Imported leads', 'IMP-0930', 'Meta Leads · 284 rows', 'Manager'],
];

export const tempTone = (t) => ({ Hot: 'b-red', Warm: 'b-gold', Cold: 'b-blue' }[t] || '');
export const statusTone = (s) => {
  const v = (s || '').toLowerCase();
  if (/(approved|present|active|available|completed|complete|enabled|uploaded|won|matched)/.test(v)) return 'b-green';
  if (/(rejected|absent|at capacity|unassigned|lost|overdue)/.test(v)) return 'b-red';
  if (/(pending|review|late|waiting|draft|on leave|allowed|follow)/.test(v)) return 'b-gold';
  return '';
};
export const initials = (n = '') => n.split(' ').map((x) => x[0]).join('').slice(0, 2).toUpperCase();
