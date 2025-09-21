import React from "react";

// 16:9 single-page poster for print or screen (1920x1080 base). Uses Tailwind classes.
// Tip: In the preview, use full width. For export, print to PDF at landscape A4 or 16:9.

// --- Utility + smoke tests (BYOD version: no new devices) ---
function calculatePilotTotals() {
  // BYOD (Bring Your Own Device) pilot — no hardware purchases, only enablement & data support
  // Default horizon: 3 months, single school in Rajshahi
  const items = {
    dataStarterPacks: 25000,       // Starter top-ups for needy students (e.g., 250 × ৳100 once)
    teacherCPD: 18000,             // 2‑day onboarding + lesson templates + micro‑PD
    parentStudentOrientation: 6000, // Community/parents sessions + posters/QR guides
    monitoringEvaluation: 6000,     // Baseline/endline quizzes, printing & forms
    contentCuration: 7000,          // Bengali playlist curation + QR handouts + moderation setup
    commsSMS: 4000,                 // SMS nudges/attendance for practice streaks
  };
  const subtotal = Object.values(items).reduce((a, b) => a + b, 0); // 61,000
  const contingency = Math.round(subtotal * 0.12);                  // 7,320 (~12% to absorb price swings)
  const totalBDT = subtotal + contingency;                          // 68,320
  return { items, subtotal, contingency, totalBDT };
}

function runSmokeTests() {
  const { subtotal, contingency, totalBDT } = calculatePilotTotals();
  // Budget math
  console.assert(subtotal === 61000, `subtotal expected 61000, got ${subtotal}`);
  console.assert(contingency === 7320, `contingency expected 7320, got ${contingency}`);
  console.assert(totalBDT === 68320, `totalBDT expected 68320, got ${totalBDT}`);
  console.assert(totalBDT <= 300000, `totalBDT must be ≤ 300000, got ${totalBDT}`);
  // USD sanity (BDT→USD at 120)
  const usd = totalBDT / 120;
  console.assert(usd > 450 && usd < 700, `USD approx out of range: ${usd}`);
  // Layout + DOM hooks remain present
  if (typeof document !== 'undefined') {
    const poster = document.getElementById('poster');
    console.assert(poster && poster.className.includes('overflow-y-auto'), 'Poster should be scrollable');
    const totalCell = document.getElementById('total-bdt-cell');
    console.assert(totalCell && totalCell.textContent?.includes('68,320'), 'Total BDT cell should show 68,320');
    const stack = document.getElementById('learning-stack');
    console.assert(!!stack, 'Learning stack section should exist');
    const uptime = document.getElementById('uptime-kpi');
    console.assert(uptime && uptime.innerHTML.includes('&gt;70%'), 'Uptime KPI must escape > as &gt;');
  }
}

export default function Poster() {
  React.useEffect(() => {
    try { runSmokeTests(); } catch (e) { console.warn('Smoke tests failed:', e); }
  }, []);

  const { items, subtotal, contingency, totalBDT } = calculatePilotTotals();

  return (
    <div className="w-full min-h-screen bg-white">
      <div id="poster" className="w-full bg-white overflow-y-auto">
        {/* Header */}
        <div className="bg-emerald-600 text-white px-10 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold leading-tight">Rajshahi BYOD EdTech Pilot</h1>
            <p className="text-sm opacity-90">No new hardware • Use students’ smartphones & existing lab • Within <b>≤ ৳3,00,000</b> cap</p>
          </div>
          <div className="text-right text-xs max-w-[45%] opacity-95">
            <p>
              Goal: embed digital practice in daily academics using learners’ own smartphones
              + school lab PCs (if available), with minimal cost: data support, teacher
              enablement, curated Bengali resources, and habit‑building routines.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 p-4 text-neutral-900 leading-snug">
          {/* Problem & local lens */}
          <section className="col-span-6 bg-neutral-50 rounded-xl p-5 border border-neutral-200">
            <h2 className="text-xl font-semibold mb-3">Why this matters (local lens)</h2>
            <ul className="list-disc ml-5 space-y-2 text-[13px]">
              <li>
                <span className="font-medium">BYOD reality:</span> Most secondary students have
                access to a smartphone at home; the barrier is structured usage, data cost,
                and guidance — not necessarily device ownership.
              </li>
              <li>
                <span className="font-medium">Continuity & equity:</span> A light data subsidy,
                offline‑first playlists, and clear routines turn sporadic phone use into
                consistent learning habits across genders.
              </li>
              <li>
                <span className="font-medium">Curriculum alignment:</span> Weekly practice tied
                to NCTB sequences keeps adoption high and teachers on board.
              </li>
            </ul>
          </section>

          {/* Solution design */}
          <section className="col-span-6 bg-neutral-50 rounded-xl p-5 border border-neutral-200">
            <h2 className="text-xl font-semibold mb-3">Pilot design (BYOD • 1 school • 3 months)</h2>
            <ul className="list-disc ml-5 space-y-2 text-[13px]">
              <li>
                <span className="font-medium">Smartphone‑first learning:</span> Students practice
                on personal phones during supervised class slots and at home; existing lab
                PCs (if any) used for projection and catch‑up groups.
              </li>
              <li>
                <span className="font-medium">Data support (targeted):</span> One‑time starter
                top‑ups for learners with need; Wi‑Fi use where available; encourage
                download/caching while on school Wi‑Fi.
              </li>
              <li>
                <span className="font-medium">Teacher enablement:</span> 2‑day onboarding +
                monthly micro‑PD; ready‑to‑use lesson cards and homework templates.
              </li>
              <li>
                <span className="font-medium">Girls‑first measures:</span> Reserved lab/club
                hours; safeguarding briefings; optional women mentor.
              </li>
              <li>
                <span className="font-medium">Parent buy‑in:</span> Short orientation + SMS
                nudges to maintain practice streaks.
              </li>
            </ul>
          </section>

          {/* Learning stack */}
          <section id="learning-stack" className="col-span-7 bg-white rounded-xl p-5 border border-emerald-200">
            <h2 className="text-xl font-semibold mb-3">Learning stack (smartphone apps & links)</h2>
            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <div className="bg-neutral-50 rounded-lg p-3 border">
                <p className="font-medium">Math practice: GonitZoggo</p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>Weekly sets tied to NCTB chapters, classes 6–10.</li>
                  <li>Home practice + in‑class review; leaderboard by section.</li>
                  <li>Low‑data mode tips & caching while on school Wi‑Fi.</li>
                </ul>
              </div>
              <div className="bg-neutral-50 rounded-lg p-3 border">
                <p className="font-medium">Supporting resources</p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>10 Minute School & Khan Academy Bangla (curated clips).</li>
                  <li>Shikkhok Batayon & MuktoPaath (teacher micro‑courses, lesson ideas).</li>
                  <li>Optional: Kolibri on existing lab PC for offline sessions.</li>
                </ul>
              </div>
              <div className="bg-neutral-50 rounded-lg p-3 border col-span-2">
                <p className="font-medium">Weekly cadence</p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>2× digital lessons/week/section (math or science).</li>
                  <li>2× homework sets (smartphone) with QR links & due dates.</li>
                  <li>Monthly quiz day (phone‑based) + public recognition for streaks.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Budget */}
          <section className="col-span-5 bg-white rounded-xl p-5 border border-emerald-200">
            <h2 className="text-xl font-semibold mb-3">Lean pilot budget (BYOD • 3 months)</h2>
            <p className="text-[11px] mb-2">All costs in BDT; indicative and negotiable. No device/infrastructure purchases.</p>
            <table id="budget-table" className="w-full text-[12px]">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-1">Line item</th>
                  <th className="py-1 text-right">Cost (BDT)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><td>Starter data packs (need‑based)</td><td className="text-right">25,000</td></tr>
                <tr><td>Teacher CPD & templates</td><td className="text-right">18,000</td></tr>
                <tr><td>Parent & student orientation</td><td className="text-right">6,000</td></tr>
                <tr><td>Monitoring & evaluation</td><td className="text-right">6,000</td></tr>
                <tr><td>Content curation & QR handouts</td><td className="text-right">7,000</td></tr>
                <tr><td>SMS nudges (attendance/streaks)</td><td className="text-right">4,000</td></tr>
                <tr className="font-medium"><td>Subtotal</td><td className="text-right">61,000</td></tr>
                <tr><td>Contingency (12%)</td><td className="text-right">7,320</td></tr>
                <tr className="font-semibold"><td>Total (BDT)</td><td id="total-bdt-cell" className="text-right font-semibold">68,320</td></tr>
              </tbody>
            </table>
            <p className="text-[11px] mt-2">Well within cap: <b>≤ ৳3,00,000</b>. Direct costs focus on data support, enablement, and content.</p>
          </section>

          {/* Outcomes & KPIs */}
          <section className="col-span-12 bg-neutral-50 rounded-xl p-5 border border-neutral-200">
            <h2 className="text-xl font-semibold mb-3">Outcomes & KPIs (track monthly)</h2>
            <div className="grid grid-cols-4 gap-4 text-[13px]">
              <div className="bg-white rounded-lg p-3 border">
                <p className="font-medium">150–200 learners</p>
                <p>regular users across grades 6–10; ≥50% girls</p>
              </div>
              <div className="bg-white rounded-lg p-3 border">
                <p className="font-medium">+20–30%</p>
                <p>growth in math practice accuracy & digital skills (pre/post)</p>
              </div>
              <div id="uptime-kpi" className="bg-white rounded-lg p-3 border">
                <p className="font-medium">&gt;70% uptime</p>
                <p>via caching on Wi‑Fi, low‑data modes, and simple schedules</p>
              </div>
              <div className="bg-white rounded-lg p-3 border">
                <p className="font-medium">Habit formation</p>
                <p>≥2 digital lessons/week/section + homework streaks</p>
              </div>
            </div>
          </section>

          {/* References */}
          <section className="col-span-12 bg-white rounded-xl p-5 border border-neutral-200">
            <h2 className="text-xl font-semibold mb-2">References & platforms</h2>
            <ul className="list-disc ml-5 text-[11px] space-y-1">
              <li>World Bank — Internet usage (% pop.)</li>
              <li>BTRC — Internet subscribers & annual reports</li>
              <li>GSMA — Mobile Gender Gap Report 2024</li>
              <li>BBS — HIES 2022; BANBEIS — Education Statistics 2022</li>
              <li>Platforms: GonitZoggo • 10 Minute School • Khan Academy Bangla • Shikkhok Batayon • MuktoPaath • (Optional) Kolibri on school PC</li>
            </ul>
            <p className="text-[10px] mt-2 text-neutral-600">Use national data as proxies where district data are scarce; validate at school inception.</p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 -mt-2 text-[10px] text-neutral-600 flex justify-between">
          <p>
            Partners (illustrative): Head Teacher • Upazila Education Office • Local NGO • MNO/ISP (for starter data) • University of Rajshahi
          </p>
          <p>© 2025 — BYOD pilot draft</p>
        </div>
      </div>
    </div>
  );
}
