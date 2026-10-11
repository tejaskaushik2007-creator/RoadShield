/**
 * End-to-End Workflow Verification Test for RoadShield
 * Tests all 10 steps of Section 11: Final Test
 */

// Mock localStorage for Node.js test environment
const storageMock = {};
global.localStorage = {
  getItem: (key) => storageMock[key] || null,
  setItem: (key, val) => { storageMock[key] = String(val); },
  removeItem: (key) => { delete storageMock[key]; },
  clear: () => { Object.keys(storageMock).forEach(k => delete storageMock[k]); }
};
global.window = {
  dispatchEvent: () => {}
};
global.CustomEvent = class {
  constructor(name, opts) {
    this.name = name;
    this.detail = opts ? opts.detail : null;
  }
};

const RoadShield = require('../stitch_roadshield_civic_safety_portal/roadshield-core.js');

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`  ✓ ${message}`);
}

console.log('==================================================');
console.log('ROADSHIELD // E2E HACKATHON WORKFLOW VERIFICATION');
console.log('==================================================\n');

// STEP 1: A citizen submits a pothole report
console.log('[STEP 1] Citizen submits pothole report...');
RoadShield.setCurrentRole('citizen');
const initialMetrics = RoadShield.getMetrics();
const initialTotal = initialMetrics.totalReports;

const reportData = {
  category: 'pothole',
  title: 'Dangerous Pothole on 5th Ave',
  location: '5th Ave & Pine St, Ward 4',
  ward: 'Ward 4',
  severity: 'critical',
  description: 'Deep 7-inch asphalt crater near crosswalk causing vehicle swerving.',
  speedContext: 'arterial',
  pedestrianExposure: 'high',
  schoolZone: true,
  coordinates: { lat: 40.7150, lng: -74.0080, x: 720, y: 480 }
};

const createdReport = RoadShield.createReport(reportData);
assert(createdReport !== null, 'Report created successfully');

// STEP 2: The application generates a unique report ID
console.log('\n[STEP 2] Verifying generated unique report ID...');
assert(typeof createdReport.id === 'string' && createdReport.id.startsWith('RS-'), `Generated ID format is valid: #${createdReport.id}`);

// STEP 3: The report appears in the reports table
console.log('\n[STEP 3] Verifying report appears in database & reports table...');
const allReports = RoadShield.getAllReports();
const foundInList = allReports.find(r => r.id === createdReport.id);
assert(foundInList !== undefined, `Report #${createdReport.id} is present in reports repository`);
assert(allReports.length === initialTotal + 1, `Total reports count incremented to ${allReports.length}`);

// STEP 4: The report details page displays the submitted information
console.log('\n[STEP 4] Verifying report details and explainable risk calculation...');
const details = RoadShield.getReportById(createdReport.id);
assert(details.location === reportData.location, `Location matches: ${details.location}`);
assert(details.category === 'pothole', `Category matches: ${details.category}`);
assert(details.riskScore > 0 && details.riskScore <= 100, `Explainable risk score calculated: ${details.riskScore}/100 [${details.riskTier}]`);
assert(details.riskBreakdown.factors.length === 4, 'Score contains transparent 4-factor breakdown');
console.log(`    Risk Factors:`);
details.riskBreakdown.factors.forEach(f => {
  console.log(`    - ${f.name}: ${f.points}/${f.max} pts (${f.explanation})`);
});

// STEP 5: A verification officer verifies the report
console.log('\n[STEP 5] Verification Officer verifies report...');
RoadShield.setCurrentRole('verification_officer');
const verifiedReport = RoadShield.updateReport(createdReport.id, {
  status: 'verified',
  transitionNote: 'Photo photogrammetry verified by Officer Henderson.'
});
assert(verifiedReport.status === 'verified', `Status updated to verified: ${verifiedReport.statusLabel}`);
assert(verifiedReport.timeline.length >= 2, 'Timeline audit trail records verification entry');

// STEP 6: An operations manager assigns the report to a department
console.log('\n[STEP 6] Operations Manager assigns report to department & crew...');
RoadShield.setCurrentRole('operations_manager');
const assignedReport = RoadShield.updateReport(createdReport.id, {
  status: 'assigned',
  assignedDepartment: 'PW-04 [Rapid Response]',
  assignedCrew: 'Rapid Unit #04 (Foreman Delgado)',
  priority: 'CRITICAL',
  targetDate: '2026-10-12',
  transitionNote: 'Dispatched PW-04 Rapid Response via Highway 14.'
});
assert(assignedReport.status === 'assigned', `Status is assigned: ${assignedReport.statusLabel}`);
assert(assignedReport.assignedDepartment === 'PW-04 [Rapid Response]', `Department assigned: ${assignedReport.assignedDepartment}`);

// STEP 7: A field team updates the task status
console.log('\n[STEP 7] Field Response Team updates status to Action in Progress...');
RoadShield.setCurrentRole('field_team');
const inProgressReport = RoadShield.updateReport(createdReport.id, {
  status: 'in_progress',
  transitionNote: 'Crew arrived on site; cold milling initiated.'
});
assert(inProgressReport.status === 'in_progress', `Status is in_progress: ${inProgressReport.statusLabel}`);

// STEP 8: The team records completion evidence
console.log('\n[STEP 8] Team records repair completion evidence and checklist...');
const evidenceReport = RoadShield.updateReport(createdReport.id, {
  status: 'awaiting_inspection',
  evidence: {
    beforeImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
    inspectionNotes: 'Asphalt milled and hot-mix compacted to 97.2% density.',
    checklist: {
      bulkDensity: true,
      photosValidated: true,
      reinspectionScheduled: true
    }
  },
  transitionNote: 'Repair completed. Geotagged after-photo submitted for final inspection.'
});
assert(evidenceReport.status === 'awaiting_inspection', `Status is awaiting_inspection: ${evidenceReport.statusLabel}`);
assert(evidenceReport.evidence.checklist.bulkDensity === true, 'Quality checklist recorded');

// STEP 9: The hazard is marked resolved after the appropriate verification
console.log('\n[STEP 9] Certifying inspector verifies resolution & closes incident...');
RoadShield.setCurrentRole('operations_manager');
const resolvedReport = RoadShield.updateReport(createdReport.id, {
  status: 'resolved',
  transitionNote: 'Repair certified compliant with municipal highway standard. Closed.'
});
assert(resolvedReport.status === 'resolved', `Hazard marked resolved: ${resolvedReport.statusLabel}`);

// STEP 10: The dashboard and analytics reflect the updated data
console.log('\n[STEP 10] Verifying metrics & analytics reflect updated resolution...');
const finalMetrics = RoadShield.getMetrics();
assert(finalMetrics.resolvedHazards >= 1, `Resolved hazards count reflects update: ${finalMetrics.resolvedHazards}`);
assert(finalMetrics.totalReports === initialTotal + 1, `Total reports metric maintained: ${finalMetrics.totalReports}`);

// OFFLINE QUEUE TEST
console.log('\n[EXTRA TEST] Testing Offline Reporting & Queue Sync...');
RoadShield.setOfflineMode(true);
assert(RoadShield.isOfflineMode() === true, 'Simulated offline mode enabled');
const offlineDraft = RoadShield.createReport({
  category: 'lighting',
  title: 'Offline Dark Street Warning',
  location: 'Pine St & 8th, Ward 4',
  severity: 'moderate'
});
assert(offlineDraft.status === 'offline_draft', 'Offline draft held in queue with status offline_draft');
const queue = RoadShield.getOfflineQueue();
assert(queue.length === 1, `Offline draft queue has 1 pending item (#${queue[0].id})`);

// Reconnect & Sync
RoadShield.setOfflineMode(false);
const syncResult = RoadShield.syncOfflineQueue();
assert(syncResult.syncedCount === 1, 'Successfully synchronized 1 queued draft to server');
const postSyncQueue = RoadShield.getOfflineQueue();
assert(postSyncQueue.length === 0, 'Offline queue is cleared after sync');
const syncedReport = RoadShield.getReportById(offlineDraft.id);
assert(syncedReport.status === 'awaiting_verification', `Synced report promoted to central triage: ${syncedReport.statusLabel}`);

console.log('\n==================================================');
console.log('🎉 ALL 10 E2E WORKFLOW TEST STEPS PASSED PERFECTLY!');
console.log('==================================================\n');
