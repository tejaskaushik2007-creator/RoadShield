# RoadShield — Turn Road Safety Data into Action

**Tactical Civic Safety Command & Infrastructure Rapid Response Portal**  
Built for high-density municipal road hazard triage, explainable risk prioritization, department dispatch, and resolution verification.

---

## 🚀 Quick Start (Running Locally)

The project includes a zero-dependency local static server for Node.js, and also supports standard Python or browser preview.

### Option 1: Node.js (Recommended)
```bash
# Start local server on port 3000
npm start
# or: node server.js
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Option 2: Python HTTP Server
```bash
python -m http.server 3000
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧪 Automated End-to-End Workflow Test

To verify the entire 10-step hackathon demonstration scenario automatically:
```bash
npm test
# or: node tests/test_e2e_workflow.js
```

---

## 🗺️ Project Structure & Connected Screens

All original Google Stitch dark-mode designs, typography (*Inter* & *JetBrains Mono*), Tailwind tokens, icons, and SVG GIS matrix assets have been 100% preserved and connected:

| Screen | Route / File | Description |
| :--- | :--- | :--- |
| **Command Overview Dashboard** | [`index.html`](file:///./index.html) | High-level executive dashboard showing 7 core KPIs, recent telemetry stream, 10-step demo runner, and explainable risk spotlight. |
| **Live Risk Map & Hotspot GIS** | [`stitch_roadshield_civic_safety_portal/live_risk_map_hotspot_gis/code.html`](file:///./stitch_roadshield_civic_safety_portal/live_risk_map_hotspot_gis/code.html) | Interactive 70/30 SVG Vector GIS matrix with pulsing beacon hazard markers, CCTV feed simulation, and dynamic incident dossier panel. |
| **Report a Hazard & Offline Queue** | [`stitch_roadshield_civic_safety_portal/report_a_hazard_offline_queue/code.html`](file:///./stitch_roadshield_civic_safety_portal/report_a_hazard_offline_queue/code.html) | Citizen hazard intake wizard with category selection, GPS lock, severity pills, photo upload, local draft caching, and airplane offline simulation. |
| **Reports & Complaints Audit** | [`stitch_roadshield_civic_safety_portal/reports_and_complaints_management/code.html`](file:///./stitch_roadshield_civic_safety_portal/reports_and_complaints_management/code.html) | Municipal audit console with search, status tabs, high-density telemetry table, side inspection drawer, crew reassignment, and commissioner escalation. |
| **Field Response & Dispatch** | [`stitch_roadshield_civic_safety_portal/response_management_operations/code.html`](file:///./stitch_roadshield_civic_safety_portal/response_management_operations/code.html) | Field operations command with dynamic Kanban pipeline (Triaged, In Progress, Pending Inspection, Closed), before/after photo verification, and certification. |
| **Road Safety Analytics** | [`stitch_roadshield_civic_safety_portal/road_safety_analytics_performance/code.html`](file:///./stitch_roadshield_civic_safety_portal/road_safety_analytics_performance/code.html) | Vision Zero intelligence, radial SLA gauges, hazard class distributions, automated PDF briefing compilation, and raw CSV telemetry export. |
| **Core Architecture & Store** | [`stitch_roadshield_civic_safety_portal/roadshield-core.js`](file:///./stitch_roadshield_civic_safety_portal/roadshield-core.js) | Universal state store, explainable risk scoring calculator, offline queue manager, and role engine. |

---

## 🧠 Explainable Risk Scoring Engine ($0 - 100$)

RoadShield uses a transparent, deterministic multi-factor formula rather than an opaque black box:

$$\text{Risk Score} = \text{Severity (35\%)} + \text{Exposure (25\%)} + \text{Speed Corridor (20\%)} + \text{Recurrence (20\%)}$$

- **Hazard Physical Severity (35 pts max)**: Crater/void collapse = 35 pts; deep structural fault = 28 pts; medium impairment = 18 pts; minor = 10 pts.
- **Pedestrian & School Exposure (25 pts max)**: School zone proximity = 25 pts; high-density pedestrian corridor = 20 pts; moderate = 12 pts; vehicular = 5 pts.
- **Corridor Speed & Geometry (20 pts max)**: Expressway/arterial >45mph = 20 pts; primary arterial = 14 pts; school zone = 12 pts; residential = 6 pts.
- **Civic Recurrence & Sensor Corroboration (20 pts max)**: $\ge 30$ reports/pings = 20 pts; $\ge 15$ = 16 pts; $\ge 5$ = 12 pts; single = 5 pts.

*Risk Tiers*:
- **CRITICAL** ($\ge 85$): Immediate safety hazard, emergency response dispatch.
- **HIGH** ($70 - 84$): Significant impact risk, 24-hour SLA.
- **MODERATE** ($45 - 69$): Maintenance queue assignment.
- **LOW** ($< 45$): Routine inspection schedule.

---

## 📶 Offline-First Resiliency

1. **Simulated Offline Mode**: Toggle via the "Simulate Offline Mode (Airplane Test)" button in the top connectivity banner on any screen.
2. **Draft Caching**: Reports filed while offline are saved to the `roadshield_offline_queue_v2` local vault with an `offline_draft` state and a `Pending Sync` badge.
3. **Queue Synchronization**: Once reconnected, click **"Sync Queue Now"** or tap the pending draft in the sidebar to flush all drafts to the live central database.

---

## 👤 Interactive Role Switcher

Use the **Demo Role** dropdown in the top header to switch perspectives during hackathon presentations:
1. **Citizen Reporter**: Public intake feed and submission status tracking.
2. **Verification Officer**: Audit console review, duplicate clustering, and initial sign-off.
3. **Road Authority / Operations Manager**: Tactical dispatch, risk override, department reassignment, and commissioner escalation.
4. **Field Response Team / Contractor**: Work order tracking, before/after evidence logging, and repair closure certification.

---

## 📋 Hackathon 10-Step Demonstration Scenario

1. **Submit**: Open `Report a Hazard`, select **Pothole**, enter location, choose **Critical Emergency**, and click **Submit to Municipal Triage Queue**.
2. **Track**: Receive generated ticket ID (e.g. `#RS-949`) and click **Open in Audit Console**.
3. **Verify**: Select the **Verification Officer** role and click **Save Audit Record** to transition status to *Verified*.
4. **Assign**: Select **Road Authority / Ops Manager**, reassign crew to `PW-04 [Rapid Response]`, and set status to *In-Transit / Assigned*.
5. **Inspect on Map**: Navigate to **Live Risk Map** to view the pulsing red vector node at the exact coordinates with composite telemetry.
6. **Field Action**: Switch to **Field Response Team** and open **Response Operations**; view the ticket in the *Action In Progress* Kanban column.
7. **Evidence**: Check the quality sign-off checklist (compaction $>95\%$, geotagged optics verified).
8. **Certify**: Click **Approve Repair & Close Incident**; ticket moves to *Certified & Closed*.
9. **Dashboard Update**: Return to **Command Overview**; observe the *Resolved Hazards* counter increment and the active risk index adjust.
10. **Analytics**: Open **Road Safety Analytics** and download the updated raw CSV report.
