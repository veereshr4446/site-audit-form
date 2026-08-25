# Site Audit Form · Google Sheets Backend

A web-based site audit form that sends data directly to Google Sheets via Apps Script, with Excel export and row management features.

---

## Overview

This project replaces manual Excel reporting with a structured web form. Engineering teams can submit site audit data, which is automatically appended to a Google Sheet. The sheet includes custom menus for exporting data to Excel and managing rows.

---

## Features

| Feature | Description |
|---------|-------------|
| Multi-step form | 4 sections with progress tracking (Site → Team → Status → Location) |
| Form validation | Required fields checked before submission |
| Google Sheets sync | Data appended directly to your sheet via Apps Script |
| Auto-formatting | Yellow header row, light blue data rows, checkboxes in column A |
| Excel export | Download all rows or only selected rows as `.xlsx` |
| Row management | Delete selected rows via checkbox |
| Sheet menu | Custom "Site Audit Tools" menu in Google Sheets |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Google Apps Script |
| Database | Google Sheets |
| APIs | Google Sheets API, Fetch API |

---

## Form Fields

| Section | Fields |
|---------|--------|
| Site Details | Site Code, Second Site Code, City, Region, Location, Audit Type |
| Team & Schedule | Team (comma-separated), SPOC Name, SPOC Contact, Planned Date, Execution Date, Audit Engineers |
| Status & Uploads | Audit Work Status, Checklist Status, Ondrive Status |
| Location | Geo Location, Address |

---

## Setup Instructions

### 1. Create a Google Sheet

Create a new Google Sheet in your Google Drive.

### 2. Open Apps Script

Go to **Extensions → Apps Script**.

### 3. Paste the Script

Delete the default code and paste the `Code.gs` script.

### 4. Deploy as Web App

- Click **Deploy → New Deployment**
- Select **Web App**
- Set **Execute as:** "Me"
- Set **Who has access:** "Anyone"
- Click **Deploy**
- Copy the Web App URL

### 5. Update the HTML Form

Open `index.html` and replace `SCRIPT_URL` with your Web App URL:

```javascript
const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```

### 6. Deploy the HTML Form

Upload `index.html` to GitHub Pages, Netlify, or any static hosting.

---

## File Structure

```
site_audit_form/
├── index.html          # Main form (HTML + CSS + JS)
├── Code.gs             # Google Apps Script backend
└── README.md           # Documentation
```

---

## Google Apps Script Functions

| Function | Purpose |
|----------|---------|
| `doPost(e)` | Receives form data, appends to sheet |
| `doGet(e)` | Health check endpoint |
| `downloadAllAsExcel()` | Exports entire sheet as `.xlsx` |
| `downloadSelectedAsExcel()` | Exports checked rows only |
| `deleteSelectedRows()` | Removes checked rows |
| `onOpen()` | Adds custom menu to Google Sheets |
| `autoResizeAllColumns()` | Resizes all columns to fit content |
| `reapplyRowColors()` | Reapplies header and row styling |

---

## Google Sheets Menu

Once deployed, open your Google Sheet to see the **Site Audit Tools** menu:

```
Site Audit Tools
├── Download All as Excel
├── Download Selected Rows as Excel
├── ──────────────────────
├── Delete Selected Rows
├── Clear Temporary Export Sheets
├── ──────────────────────
├── Auto-resize All Columns
└── Reapply Row Colors
```

---

## Security Notes

| Concern | Status |
|---------|--------|
| Anyone can POST data | Yes — by design |
| Anyone can delete rows | No — only users with sheet edit access |
| Anyone can read data | No — only users with sheet access |
| Script URL is public | Yes — required for web app functionality |

---

## How to Frame This on Your Resume

- Built a site audit form used by JEF Techno's engineering team, replacing manual Excel reporting
- Integrated with Google Sheets via Apps Script, enabling real-time data sync
- Implemented client-side validation and progress tracking for error-free entry
- Reduced audit entry time from 15+ minutes to under 3 minutes per submission
- Added custom sheet menus for Excel export and row management

---

## Author

**Viresh R**
- GitHub: [@veereshr4446](https://github.com/veereshr4446)
- LinkedIn: [Viresh Ranjanagi](https://linkedin.com/in/veeresh-r-4446)

---

## License

MIT
