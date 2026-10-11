/**
 * ROADSHIELD // Civic Safety Command Engine
 * Core Data Store, Explainable Risk Scorer, Offline Sync Queue, and Role Engine
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.RoadShield = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STORAGE_KEY_REPORTS = 'roadshield_reports_v2';
  const STORAGE_KEY_OFFLINE_QUEUE = 'roadshield_offline_queue_v2';
  const STORAGE_KEY_ROLE = 'roadshield_active_role_v2';
  const STORAGE_KEY_OFFLINE_MODE = 'roadshield_simulated_offline';

  // Seed baseline operational incidents matching Stitch designs
  const INITIAL_REPORTS = [
    {
      id: 'RS-892',
      category: 'pothole',
      categoryLabel: 'Structural Pothole / Cave-In Rebar',
      title: 'Cave-In Rebar Void on Market Concourse',
      description: 'Sub-surface asphalt collapse with exposed 16mm rebar cage. Multiple rim punctures and vehicle swerves recorded near pedestrian transition.',
      location: '4th & Market St, Metro Central Ward 4',
      ward: 'Ward 4',
      coordinates: { lat: 40.7128, lng: -74.006, x: 685, y: 460 },
      severity: 'critical',
      speedContext: 'high_speed_corridor',
      pedestrianExposure: 'high',
      schoolZone: false,
      reportedCount: 38,
      status: 'assigned',
      statusLabel: 'In-Transit / Assigned',
      assignedDepartment: 'PW-04 [Rapid Response]',
      assignedCrew: 'Unit Echo-4 (Lead: Henderson)',
      priority: 'CRITICAL',
      targetDate: '2026-10-12',
      createdAt: '2026-10-11T08:30:00Z',
      updatedAt: '2026-10-11T10:15:00Z',
      reportedBy: 'Citizen Feed #311-8291',
      evidence: {
        beforeImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
        afterImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
        inspectionNotes: 'Bedding compaction nominal. Rebar clipped and asphalt compacted to 96.8% bulk density.',
        checklist: {
          bulkDensity: true,
          photosValidated: true,
          reinspectionScheduled: false
        }
      },
      timeline: [
        { time: '08:30 AM', action: 'Initial Report Ingested via Mobile App', user: 'Citizen #311-8291', note: 'Ingested via offline queue sync' },
        { time: '09:15 AM', action: 'AI Sensor Cluster Verified 38 Feeds', user: 'System Telemetry', note: 'Clustered 38 dashcam & civic pings' },
        { time: '09:40 AM', action: 'Risk Elevated to Critical (Score 94)', user: 'Inspector Henderson', note: 'Pedestrian proximity multiplier applied' },
        { time: '10:05 AM', action: 'Dispatched PW-04 Rapid Response', user: 'Elena Vance (Ops Lead)', note: 'En route via HWY 14 connector' }
      ]
    },
    {
      id: 'RS-741',
      category: 'pedestrian',
      categoryLabel: 'Unsafe Pedestrian Crossing / Signal Fault',
      title: 'Pedestrian Signal Head Snapped & Faded Crossing',
      description: 'Pedestrian crossing signal head detached after wind shear; crosswalk zebra markings worn down by 80%. High student foot traffic.',
      location: 'University Ave NW & 9th St, Ward 4',
      ward: 'Ward 4',
      coordinates: { lat: 40.7142, lng: -74.0045, x: 890, y: 390 },
      severity: 'critical',
      speedContext: 'school_zone',
      pedestrianExposure: 'high',
      schoolZone: true,
      reportedCount: 19,
      status: 'awaiting_verification',
      statusLabel: 'Under Verification',
      assignedDepartment: 'Traffic Safety Ops',
      assignedCrew: 'Signals Tech Unit 02',
      priority: 'HIGH',
      targetDate: '2026-10-12',
      createdAt: '2026-10-11T09:05:00Z',
      updatedAt: '2026-10-11T09:45:00Z',
      reportedBy: 'School Crossing Guard Guild',
      evidence: {
        beforeImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=600&q=80',
        afterImage: '',
        inspectionNotes: 'Temporary warning barrier placed. Awaiting bucket truck crew.',
        checklist: { bulkDensity: false, photosValidated: false, reinspectionScheduled: false }
      },
      timeline: [
        { time: '09:05 AM', action: 'Citizen Ticket Logged', user: 'Crossing Guard S. Patel', note: 'Hazard marked high urgency' },
        { time: '09:45 AM', action: 'Verification Queue Ingestion', user: 'Safety Desk Ward 4', note: 'Assigned to Verification Officer review' }
      ]
    },
    {
      id: 'RS-619',
      category: 'lighting',
      categoryLabel: 'Poor Street Lighting / Dark Corridor',
      title: 'High-Mast Sodium Lighting Failure (3 Poles Dark)',
      description: 'Consecutive high-mast fixtures out along multi-lane curve. Severe drop in nighttime sightline visibility for commuter traffic.',
      location: 'North Metro Blvd & 12th St, Ward 4',
      ward: 'Ward 4',
      coordinates: { lat: 40.7175, lng: -74.009, x: 860, y: 240 },
      severity: 'moderate',
      speedContext: 'arterial',
      pedestrianExposure: 'moderate',
      schoolZone: false,
      reportedCount: 9,
      status: 'in_progress',
      statusLabel: 'In Progress',
      assignedDepartment: 'Metro Lighting Division',
      assignedCrew: 'Grid Crew Beta',
      priority: 'MEDIUM',
      targetDate: '2026-10-13',
      createdAt: '2026-10-10T22:15:00Z',
      updatedAt: '2026-10-11T07:30:00Z',
      reportedBy: 'Night Transit Driver',
      evidence: {
        beforeImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80',
        afterImage: '',
        inspectionNotes: 'Transformer feed replaced; final ballast calibration pending.',
        checklist: { bulkDensity: false, photosValidated: true, reinspectionScheduled: false }
      },
      timeline: [
        { time: 'Yesterday 10:15 PM', action: 'Logged by Bus Route 41 Operator', user: 'Transit Driver', note: 'Sightline blocked' },
        { time: '07:30 AM', action: 'Work Order Issued to Lighting Division', user: 'Ops Dispatch', note: 'Crew on site' }
      ]
    },
    {
      id: 'RS-512',
      category: 'pothole',
      categoryLabel: 'Severe Frost Heave / Broken Curb',
      title: 'Riverside Parkway Frost Heave & Deep Gouge',
      description: 'Roadbed frost heave with 5-inch elevation differential between travel lanes. Rapid hazard for two-wheelers and heavy freight.',
      location: 'Riverside Dock Pkwy & Pier 14, Ward 4',
      ward: 'Ward 4',
      coordinates: { lat: 40.711, lng: -74.002, x: 1260, y: 310 },
      severity: 'critical',
      speedContext: 'high_speed_corridor',
      pedestrianExposure: 'moderate',
      schoolZone: false,
      reportedCount: 27,
      status: 'awaiting_inspection',
      statusLabel: 'Awaiting Inspection',
      assignedDepartment: 'PW-04 [Rapid Response]',
      assignedCrew: 'Heavy Paving Unit 01',
      priority: 'CRITICAL',
      targetDate: '2026-10-11',
      createdAt: '2026-10-10T14:00:00Z',
      updatedAt: '2026-10-11T10:45:00Z',
      reportedBy: 'Freight Fleet Telemetry',
      evidence: {
        beforeImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
        afterImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
        inspectionNotes: 'Cold patch milled and replaced with hot-mix polymer. Density test pending sign-off.',
        checklist: { bulkDensity: true, photosValidated: true, reinspectionScheduled: false }
      },
      timeline: [
        { time: 'Oct 10 02:00 PM', action: 'Accelerometer Alert from Fleet', user: 'Automated Telemetry', note: 'G-force > 2.4g registered' },
        { time: 'Oct 11 08:00 AM', action: 'Asphalt Mill Crew Assigned', user: 'Dispatcher Jones', note: 'Lane closure 09:00 - 11:00' },
        { time: 'Oct 11 10:45 AM', action: 'Repair Submitted for Field Inspection', user: 'Crew Lead Davis', note: 'Hot mix applied' }
      ]
    },
    {
      id: 'RS-405',
      category: 'signage',
      categoryLabel: 'Missing / Obscured Stop Sign',
      title: 'Stop Sign Obscured by Overgrown Oak Branch',
      description: 'Four-way intersection STOP sign completely hidden by municipal foliage from 30 meters out. Two near-miss incidents documented.',
      location: 'Oak & Elm Junction, Ward 4',
      ward: 'Ward 4',
      coordinates: { lat: 40.7188, lng: -74.008, x: 410, y: 220 },
      severity: 'moderate',
      speedContext: 'residential',
      pedestrianExposure: 'high',
      schoolZone: true,
      reportedCount: 6,
      status: 'resolved',
      statusLabel: 'Resolved & Certified',
      assignedDepartment: 'Urban Forestry & Traffic Signs',
      assignedCrew: 'Signage Maintenance Unit 3',
      priority: 'MEDIUM',
      targetDate: '2026-10-10',
      createdAt: '2026-10-09T11:20:00Z',
      updatedAt: '2026-10-10T16:00:00Z',
      reportedBy: 'Citizen Mobile App',
      evidence: {
        beforeImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
        afterImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
        inspectionNotes: 'Branch cleared and high-intensity reflective stop sign replaced with new shear bolts.',
        checklist: { bulkDensity: true, photosValidated: true, reinspectionScheduled: true }
      },
      timeline: [
        { time: 'Oct 09 11:20 AM', action: 'Report Filed with GPS Tag', user: 'Citizen M. Rivera', note: 'Near-miss witnessed' },
        { time: 'Oct 10 09:30 AM', action: 'Tree Trimming Completed', user: 'Forestry Crew 2', note: 'Full sightline restored' },
        { time: 'Oct 10 04:00 PM', action: 'Certified Resolved by Inspector', user: 'Insp. Henderson', note: 'Ticket closed' }
      ]
    },
    {
      id: 'RS-330',
      category: 'intersection',
      categoryLabel: 'Dangerous Intersection / Red-Light Hotspot',
      title: 'Blind Merge & High Speed Skidding at Concourse Exit',
      description: 'Severe skid marks and blind entry radius causing continuous near misses during morning peak hours. Missing directional delineator posts.',
      location: 'Central Concourse Merge, Ward 4',
      ward: 'Ward 4',
      coordinates: { lat: 40.7135, lng: -74.007, x: 520, y: 520 },
      severity: 'high',
      speedContext: 'high_speed_corridor',
      pedestrianExposure: 'moderate',
      schoolZone: false,
      reportedCount: 22,
      status: 'verified',
      statusLabel: 'Verified / Pending Dispatch',
      assignedDepartment: 'Traffic Safety Ops',
      assignedCrew: 'Pending Department Assignment',
      priority: 'HIGH',
      targetDate: '2026-10-13',
      createdAt: '2026-10-11T06:15:00Z',
      updatedAt: '2026-10-11T09:30:00Z',
      reportedBy: 'Police Escort Unit',
      evidence: {
        beforeImage: '',
        afterImage: '',
        inspectionNotes: 'Engineering survey requested for retroreflective lane dividers and speed cushions.',
        checklist: { bulkDensity: false, photosValidated: false, reinspectionScheduled: false }
      },
      timeline: [
        { time: '06:15 AM', action: 'Incident Dispatched via Patrol Log', user: 'Officer Miller', note: 'High recurrence area' },
        { time: '09:30 AM', action: 'Verified by Ward 4 Operations Desk', user: 'Elena Vance', note: 'Confirmed high risk tier' }
      ]
    }
  ];

  /**
   * Explainable Risk Scoring Engine
   * Generates a transparent, weighted 0 - 100 Risk Score with breakdown.
   * NOTE: This is a demonstration heuristic scoring model for civic prioritization,
   * not a certified accident prediction model.
   */
  function calculateExplainableRiskScore(hazard) {
    let score = 0;
    const factors = [];

    // 1. Base Hazard Severity (35 points max)
    let severityPts = 10;
    let severityExplanation = 'Minor defect (10 pts)';
    const sev = (hazard.severity || 'moderate').toLowerCase();
    if (sev === 'critical') {
      severityPts = 35;
      severityExplanation = 'High structural failure / immediate rollover risk (35 pts)';
    } else if (sev === 'high') {
      severityPts = 28;
      severityExplanation = 'Substantial impact hazard / tire blowout risk (28 pts)';
    } else if (sev === 'moderate') {
      severityPts = 18;
      severityExplanation = 'Noticeable road impairment (18 pts)';
    } else {
      severityPts = 10;
      severityExplanation = 'Low physical obstruction (10 pts)';
    }
    score += severityPts;
    factors.push({ name: 'Hazard Physical Severity', points: severityPts, max: 35, explanation: severityExplanation });

    // 2. Vulnerable User / Pedestrian Exposure (25 points max)
    let pedPts = 5;
    let pedExplanation = 'Low pedestrian density';
    if (hazard.schoolZone) {
      pedPts = 25;
      pedExplanation = 'Critical School Zone / Youth transit crossing active (25 pts)';
    } else if (hazard.pedestrianExposure === 'high') {
      pedPts = 20;
      pedExplanation = 'High-density pedestrian concourse / transit hub (20 pts)';
    } else if (hazard.pedestrianExposure === 'moderate') {
      pedPts = 12;
      pedExplanation = 'Regular sidewalk / urban bike lane corridor (12 pts)';
    } else {
      pedPts = 5;
      pedExplanation = 'Controlled vehicular roadway (5 pts)';
    }
    score += pedPts;
    factors.push({ name: 'Pedestrian & School Exposure', points: pedPts, max: 25, explanation: pedExplanation });

    // 3. Traffic Speed Corridor & Geometry Context (20 points max)
    let speedPts = 6;
    let speedExplanation = 'Residential 25mph collector';
    const speed = hazard.speedContext || 'arterial';
    if (speed === 'high_speed_corridor') {
      speedPts = 20;
      speedExplanation = 'Expressway / High-speed arterial >45mph (20 pts)';
    } else if (speed === 'arterial') {
      speedPts = 14;
      speedExplanation = 'Primary city arterial with heavy bus transit (14 pts)';
    } else if (speed === 'school_zone') {
      speedPts = 12;
      speedExplanation = 'School perimeter traffic zone (12 pts)';
    } else {
      speedPts = 6;
      speedExplanation = 'Low-speed neighborhood zone (6 pts)';
    }
    score += speedPts;
    factors.push({ name: 'Corridor Speed & Context', points: speedPts, max: 20, explanation: speedExplanation });

    // 4. Incident Recurrence & Telemetry Clusters (20 points max)
    let recurPts = 5;
    let recurExplanation = 'Single isolated citizen report (5 pts)';
    const count = parseInt(hazard.reportedCount || 1, 10);
    if (count >= 30) {
      recurPts = 20;
      recurExplanation = `Widespread cluster: ${count} verified citizen & sensor pings (20 pts)`;
    } else if (count >= 15) {
      recurPts = 16;
      recurExplanation = `Significant recurrence: ${count} civic complaints logged (16 pts)`;
    } else if (count >= 5) {
      recurPts = 12;
      recurExplanation = `Multiple reports: ${count} independent confirmations (12 pts)`;
    } else if (count >= 2) {
      recurPts = 8;
      recurExplanation = `${count} corroborated reports (8 pts)`;
    } else {
      recurPts = 5;
      recurExplanation = 'Single report logged (5 pts)';
    }
    score += recurPts;
    factors.push({ name: 'Civic Recurrence & Sensor Corroboration', points: recurPts, max: 20, explanation: recurExplanation });

    // Clamping to 0-100
    score = Math.min(100, Math.max(0, Math.round(score)));

    let tier = 'LOW';
    let tierColor = 'text-primary';
    let badgeBg = 'bg-surface-container-high';
    if (score >= 85) {
      tier = 'CRITICAL';
      tierColor = 'text-error';
      badgeBg = 'bg-error-container text-on-error-container';
    } else if (score >= 70) {
      tier = 'HIGH';
      tierColor = 'text-secondary-fixed';
      badgeBg = 'bg-secondary-container text-on-secondary-container';
    } else if (score >= 45) {
      tier = 'MODERATE';
      tierColor = 'text-primary-container';
      badgeBg = 'bg-surface-container-highest text-primary-container';
    } else {
      tier = 'LOW';
      tierColor = 'text-on-surface-variant';
      badgeBg = 'bg-surface-container text-on-surface';
    }

    return {
      score,
      tier,
      tierColor,
      badgeBg,
      factors,
      methodologyNote: 'Demonstration score computed from multi-factor weighted telemetry (Severity 35%, Exposure 25%, Speed 20%, Recurrence 20%). Crash history context is currently simulated for prototype testing.'
    };
  }

  // Hydrate initial data if needed
  function initializeStore() {
    try {
      const existing = localStorage.getItem(STORAGE_KEY_REPORTS);
      if (!existing) {
        // Compute initial risk scores
        const enriched = INITIAL_REPORTS.map(r => {
          const risk = calculateExplainableRiskScore(r);
          return {
            ...r,
            riskScore: risk.score,
            riskTier: risk.tier,
            riskBreakdown: risk
          };
        });
        localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(enriched));
      }

      if (!localStorage.getItem(STORAGE_KEY_OFFLINE_QUEUE)) {
        localStorage.setItem(STORAGE_KEY_OFFLINE_QUEUE, JSON.stringify([]));
      }

      if (!localStorage.getItem(STORAGE_KEY_ROLE)) {
        localStorage.setItem(STORAGE_KEY_ROLE, 'operations_manager');
      }
    } catch (e) {
      console.warn('RoadShield LocalStorage init error:', e);
    }
  }

  // Self-initialize immediately
  initializeStore();

  const RoadShieldCore = {
    // Current User Role Management
    ROLES: {
      citizen: { id: 'citizen', label: 'Citizen Reporter', badge: 'PUBLIC CIVIC FEED', icon: 'person', permissions: ['report', 'view_public'] },
      verification_officer: { id: 'verification_officer', label: 'Verification Officer', badge: 'CIVIC AUDIT / VERIFY', icon: 'verified_user', permissions: ['verify', 'triage', 'flag_duplicate'] },
      operations_manager: { id: 'operations_manager', label: 'Road Authority / Ops Manager', badge: 'COMMAND & DISPATCH', icon: 'shield', permissions: ['all', 'dispatch', 'override_status', 'assign'] },
      field_team: { id: 'field_team', label: 'Field Response Crew', badge: 'RAPID RESPONSE UNIT', icon: 'engineering', permissions: ['update_progress', 'upload_evidence', 'certify_inspection'] }
    },

    getCurrentRole: function () {
      const id = localStorage.getItem(STORAGE_KEY_ROLE) || 'operations_manager';
      return this.ROLES[id] || this.ROLES.operations_manager;
    },

    setCurrentRole: function (roleId) {
      if (this.ROLES[roleId]) {
        localStorage.setItem(STORAGE_KEY_ROLE, roleId);
        window.dispatchEvent(new CustomEvent('roadshield:role_changed', { detail: this.ROLES[roleId] }));
        return this.ROLES[roleId];
      }
      return this.getCurrentRole();
    },

    // Offline Mode Simulation
    isOfflineMode: function () {
      return localStorage.getItem(STORAGE_KEY_OFFLINE_MODE) === 'true';
    },

    setOfflineMode: function (enabled) {
      localStorage.setItem(STORAGE_KEY_OFFLINE_MODE, enabled ? 'true' : 'false');
      window.dispatchEvent(new CustomEvent('roadshield:connectivity_changed', { detail: { isOffline: enabled } }));
      return enabled;
    },

    // Risk Scorer Export
    calculateRisk: calculateExplainableRiskScore,

    // Reports CRUD
    getAllReports: function () {
      try {
        const data = localStorage.getItem(STORAGE_KEY_REPORTS);
        return data ? JSON.parse(data) : INITIAL_REPORTS;
      } catch (e) {
        return INITIAL_REPORTS;
      }
    },

    getReportById: function (id) {
      const reports = this.getAllReports();
      return reports.find(r => r.id.toLowerCase() === id.toLowerCase()) || null;
    },

    createReport: function (reportData) {
      const isSimulatedOffline = this.isOfflineMode();
      const currentReports = this.getAllReports();

      // Generate incremental readable ID: RS-XXX
      const nextNum = 900 + (currentReports.length + 1) * 7;
      const reportId = reportData.id || `RS-${nextNum}`;

      // Calculate Explainable Risk
      const risk = calculateExplainableRiskScore(reportData);

      const newReport = {
        id: reportId,
        category: reportData.category || 'pothole',
        categoryLabel: reportData.categoryLabel || this.getCategoryLabel(reportData.category || 'pothole'),
        title: reportData.title || `${this.getCategoryLabel(reportData.category || 'pothole')} Alert`,
        description: reportData.description || 'Hazard reported by citizen via RoadShield mobile intake.',
        location: reportData.location || 'Ward 4 Metro Central, Coordinates Attached',
        ward: reportData.ward || 'Ward 4',
        coordinates: reportData.coordinates || { lat: 40.7128, lng: -74.006, x: 700, y: 450 },
        severity: reportData.severity || 'high',
        speedContext: reportData.speedContext || 'arterial',
        pedestrianExposure: reportData.pedestrianExposure || 'moderate',
        schoolZone: !!reportData.schoolZone,
        reportedCount: 1,
        status: isSimulatedOffline ? 'offline_draft' : 'awaiting_verification',
        statusLabel: isSimulatedOffline ? 'Pending Sync (Local Draft)' : 'Awaiting Verification',
        assignedDepartment: 'Unassigned',
        assignedCrew: 'Pending Department Triage',
        priority: risk.tier,
        targetDate: reportData.targetDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reportedBy: reportData.reportedBy || 'Citizen Ingest // Mobile App',
        riskScore: risk.score,
        riskTier: risk.tier,
        riskBreakdown: risk,
        isOfflineDraft: isSimulatedOffline,
        evidence: {
          beforeImage: reportData.photoUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
          afterImage: '',
          inspectionNotes: 'Initial citizen photo evidence registered.',
          checklist: { bulkDensity: false, photosValidated: false, reinspectionScheduled: false }
        },
        timeline: [
          {
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            action: isSimulatedOffline ? 'Saved locally to Offline Storage Queue' : 'Report Logged in Central System',
            user: this.getCurrentRole().label,
            note: isSimulatedOffline ? 'Network offline: awaiting synchronization' : 'Ingested with GPS verification'
          }
        ]
      };

      if (isSimulatedOffline) {
        // Save to offline queue
        const queue = this.getOfflineQueue();
        queue.push(newReport);
        localStorage.setItem(STORAGE_KEY_OFFLINE_QUEUE, JSON.stringify(queue));
      } else {
        // Save directly to reports
        currentReports.unshift(newReport);
        localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(currentReports));
      }

      window.dispatchEvent(new CustomEvent('roadshield:report_created', { detail: newReport }));
      return newReport;
    },

    updateReport: function (id, updates) {
      const reports = this.getAllReports();
      const index = reports.findIndex(r => r.id.toLowerCase() === id.toLowerCase());
      if (index === -1) return null;

      const current = reports[index];
      const role = this.getCurrentRole();

      // If status changed, record timeline entry
      if (updates.status && updates.status !== current.status) {
        if (!updates.timeline) updates.timeline = current.timeline || [];
        const statusNames = {
          awaiting_verification: 'Awaiting Verification',
          verified: 'Verified by Operations Desk',
          assigned: 'Assigned to Field Unit',
          in_progress: 'Action in Progress',
          awaiting_inspection: 'Awaiting Field Inspection',
          resolved: 'Resolved & Certified Closed',
          rejected: 'Marked Duplicate / Rejected'
        };
        updates.timeline.unshift({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: `Status updated to ${statusNames[updates.status] || updates.status}`,
          user: role.label,
          note: updates.transitionNote || 'Status transitioned through audit console'
        });
        updates.statusLabel = statusNames[updates.status] || updates.status;
      }

      // Recompute risk if severity or context parameters updated
      if (updates.severity || updates.pedestrianExposure || updates.speedContext || updates.schoolZone !== undefined) {
        const merged = { ...current, ...updates };
        const risk = calculateExplainableRiskScore(merged);
        updates.riskScore = risk.score;
        updates.riskTier = risk.tier;
        updates.riskBreakdown = risk;
      }

      updates.updatedAt = new Date().toISOString();
      const updated = { ...current, ...updates };
      reports[index] = updated;

      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
      window.dispatchEvent(new CustomEvent('roadshield:report_updated', { detail: updated }));
      return updated;
    },

    // Offline Queue Methods
    getOfflineQueue: function () {
      try {
        const data = localStorage.getItem(STORAGE_KEY_OFFLINE_QUEUE);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    },

    syncOfflineQueue: function () {
      const queue = this.getOfflineQueue();
      if (!queue.length) return { syncedCount: 0, reports: [] };

      const reports = this.getAllReports();
      const synced = [];

      queue.forEach(item => {
        item.isOfflineDraft = false;
        item.status = 'awaiting_verification';
        item.statusLabel = 'Awaiting Verification (Synced)';
        item.timeline.unshift({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: 'Synchronized with Central RoadShield Server',
          user: 'Auto-Sync Protocol',
          note: 'Local offline payload transmitted successfully.'
        });
        reports.unshift(item);
        synced.push(item);
      });

      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
      localStorage.setItem(STORAGE_KEY_OFFLINE_QUEUE, JSON.stringify([]));

      window.dispatchEvent(new CustomEvent('roadshield:queue_synced', { detail: { count: synced.length } }));
      return { syncedCount: synced.length, reports: synced };
    },

    // Helper: Category Labels
    getCategoryLabel: function (cat) {
      const map = {
        pothole: 'Structural Pothole / Road Damage',
        intersection: 'Dangerous Intersection / Conflict Node',
        pedestrian: 'Unsafe Pedestrian Crossing',
        speeding: 'Speeding Corridor / Drag Hotspot',
        lighting: 'Poor Street Lighting / Blackout',
        signage: 'Missing / Obscured Road Sign',
        sightline: 'Blocked Sightlines / Blind Corner',
        obstruction: 'Road Obstruction / Debris',
        'near-miss': 'Near-Miss Collision Cluster',
        other: 'General Civic Hazard'
      };
      return map[cat] || 'Civic Road Hazard';
    },

    // Dashboard Statistics Calculation
    getMetrics: function () {
      const reports = this.getAllReports();
      const offlineQueue = this.getOfflineQueue();

      const totalReports = reports.length;
      const activeHazards = reports.filter(r => r.status !== 'resolved' && r.status !== 'rejected').length;
      const criticalHotspots = reports.filter(r => (r.riskScore >= 80 || r.severity === 'critical') && r.status !== 'resolved').length;
      const pendingVerification = reports.filter(r => r.status === 'awaiting_verification').length;
      const activeInterventions = reports.filter(r => r.status === 'assigned' || r.status === 'in_progress').length;
      const resolvedHazards = reports.filter(r => r.status === 'resolved').length;

      // Hazard category breakdown
      const categoriesCount = {};
      reports.forEach(r => {
        const cat = r.category || 'other';
        categoriesCount[cat] = (categoriesCount[cat] || 0) + 1;
      });

      // Ward distribution
      const wardCount = {};
      reports.forEach(r => {
        const w = r.ward || 'Ward 4';
        wardCount[w] = (wardCount[w] || 0) + 1;
      });

      // Average demo response time
      const avgResponseTimeHours = 3.8;

      return {
        totalReports,
        activeHazards,
        criticalHotspots,
        pendingVerification,
        activeInterventions,
        resolvedHazards,
        offlinePending: offlineQueue.length,
        avgResponseTimeHours,
        categoriesCount,
        wardCount
      };
    },

    // Universal Nav Switcher Helper for Multi-Page linking
    setupGlobalHeaderAndNav: function (activePage) {
      // Inject global high-legibility styles and image constraints
      this.injectLegibilityEnhancer();
      // Setup role selector UI in top bar
      this.injectRoleSelector();
      // Setup display scale controller
      this.injectDisplayScaleWidget();
      // Setup navigation paths
      this.bindNavigationLinks(activePage);
      // Setup connectivity toggle & offline badge
      this.bindConnectivityWidgets();
    },

    // Injects Global Legibility & Image Constraints
    injectLegibilityEnhancer: function () {
      if (document.getElementById('roadshield-legibility-styles')) return;

      const style = document.createElement('style');
      style.id = 'roadshield-legibility-styles';
      style.textContent = `
        /* ROADSHIELD // Ultra-Legible Ergonomic Theme */
        html {
          font-size: 15px !important;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
        }

        /* Prevent tiny unreadable micro-fonts (Scale up 9px-11px into readable 12px-14px) */
        .text-\\[9px\\], [class*="text-[9px]"] {
          font-size: 11.5px !important;
          line-height: 16px !important;
        }
        .text-\\[10px\\], [class*="text-[10px]"] {
          font-size: 12.5px !important;
          line-height: 17px !important;
        }
        .text-\\[11px\\], [class*="text-[11px]"] {
          font-size: 13.5px !important;
          line-height: 18px !important;
        }
        .text-\\[12px\\], [class*="text-[12px]"] {
          font-size: 14px !important;
          line-height: 20px !important;
        }

        /* Telemetry & Technical Font Scaling */
        .font-telemetry-sm {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 13px !important;
          letter-spacing: 0.02em !important;
        }
        .font-telemetry-md {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 15.5px !important;
          letter-spacing: 0.01em !important;
        }
        .font-telemetry-lg {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 24px !important;
          letter-spacing: -0.01em !important;
          font-weight: 700 !important;
        }
        .font-label-caps {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 11.5px !important;
          font-weight: 700 !important;
          letter-spacing: 0.06em !important;
        }
        .font-body-sm {
          font-size: 13.5px !important;
          line-height: 20px !important;
        }
        .font-body-md {
          font-size: 15px !important;
          line-height: 22px !important;
        }
        .font-headline-sm {
          font-size: 18px !important;
          line-height: 25px !important;
        }
        .font-headline-md {
          font-size: 22px !important;
          line-height: 29px !important;
        }
        .font-headline-lg {
          font-size: 26px !important;
          line-height: 34px !important;
        }
        .font-headline-xl {
          font-size: 32px !important;
          line-height: 40px !important;
        }

        /* Image Sizing Balancer: Constrain massive images so UI is compact & usable */
        img {
          max-height: 190px !important;
          object-fit: cover !important;
          border-radius: 6px !important;
        }
        .h-64 {
          height: 180px !important;
          max-height: 180px !important;
        }
        .h-48 {
          height: 150px !important;
          max-height: 150px !important;
        }
        .h-32 {
          height: 120px !important;
          max-height: 120px !important;
        }
        .h-28 {
          height: 110px !important;
          max-height: 110px !important;
        }
        div[style*="background-image"] {
          max-height: 190px !important;
          background-size: cover !important;
          border-radius: 6px !important;
        }

        /* Navigation & Sidebar Usability */
        nav a {
          padding-top: 7px !important;
          padding-bottom: 7px !important;
          margin-bottom: 2px !important;
        }
        nav a span.font-telemetry-sm {
          font-size: 13px !important;
          letter-spacing: 0.03em !important;
        }

        /* Buttons & Form Inputs Ergonomics */
        button {
          font-size: 13px !important;
          letter-spacing: 0.02em !important;
        }
        input, select, textarea {
          font-size: 14px !important;
          line-height: 20px !important;
        }

        /* Table row padding & legibility */
        table th {
          font-size: 11.5px !important;
          padding-top: 10px !important;
          padding-bottom: 10px !important;
        }
        table td {
          font-size: 13.5px !important;
          padding-top: 10px !important;
          padding-bottom: 10px !important;
        }

        /* Tactical High-Contrast Card Outlines */
        .bg-surface-container-low, .bg-surface-container {
          border: 1px solid rgba(132, 148, 149, 0.22) !important;
        }
      `;
      document.head.appendChild(style);
    },

    // Injects a Display Scaling Selector in Header (Comfortable 105% / Compact / Default)
    injectDisplayScaleWidget: function () {
      const headerControls = document.querySelector('header .flex.items-center.gap-space-md:last-child');
      if (!headerControls || document.getElementById('roadshield-scale-control')) return;

      const currentScale = localStorage.getItem('roadshield_display_scale') || '105';
      this.applyScale(currentScale);

      const scaleWrapper = document.createElement('div');
      scaleWrapper.id = 'roadshield-scale-control';
      scaleWrapper.className = 'hidden md:flex items-center bg-surface-container-low border border-outline-variant/40 rounded px-2 py-1 gap-1 text-[11px] font-telemetry-sm';
      scaleWrapper.innerHTML = `
        <span class="material-symbols-outlined text-secondary text-[15px]">format_size</span>
        <span class="text-on-surface-variant font-semibold">ZOOM:</span>
        <button id="scale-100-btn" class="px-1.5 py-0.5 rounded ${currentScale === '100' ? 'bg-primary-container text-on-primary font-bold' : 'text-on-surface hover:text-primary'}">100%</button>
        <button id="scale-110-btn" class="px-1.5 py-0.5 rounded ${currentScale === '105' || currentScale === '110' ? 'bg-primary-container text-on-primary font-bold' : 'text-on-surface hover:text-primary'}">110%</button>
        <button id="scale-120-btn" class="px-1.5 py-0.5 rounded ${currentScale === '120' ? 'bg-primary-container text-on-primary font-bold' : 'text-on-surface hover:text-primary'}">120%</button>
      `;

      headerControls.insertBefore(scaleWrapper, headerControls.firstChild);

      scaleWrapper.querySelector('#scale-100-btn').onclick = () => this.setScale('100');
      scaleWrapper.querySelector('#scale-110-btn').onclick = () => this.setScale('105');
      scaleWrapper.querySelector('#scale-120-btn').onclick = () => this.setScale('120');
    },

    setScale: function(val) {
      localStorage.setItem('roadshield_display_scale', val);
      this.applyScale(val);
      const widget = document.getElementById('roadshield-scale-control');
      if (widget) {
        widget.querySelectorAll('button').forEach(b => {
          b.className = 'px-1.5 py-0.5 rounded text-on-surface hover:text-primary';
        });
        if (val === '100') widget.querySelector('#scale-100-btn').className = 'px-1.5 py-0.5 rounded bg-primary-container text-on-primary font-bold';
        if (val === '105' || val === '110') widget.querySelector('#scale-110-btn').className = 'px-1.5 py-0.5 rounded bg-primary-container text-on-primary font-bold';
        if (val === '120') widget.querySelector('#scale-120-btn').className = 'px-1.5 py-0.5 rounded bg-primary-container text-on-primary font-bold';
      }
      this.showToast(`Display scale set to ${val}%`, 'format_size');
    },

    applyScale: function(val) {
      const zoomFactor = parseInt(val, 10) / 100;
      document.documentElement.style.zoom = zoomFactor;
    },

    // Injects an interactive Role Switcher in the top header
    injectRoleSelector: function () {
      const userProfileContainer = document.querySelector('header .flex.items-center.gap-space-sm:last-child');
      if (!userProfileContainer || document.getElementById('roadshield-role-switcher')) return;

      const currentRole = this.getCurrentRole();

      const switcherWrapper = document.createElement('div');
      switcherWrapper.id = 'roadshield-role-switcher';
      switcherWrapper.className = 'flex items-center gap-2 mr-2 bg-surface-container-low px-2 py-1 rounded border border-outline-variant/40';

      switcherWrapper.innerHTML = `
        <span class="material-symbols-outlined text-primary-container text-[16px]">${currentRole.icon}</span>
        <div class="flex flex-col text-left">
          <span class="font-label-caps text-[9px] text-on-surface-variant uppercase leading-none">DEMO ROLE</span>
          <select id="role-select-dropdown" class="bg-transparent text-primary text-[11px] font-telemetry-sm font-semibold focus:outline-none cursor-pointer">
            <option value="citizen" ${currentRole.id === 'citizen' ? 'selected' : ''} class="bg-surface-container text-on-surface">Citizen Reporter</option>
            <option value="verification_officer" ${currentRole.id === 'verification_officer' ? 'selected' : ''} class="bg-surface-container text-on-surface">Verification Officer</option>
            <option value="operations_manager" ${currentRole.id === 'operations_manager' ? 'selected' : ''} class="bg-surface-container text-on-surface">Road Authority / Ops</option>
            <option value="field_team" ${currentRole.id === 'field_team' ? 'selected' : ''} class="bg-surface-container text-on-surface">Field Response Team</option>
          </select>
        </div>
      `;

      userProfileContainer.parentNode.insertBefore(switcherWrapper, userProfileContainer);

      const dropdown = switcherWrapper.querySelector('#role-select-dropdown');
      dropdown.addEventListener('change', (e) => {
        const newRole = this.setCurrentRole(e.target.value);
        this.showToast(`Switched active role to: ${newRole.label}`, 'person');
        setTimeout(() => window.location.reload(), 300);
      });
    },

    // Bind navigation links to actual relative paths
    bindNavigationLinks: function (activePage) {
      const basePath = this.getBasePath();

      const routeMap = {
        'command-overview': basePath + 'index.html',
        'live-risk-map': basePath + 'stitch_roadshield_civic_safety_portal/live_risk_map_hotspot_gis/code.html',
        'report-a-hazard': basePath + 'stitch_roadshield_civic_safety_portal/report_a_hazard_offline_queue/code.html',
        'reports-and-complaints': basePath + 'stitch_roadshield_civic_safety_portal/reports_and_complaints_management/code.html',
        'hotspot-analytics': basePath + 'stitch_roadshield_civic_safety_portal/live_risk_map_hotspot_gis/code.html',
        'response-operations': basePath + 'stitch_roadshield_civic_safety_portal/response_management_operations/code.html',
        'road-safety-analytics': basePath + 'stitch_roadshield_civic_safety_portal/road_safety_analytics_performance/code.html',
        'alerts-and-notifications': '#alerts-modal',
        'settings-and-system-configuration': '#settings-modal'
      };

      document.querySelectorAll('nav a[data-path], header a[data-path]').forEach(link => {
        const pathKey = link.getAttribute('data-path');
        if (routeMap[pathKey]) {
          link.href = routeMap[pathKey];
        }

        // Highlight active page
        if (pathKey === activePage) {
          link.setAttribute('aria-current', 'page');
          link.className = 'group flex items-center justify-between px-space-sm py-space-xs rounded transition-all bg-surface-container-high text-primary-container border-l-2 border-primary-container shadow-[inset_0_0_12px_rgba(0,240,255,0.06)]';
        } else if (pathKey !== 'alerts-and-notifications' && pathKey !== 'settings-and-system-configuration') {
          link.removeAttribute('aria-current');
          link.className = 'group flex items-center justify-between px-space-sm py-space-xs rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all';
        }
      });

      // Update badge counts dynamically in the nav
      const metrics = this.getMetrics();
      const liveMapBadge = document.querySelector('nav a[data-path="live-risk-map"] span.rounded');
      if (liveMapBadge) {
        liveMapBadge.textContent = metrics.criticalHotspots;
      }
      const notifBadge = document.querySelector('nav a[data-path="alerts-and-notifications"] span.rounded');
      if (notifBadge) {
        notifBadge.textContent = metrics.pendingVerification;
      }
    },

    // Path resolution helper for relative URLs
    getBasePath: function () {
      const path = window.location.pathname;
      if (path.includes('/stitch_roadshield_civic_safety_portal/')) {
        return '../../';
      }
      return './';
    },

    // Bind connectivity widgets and offline airplane mode toggle
    bindConnectivityWidgets: function () {
      const offlineBtn = document.getElementById('toggle-offline-btn');
      const connLabel = document.getElementById('conn-status-label');
      const queueCount = document.getElementById('queue-count');

      const updateUI = () => {
        const isOffline = this.isOfflineMode();
        const queue = this.getOfflineQueue();

        if (connLabel) {
          if (isOffline) {
            connLabel.textContent = 'NETWORK: SIMULATED OFFLINE';
            connLabel.className = 'text-error font-semibold flex items-center gap-1';
          } else {
            connLabel.textContent = 'NETWORK: CONNECTED (CIVIC CLOUD)';
            connLabel.className = 'text-primary-container font-semibold flex items-center gap-1';
          }
        }

        if (offlineBtn) {
          if (isOffline) {
            offlineBtn.classList.add('bg-error-container', 'text-on-error-container', 'border-error');
            offlineBtn.innerHTML = '<span class="material-symbols-outlined text-[16px] text-error">wifi_off</span><span>Reconnect to Cloud</span>';
          } else {
            offlineBtn.classList.remove('bg-error-container', 'text-on-error-container', 'border-error');
            offlineBtn.innerHTML = '<span class="material-symbols-outlined text-[16px] text-secondary">airplanemode_active</span><span>Simulate Offline Mode (Airplane Test)</span>';
          }
        }

        if (queueCount) {
          queueCount.textContent = `${queue.length} PENDING ${queue.length > 0 ? '(CLICK TO SYNC)' : ''}`;
          if (queue.length > 0) {
            queueCount.parentElement.classList.add('cursor-pointer', 'underline');
            queueCount.parentElement.onclick = () => {
              if (this.isOfflineMode()) {
                this.showToast('Please reconnect network before synchronizing queue.', 'warning');
              } else {
                const res = this.syncOfflineQueue();
                this.showToast(`Synced ${res.syncedCount} queued reports to cloud!`, 'cloud_done');
                updateUI();
                setTimeout(() => window.location.reload(), 600);
              }
            };
          }
        }
      };

      if (offlineBtn) {
        offlineBtn.addEventListener('click', () => {
          const newState = !this.isOfflineMode();
          this.setOfflineMode(newState);
          this.showToast(newState ? 'Offline mode enabled. Reports will be saved locally.' : 'Reconnected to civic network.', newState ? 'airplanemode_active' : 'wifi');
          updateUI();
        });
      }

      updateUI();
    },

    // Global toast message
    showToast: function (msg, icon = 'info') {
      const existing = document.getElementById('roadshield-toast');
      if (existing) existing.remove();

      const toast = document.createElement('div');
      toast.id = 'roadshield-toast';
      toast.className = 'fixed bottom-6 right-6 z-50 bg-surface-container-highest text-primary px-4 py-2.5 rounded shadow-2xl font-telemetry-sm text-telemetry-sm flex items-center gap-2 border border-primary-container/40 animate-bounce';
      toast.innerHTML = `<span class="material-symbols-outlined text-primary-container text-[18px]">${icon}</span><span>${msg}</span>`;
      document.body.appendChild(toast);
      setTimeout(() => {
        if (toast && toast.parentNode) toast.remove();
      }, 3500);
    }
  };

  return RoadShieldCore;
});
