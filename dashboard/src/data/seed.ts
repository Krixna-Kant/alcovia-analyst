// Dummy set shaped to the brief. 20 Alcovians, 2.15 min average,
// Realm strongest this week, Focus used properly by 5, 1 WHOOP.
// Not live Alcovia data.

export const AS_OF = '2026-10-23'
export const CPQL_TARGET = 3000

export type Alcovian = {
  id: string
  name: string
  grade: number
  advisor: 'Rhea' | 'Arjun'
  joined: string
  city: string
  lastOpen: string
  realm: boolean
  focusOpened: boolean
  focusRegular: boolean
  whoop: boolean
  syllabusOpened: boolean
  syllabusThisWeek: boolean
  streak: boolean
  rankings: boolean
  goalDone: boolean
  plan: 'trial_3m' | 'full_program'
  renewal: string | null
  monthlyFee: number
}

export const alcovians: Alcovian[] = [
  { id: 'a01', name: 'Aanya Kapoor', grade: 9, advisor: 'Rhea', joined: '2026-05-12', city: 'Gurugram', lastOpen: '2026-10-23', realm: true, focusOpened: true, focusRegular: true, whoop: true, syllabusOpened: true, syllabusThisWeek: true, streak: false, rankings: false, goalDone: true, plan: 'full_program', renewal: null, monthlyFee: 40000 },
  { id: 'a02', name: 'Kabir Malhotra', grade: 8, advisor: 'Rhea', joined: '2026-06-03', city: 'Delhi', lastOpen: '2026-10-22', realm: true, focusOpened: true, focusRegular: true, whoop: false, syllabusOpened: true, syllabusThisWeek: false, streak: false, rankings: true, goalDone: false, plan: 'full_program', renewal: null, monthlyFee: 40000 },
  { id: 'a03', name: 'Myra Singh', grade: 10, advisor: 'Arjun', joined: '2026-04-18', city: 'Noida', lastOpen: '2026-10-23', realm: true, focusOpened: true, focusRegular: true, whoop: false, syllabusOpened: true, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'trial_3m', renewal: '2026-11-12', monthlyFee: 30000 },
  { id: 'a04', name: 'Vivaan Shah', grade: 7, advisor: 'Rhea', joined: '2026-07-21', city: 'Gurugram', lastOpen: '2026-10-21', realm: true, focusOpened: true, focusRegular: true, whoop: false, syllabusOpened: true, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'full_program', renewal: null, monthlyFee: 40000 },
  { id: 'a05', name: 'Anaya Reddy', grade: 9, advisor: 'Arjun', joined: '2026-05-28', city: 'Delhi', lastOpen: '2026-10-22', realm: true, focusOpened: true, focusRegular: true, whoop: false, syllabusOpened: true, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'trial_3m', renewal: '2026-11-04', monthlyFee: 30000 },
  { id: 'a06', name: 'Ishaan Mehta', grade: 8, advisor: 'Rhea', joined: '2026-08-02', city: 'Faridabad', lastOpen: '2026-10-20', realm: true, focusOpened: true, focusRegular: false, whoop: false, syllabusOpened: true, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'trial_3m', renewal: '2026-11-18', monthlyFee: 30000 },
  { id: 'a07', name: 'Kiara Bansal', grade: 10, advisor: 'Arjun', joined: '2026-03-14', city: 'Gurugram', lastOpen: '2026-10-21', realm: true, focusOpened: true, focusRegular: false, whoop: false, syllabusOpened: true, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'full_program', renewal: null, monthlyFee: 40000 },
  { id: 'a08', name: 'Reyansh Gupta', grade: 6, advisor: 'Rhea', joined: '2026-09-01', city: 'Delhi', lastOpen: '2026-10-19', realm: true, focusOpened: true, focusRegular: false, whoop: false, syllabusOpened: true, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'trial_3m', renewal: '2026-12-01', monthlyFee: 30000 },
  { id: 'a09', name: 'Sara Khanna', grade: 9, advisor: 'Arjun', joined: '2026-06-20', city: 'Noida', lastOpen: '2026-10-23', realm: true, focusOpened: true, focusRegular: false, whoop: false, syllabusOpened: true, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'full_program', renewal: null, monthlyFee: 40000 },
  { id: 'a10', name: 'Advait Nair', grade: 8, advisor: 'Rhea', joined: '2026-07-08', city: 'Gurugram', lastOpen: '2026-10-18', realm: true, focusOpened: true, focusRegular: false, whoop: false, syllabusOpened: true, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'full_program', renewal: null, monthlyFee: 40000 },
  { id: 'a11', name: 'Diya Joshi', grade: 7, advisor: 'Arjun', joined: '2026-08-16', city: 'Delhi', lastOpen: '2026-10-20', realm: true, focusOpened: true, focusRegular: false, whoop: false, syllabusOpened: false, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'trial_3m', renewal: '2026-11-16', monthlyFee: 30000 },
  { id: 'a12', name: 'Neil Chopra', grade: 10, advisor: 'Arjun', joined: '2026-04-02', city: 'Gurugram', lastOpen: '2026-10-17', realm: true, focusOpened: false, focusRegular: false, whoop: false, syllabusOpened: false, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'full_program', renewal: null, monthlyFee: 40000 },
  { id: 'a13', name: 'Zara Ahmed', grade: 9, advisor: 'Rhea', joined: '2026-05-05', city: 'Delhi', lastOpen: '2026-10-22', realm: true, focusOpened: false, focusRegular: false, whoop: false, syllabusOpened: false, syllabusThisWeek: false, streak: true, rankings: false, goalDone: false, plan: 'full_program', renewal: null, monthlyFee: 40000 },
  { id: 'a14', name: 'Harsh Vardhan', grade: 8, advisor: 'Arjun', joined: '2026-06-11', city: 'Noida', lastOpen: '2026-10-06', realm: false, focusOpened: false, focusRegular: false, whoop: false, syllabusOpened: false, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'trial_3m', renewal: '2026-12-11', monthlyFee: 30000 },
  { id: 'a15', name: 'Meher Gill', grade: 6, advisor: 'Rhea', joined: '2026-09-08', city: 'Gurugram', lastOpen: '2026-10-04', realm: false, focusOpened: false, focusRegular: false, whoop: false, syllabusOpened: false, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'trial_3m', renewal: '2026-12-08', monthlyFee: 30000 },
  { id: 'a16', name: 'Yash Taneja', grade: 10, advisor: 'Arjun', joined: '2026-03-22', city: 'Delhi', lastOpen: '2026-09-28', realm: false, focusOpened: false, focusRegular: false, whoop: false, syllabusOpened: false, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'full_program', renewal: null, monthlyFee: 40000 },
  { id: 'a17', name: 'Pia Desai', grade: 7, advisor: 'Rhea', joined: '2026-08-25', city: 'Faridabad', lastOpen: '2026-10-02', realm: false, focusOpened: false, focusRegular: false, whoop: false, syllabusOpened: false, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'trial_3m', renewal: '2026-11-25', monthlyFee: 30000 },
  { id: 'a18', name: 'Rohan Iyer', grade: 9, advisor: 'Arjun', joined: '2026-04-30', city: 'Gurugram', lastOpen: '2026-09-22', realm: false, focusOpened: false, focusRegular: false, whoop: false, syllabusOpened: false, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'full_program', renewal: null, monthlyFee: 40000 },
  { id: 'a19', name: 'Anvi Kulkarni', grade: 8, advisor: 'Rhea', joined: '2026-07-14', city: 'Delhi', lastOpen: '2026-10-07', realm: false, focusOpened: false, focusRegular: false, whoop: false, syllabusOpened: false, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'trial_3m', renewal: '2026-12-14', monthlyFee: 30000 },
  { id: 'a20', name: 'Samarth Bhatia', grade: 10, advisor: 'Arjun', joined: '2026-05-19', city: 'Noida', lastOpen: '2026-09-30', realm: false, focusOpened: false, focusRegular: false, whoop: false, syllabusOpened: false, syllabusThisWeek: false, streak: false, rankings: false, goalDone: false, plan: 'full_program', renewal: null, monthlyFee: 40000 },
]

export type MonthRev = {
  month: string
  label: string
  target: number
  trial: number
  full: number
  workshop: number
  unpaid: number
  onboarded: number
  workshopSeats: number
}

export const monthlyRevenue: MonthRev[] = [
  { month: '2026-08-01', label: 'Aug', target: 650000, trial: 90000, full: 240000, workshop: 47988, unpaid: 40000, onboarded: 3, workshopSeats: 12 },
  { month: '2026-09-01', label: 'Sep', target: 750000, trial: 150000, full: 280000, workshop: 115971, unpaid: 30000, onboarded: 4, workshopSeats: 29 },
  { month: '2026-10-01', label: 'Oct', target: 800000, trial: 180000, full: 320000, workshop: 71982, unpaid: 70000, onboarded: 4, workshopSeats: 18 },
]

export type FunnelMonth = {
  month: string
  leads: number
  organic: number
  qualified: number
  discoverySet: number
  discoveryDone: number
  ambitionDone: number
  architectDone: number
  enrolled: number
  dropped: number
  avgJourneyDays: number
  spend: number
}

export const funnelByMonth: FunnelMonth[] = [
  { month: '2026-08-01', leads: 140, organic: 18, qualified: 32, discoverySet: 22, discoveryDone: 14, ambitionDone: 10, architectDone: 6, enrolled: 3, dropped: 21, avgJourneyDays: 19.4, spend: 95000 },
  { month: '2026-09-01', leads: 165, organic: 24, qualified: 38, discoverySet: 26, discoveryDone: 18, ambitionDone: 13, architectDone: 8, enrolled: 4, dropped: 24, avgJourneyDays: 17.8, spend: 110000 },
  { month: '2026-10-01', leads: 180, organic: 21, qualified: 42, discoverySet: 28, discoveryDone: 19, ambitionDone: 14, architectDone: 9, enrolled: 4, dropped: 26, avgJourneyDays: 16.2, spend: 128000 },
]

export type Campaign = {
  id: string
  type: 'program' | 'workshop'
  spend: number
  qualified: number
  enrolled: number
  impressions: number
  clicks: number
  frequency: number
}

export const campaigns: Campaign[] = [
  { id: 'program_ambition_q3', type: 'program', spend: 142000, qualified: 58, enrolled: 7, impressions: 980000, clicks: 17640, frequency: 1.8 },
  { id: 'program_parent_fear', type: 'program', spend: 98000, qualified: 28, enrolled: 3, impressions: 720000, clicks: 7920, frequency: 2.4 },
  { id: 'workshop_sat_sim', type: 'workshop', spend: 64000, qualified: 19, enrolled: 1, impressions: 540000, clicks: 5940, frequency: 3.4 },
  { id: 'workshop_career_reel', type: 'workshop', spend: 29000, qualified: 7, enrolled: 0, impressions: 310000, clicks: 2170, frequency: 2.1 },
]

export type Creative = {
  id: string
  campaign: string
  type: 'program' | 'workshop'
  name: string
  impressions: number
  clicks: number
  frequency: number
  spend: number
}

export const creatives: Creative[] = [
  { id: 'cr_amb_pod', campaign: 'program_ambition_q3', type: 'program', name: 'Podcast cut — "ask the founder"', impressions: 410000, clicks: 9020, frequency: 1.6, spend: 62000 },
  { id: 'cr_amb_map', campaign: 'program_ambition_q3', type: 'program', name: 'Roadmap on a table', impressions: 570000, clicks: 8620, frequency: 2.0, spend: 80000 },
  { id: 'cr_fear_marks', campaign: 'program_parent_fear', type: 'program', name: 'Marks are not the map', impressions: 390000, clicks: 5070, frequency: 2.2, spend: 54000 },
  { id: 'cr_fear_scroll', campaign: 'program_parent_fear', type: 'program', name: 'Parent testimonial scroll', impressions: 330000, clicks: 2850, frequency: 2.7, spend: 44000 },
  { id: 'cr_ws_room', campaign: 'workshop_sat_sim', type: 'workshop', name: 'Saturday room, 30 people', impressions: 300000, clicks: 3900, frequency: 3.6, spend: 38000 },
  { id: 'cr_ws_pitch', campaign: 'workshop_sat_sim', type: 'workshop', name: 'Teen pitching a chef', impressions: 240000, clicks: 2040, frequency: 3.2, spend: 26000 },
  { id: 'cr_reel_day', campaign: 'workshop_career_reel', type: 'workshop', name: 'A day in product', impressions: 180000, clicks: 1620, frequency: 1.9, spend: 16000 },
  { id: 'cr_reel_old', campaign: 'workshop_career_reel', type: 'workshop', name: 'Old carousel — "unlock potential"', impressions: 130000, clicks: 550, frequency: 2.4, spend: 13000 },
]

export type Landing = {
  page: string
  visits: number
  bounces: number
  loadMs: number
}

export const landings: Landing[] = [
  { page: '/program', visits: 8420, bounces: 4120, loadMs: 1680 },
  { page: '/workshop', visits: 5110, bounces: 3480, loadMs: 1420 },
  { page: '/apply', visits: 1960, bounces: 980, loadMs: 3410 },
]

export const unpaidInvoices = [
  { who: 'Myra Singh · trial', amount: 30000, issued: '2026-10-08', days: 15 },
  { who: 'Anaya Reddy · trial', amount: 30000, issued: '2026-10-12', days: 11 },
  { who: 'Parent · workshop overflow', amount: 10000, issued: '2026-10-18', days: 5 },
]

export type ProgramEvent = {
  id: string
  kind: string
  title: string
  on: string
  conducted: boolean
  attended: number
  invited: number
  rating: number | null
}

export const programEvents: ProgramEvent[] = [
  { id: 'e01', kind: 'workshop', title: 'Product — a day in the life', on: '2026-08-16', conducted: true, attended: 16, invited: 20, rating: 4.4 },
  { id: 'e02', kind: 'workshop', title: 'Chef room simulation', on: '2026-08-30', conducted: true, attended: 15, invited: 19, rating: 4.6 },
  { id: 'e03', kind: 'workshop', title: 'Venture desk', on: '2026-09-13', conducted: true, attended: 17, invited: 20, rating: 4.2 },
  { id: 'e04', kind: 'workshop', title: 'Design sprint', on: '2026-09-27', conducted: true, attended: 14, invited: 20, rating: 4.1 },
  { id: 'e05', kind: 'workshop', title: 'Media newsroom', on: '2026-10-11', conducted: true, attended: 16, invited: 20, rating: 4.5 },
  { id: 'e06', kind: 'workshop', title: 'Public policy table', on: '2026-10-25', conducted: false, attended: 0, invited: 20, rating: null },
  { id: 'e07', kind: 'pod', title: 'Pod — Fear & vulnerabilities', on: '2026-09-20', conducted: true, attended: 5, invited: 5, rating: 4.8 },
  { id: 'e08', kind: 'pod', title: 'Pod — Dreams', on: '2026-10-18', conducted: true, attended: 5, invited: 5, rating: 4.7 },
  { id: 'e09', kind: 'mentor', title: 'Mentor calls (Oct)', on: '2026-10-15', conducted: true, attended: 11, invited: 20, rating: 4.3 },
  { id: 'e10', kind: 'peer', title: 'Peer sessions (Oct)', on: '2026-10-12', conducted: true, attended: 8, invited: 12, rating: 4.0 },
  { id: 'e11', kind: 'branding', title: 'Personal branding shoot', on: '2026-10-04', conducted: true, attended: 6, invited: 6, rating: 4.6 },
  { id: 'e12', kind: 'parent_child', title: 'Q2 parent-child workshop', on: '2026-09-07', conducted: true, attended: 14, invited: 18, rating: 4.4 },
  { id: 'e13', kind: 'podcast', title: 'Podcast — Madhav Seth', on: '2026-08-23', conducted: true, attended: 4, invited: 4, rating: 4.9 },
]

export const homeCards = [
  { card: 'focus_score', shown: 1840, tapped: 210 },
  { card: 'realm_nudge', shown: 1620, tapped: 486 },
  { card: 'exams', shown: 980, tapped: 88 },
  { card: 'syllabus_pace', shown: 1540, tapped: 62 },
  { card: 'sessions', shown: 1100, tapped: 71 },
  { card: 'calendar', shown: 900, tapped: 45 },
  { card: 'wellness', shown: 720, tapped: 18 },
  { card: 'nudges', shown: 640, tapped: 39 },
]

export const featureOpens45 = [
  { area: 'Home', feature: 'Home dashboard', opened: 20, thisWeek: 13 },
  { area: 'Home', feature: 'Daily login / coins', opened: 18, thisWeek: 11 },
  { area: 'Focus & game', feature: 'The Realm', opened: 13, thisWeek: 13 },
  { area: 'Focus & game', feature: 'Focus Timer', opened: 11, thisWeek: 5 },
  { area: 'Focus & game', feature: 'Dragons', opened: 12, thisWeek: 9 },
  { area: 'Focus & game', feature: 'AlcoCoins & Streak', opened: 8, thisWeek: 1 },
  { area: 'Focus & game', feature: 'Rankings', opened: 6, thisWeek: 1 },
  { area: 'Study', feature: 'Syllabus', opened: 10, thisWeek: 1 },
  { area: 'Study', feature: 'Exams', opened: 7, thisWeek: 2 },
  { area: 'Study', feature: 'Attendance', opened: 6, thisWeek: 1 },
  { area: 'Study', feature: 'Study Planner', opened: 4, thisWeek: 0 },
  { area: 'Study', feature: 'Academic history', opened: 3, thisWeek: 0 },
  { area: 'Plan', feature: 'Tasks', opened: 12, thisWeek: 6 },
  { area: 'Plan', feature: 'Goals & Roadmap', opened: 8, thisWeek: 1 },
  { area: 'Plan', feature: 'Mentor sessions', opened: 9, thisWeek: 3 },
  { area: 'Plan', feature: 'Calendar', opened: 7, thisWeek: 2 },
  { area: 'Wellness', feature: 'Wellness dashboard', opened: 13, thisWeek: 2 },
  { area: 'Wellness', feature: 'WHOOP connect', opened: 1, thisWeek: 1 },
]

export const focusWeeks = [
  { week: 'Sep 8', active: 9, sessions: 22, fromTask: 18, minutes: 410 },
  { week: 'Sep 15', active: 11, sessions: 28, fromTask: 21, minutes: 490 },
  { week: 'Sep 22', active: 10, sessions: 24, fromTask: 20, minutes: 430 },
  { week: 'Sep 29', active: 12, sessions: 31, fromTask: 19, minutes: 520 },
  { week: 'Oct 6', active: 11, sessions: 26, fromTask: 22, minutes: 470 },
  { week: 'Oct 13', active: 13, sessions: 34, fromTask: 24, minutes: 610 },
  { week: 'Oct 20', active: 11, sessions: 21, fromTask: 23, minutes: 380 },
]

export const softSkillAvg = [
  { skill: 'Engagement', score: 3.8 },
  { skill: 'Team work', score: 3.6 },
  { skill: 'Crisis management', score: 3.1 },
  { skill: 'Adaptability', score: 3.4 },
  { skill: 'Public speaking', score: 2.9 },
  { skill: 'Listening', score: 3.7 },
  { skill: 'Problem solving', score: 3.5 },
  { skill: 'Leadership', score: 3.0 },
  { skill: 'Empathy', score: 3.9 },
  { skill: 'Time use', score: 2.8 },
  { skill: 'Presence', score: 3.3 },
]

export type StudentRow = {
  id: string
  focusMin: number
  appMinAvg: number
  quiz: number | null
  quizTaken: number
  overdue: number
  tasksDone: number
  tasks: number
  readiness: number
  syllabusOnTrack: boolean
  lastWorkshop: number | null
  careerRoadmap: boolean
  personalDone: number
  personalTotal: number
}

// Per-Alcovian operating numbers for the last 45 days. Quiet teens stay thin on purpose.
export const studentOps: Record<string, StudentRow> = {
  a01: { id: 'a01', focusMin: 186, appMinAvg: 11.4, quiz: 7.2, quizTaken: 18, overdue: 1, tasksDone: 22, tasks: 28, readiness: 3.4, syllabusOnTrack: true, lastWorkshop: 4, careerRoadmap: true, personalDone: 2, personalTotal: 3 },
  a02: { id: 'a02', focusMin: 142, appMinAvg: 8.1, quiz: 6.4, quizTaken: 15, overdue: 2, tasksDone: 18, tasks: 26, readiness: 2.8, syllabusOnTrack: true, lastWorkshop: 5, careerRoadmap: true, personalDone: 1, personalTotal: 3 },
  a03: { id: 'a03', focusMin: 168, appMinAvg: 9.6, quiz: 8.1, quizTaken: 20, overdue: 0, tasksDone: 24, tasks: 27, readiness: 3.8, syllabusOnTrack: true, lastWorkshop: 4, careerRoadmap: true, personalDone: 3, personalTotal: 3 },
  a04: { id: 'a04', focusMin: 121, appMinAvg: 6.8, quiz: 5.9, quizTaken: 12, overdue: 3, tasksDone: 14, tasks: 24, readiness: 2.1, syllabusOnTrack: false, lastWorkshop: 4, careerRoadmap: false, personalDone: 1, personalTotal: 3 },
  a05: { id: 'a05', focusMin: 154, appMinAvg: 7.9, quiz: 6.8, quizTaken: 16, overdue: 1, tasksDone: 19, tasks: 25, readiness: 3.1, syllabusOnTrack: true, lastWorkshop: 3, careerRoadmap: true, personalDone: 2, personalTotal: 3 },
  a06: { id: 'a06', focusMin: 48, appMinAvg: 3.2, quiz: 5.1, quizTaken: 9, overdue: 4, tasksDone: 9, tasks: 22, readiness: 1.6, syllabusOnTrack: false, lastWorkshop: 4, careerRoadmap: false, personalDone: 0, personalTotal: 3 },
  a07: { id: 'a07', focusMin: 36, appMinAvg: 2.8, quiz: 7.0, quizTaken: 14, overdue: 2, tasksDone: 12, tasks: 20, readiness: 2.4, syllabusOnTrack: true, lastWorkshop: 5, careerRoadmap: true, personalDone: 2, personalTotal: 3 },
  a08: { id: 'a08', focusMin: 22, appMinAvg: 2.1, quiz: 4.2, quizTaken: 7, overdue: 5, tasksDone: 6, tasks: 18, readiness: 1.2, syllabusOnTrack: false, lastWorkshop: 3, careerRoadmap: false, personalDone: 0, personalTotal: 2 },
  a09: { id: 'a09', focusMin: 41, appMinAvg: 3.4, quiz: 6.1, quizTaken: 11, overdue: 2, tasksDone: 11, tasks: 19, readiness: 2.0, syllabusOnTrack: false, lastWorkshop: 4, careerRoadmap: true, personalDone: 1, personalTotal: 3 },
  a10: { id: 'a10', focusMin: 29, appMinAvg: 2.6, quiz: 5.5, quizTaken: 8, overdue: 3, tasksDone: 8, tasks: 17, readiness: 1.8, syllabusOnTrack: false, lastWorkshop: 4, careerRoadmap: false, personalDone: 1, personalTotal: 3 },
  a11: { id: 'a11', focusMin: 18, appMinAvg: 1.9, quiz: 4.8, quizTaken: 6, overdue: 4, tasksDone: 5, tasks: 16, readiness: 1.1, syllabusOnTrack: false, lastWorkshop: 3, careerRoadmap: false, personalDone: 0, personalTotal: 2 },
  a12: { id: 'a12', focusMin: 0, appMinAvg: 1.4, quiz: 6.6, quizTaken: 10, overdue: 3, tasksDone: 7, tasks: 15, readiness: 2.2, syllabusOnTrack: true, lastWorkshop: 4, careerRoadmap: true, personalDone: 1, personalTotal: 3 },
  a13: { id: 'a13', focusMin: 0, appMinAvg: 4.8, quiz: 5.4, quizTaken: 9, overdue: 2, tasksDone: 8, tasks: 14, readiness: 1.5, syllabusOnTrack: false, lastWorkshop: 5, careerRoadmap: true, personalDone: 2, personalTotal: 3 },
  a14: { id: 'a14', focusMin: 0, appMinAvg: 0.4, quiz: 3.1, quizTaken: 3, overdue: 6, tasksDone: 2, tasks: 12, readiness: 0.8, syllabusOnTrack: false, lastWorkshop: 2, careerRoadmap: false, personalDone: 0, personalTotal: 2 },
  a15: { id: 'a15', focusMin: 0, appMinAvg: 0.3, quiz: null, quizTaken: 1, overdue: 4, tasksDone: 1, tasks: 10, readiness: 0.4, syllabusOnTrack: false, lastWorkshop: 3, careerRoadmap: false, personalDone: 0, personalTotal: 2 },
  a16: { id: 'a16', focusMin: 0, appMinAvg: 0.2, quiz: 5.0, quizTaken: 4, overdue: 5, tasksDone: 3, tasks: 11, readiness: 1.9, syllabusOnTrack: false, lastWorkshop: 4, careerRoadmap: true, personalDone: 1, personalTotal: 3 },
  a17: { id: 'a17', focusMin: 0, appMinAvg: 0.5, quiz: 3.8, quizTaken: 2, overdue: 5, tasksDone: 2, tasks: 11, readiness: 0.6, syllabusOnTrack: false, lastWorkshop: 2, careerRoadmap: false, personalDone: 0, personalTotal: 2 },
  a18: { id: 'a18', focusMin: 0, appMinAvg: 0.2, quiz: 4.4, quizTaken: 3, overdue: 7, tasksDone: 1, tasks: 13, readiness: 1.4, syllabusOnTrack: false, lastWorkshop: 3, careerRoadmap: false, personalDone: 0, personalTotal: 3 },
  a19: { id: 'a19', focusMin: 0, appMinAvg: 0.6, quiz: 4.0, quizTaken: 2, overdue: 4, tasksDone: 3, tasks: 10, readiness: 0.9, syllabusOnTrack: false, lastWorkshop: 3, careerRoadmap: false, personalDone: 0, personalTotal: 2 },
  a20: { id: 'a20', focusMin: 0, appMinAvg: 0.3, quiz: 5.8, quizTaken: 5, overdue: 4, tasksDone: 4, tasks: 12, readiness: 2.0, syllabusOnTrack: true, lastWorkshop: 4, careerRoadmap: true, personalDone: 1, personalTotal: 3 },
}

export const APP_AVG_MINUTES = 2.15
export const APP_TARGET_MINUTES = 30
