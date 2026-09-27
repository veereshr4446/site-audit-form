# Site Audit Submission Form — JEF Techno, Bangalore

A mobile-first web form built for field engineers to submit site audit data
directly from their phones on-site, replacing manual/spreadsheet-based data
entry. Data flows straight into a shared Google Sheet, styled and structured
to match the company's existing audit tracker format.

Built independently by **Viresh R**, 3rd Semester, Rao Bahaddur
Mahabaleshwarappa Engineering College, Ballari — currently in active use by
the site audit team at JEF Techno, Bangalore.

---

## What it does

- Field engineers fill a structured 4-section form (Site Details, Team &
  Schedule, Status & Uploads, Location) on their phone at the audit site.
- Submissions are validated client-side (required fields, formats) before
  being sent.
- Each submission is appended as a new row to a private Google Sheet in
  real time — no manual re-typing from paper/WhatsApp notes into Excel.
- The sheet includes one-click tools (custom menu) to export all-or-selected
  entries as `.xlsx`, delete outdated rows, and keep formatting consistent
  automatically.
- Only the admin (sheet owner) can view or export the collected data —
  the public form never exposes other submissions.

## Why it was built

Previously, site audit data collection relied on **manually filled Excel
spreadsheets** — engineers would record details after the fact and type
them into a shared sheet. Per team feedback collected after one week of
using this tool, this old process took an estimated **2–3 hours per site**
and both surveyed team members reported having lost or forgotten details
under that method. This tool moves data collection to the point of work
(on-site, on the engineer's own phone) and removes the manual
transcription step entirely.

## Tech stack

- **Frontend:** HTML/CSS/JavaScript (split into index.html, styles.css,
  script.js), mobile-first responsive design, no build step or framework
  dependency — deployable as a static site.
- **Backend:** Google Apps Script (serverless), acting as a lightweight API
  that writes directly to Google Sheets.
- **Storage/Output:** Google Sheets — doubles as the live database and the
  admin-facing dashboard; exportable to Excel (`.xlsx`) on demand.
- **Hosting:** Deployed via [Vercel / GitHub Pages] as a public static site.

## Notable engineering decisions

- Chose Google Sheets + Apps Script over a traditional database to keep
  the system free, zero-maintenance, and usable by a non-technical admin
  (no server to manage, no hosting cost, familiar Excel-like interface for
  the person reviewing data).
- Designed the public form to expose **zero** administrative surface —
  submitters can only ever send data in, never read others' entries,
  addressing a real data-privacy requirement from the company.
- Built a custom in-sheet menu (Apps Script UI) so the non-technical admin
  can export/clean data without needing to know scripting or leave the
  Sheets interface.

---

## Real-world usage & impact

*(Collected via a short feedback survey of the JEF Techno team after one
week of live use — 27/09/2026. Numbers below are team-reported estimates,
not lab-measured, and are presented as such.)*

| Metric | Value | How it was measured |
|---|---|---|
| Number of engineers actively using the form | 10 | Reported by the team |
| Total audit entries submitted (Week 1) | 70 audits | Google Sheet row count |
| Old process | Manual Excel/spreadsheet entry | Team feedback (many respondents) |
| Errors / getting stuck — old Excel-based method | Occasional ("sometimes, weekly") | Team feedback |
| Estimated time per site — old process | ~2–3 hours | Team feedback (2 hrs, 3 hrs) |
| Lost/forgotten details under old method | Yes, reported by both surveyed respondents | Team feedback |
| Estimated time per site — new form | ~2 minutes | Team feedback |
| Easier to fill on phone vs. old method | Yes, described as "convenient" | Team feedback |
| Overall time-impact verdict | "Saves time" | Team feedback |
| One-sentence team summary | "Best." | Direct quote, survey respondent |

**Note on the time figures:** the ~2-3 hours reported for the old process
likely reflects the full round-trip of the previous workflow (recording
notes on-site, then transcribing into Excel later — not just typing speed),
compared to ~2 minutes filling the form directly on-site. These are
self-reported estimates from a small sample (many respondents for the timing
question), not independently timed — worth stating plainly if asked in an
interview, e.g.: *"Two team members estimated the old process took 2-3
hours per site including later transcription, versus about 2 minutes
filling the form directly on-site — a team-reported estimate, not a
controlled measurement."*

---

## Project links

- **Live form:** [jef-site-audit-form-l7we7mrov-veereshr4446s-projects.vercel.app](https://jef-site-audit-form-l7we7mrov-veereshr4446s-projects.vercel.app/)
- **Data backend:** Google Sheets + Apps Script (private)

## About the author

**Viresh R** — 2nd Semester, Computer Science Engineering, Rao Bahaddur Mahabaleshwarappa
Engineering College, Ballari. Self-taught in full-stack web development;
this project was built end-to-end independently, from requirements
gathering with the JEF Techno team through deployment and ongoing support.

- GitHub: [@veereshr4446](https://github.com/veereshr4446)
- LinkedIn: [Viresh R](https://linkedin.com/in/veeresh-r-4446)
