import React from "react";

// 16:9 single-page poster for print or screen (1920x1080 base). Uses Tailwind classes.
// Tip: In the preview, use full width. For export, print to PDF at landscape A4 or 16:9.

// --- Simple utility + smoke tests (non-breaking) ---
function calculatePilotTotals() {
  const perHubItems = [
    350000, // Tablets (25 @ 14k)
    220000, // Laptop + projector + charging cart
    90000,  // Routers, UPS, cabling, furniture
    300000, // Solar + battery (~1 kW)
    50000,  // Offline server & storage
    75000,  // Content licensing/localization
    60000,  // Connectivity
    144000, // Facilitator stipend
    80000,  // Teacher training & CPD
    60000,  // Maintenance/spares
  ];
  const perHubSubtotal = perHubItems.reduce((a, b) => a + b, 0); // 1,429,000
  const hubs = 10;
  const totalHubs = perHubSubtotal * hubs; // 14,290,000
  const contingency = Math.round(totalHubs * 0.1); // 1,429,000
  const totalBDT = totalHubs + contingency; // 15,719,000
  return { perHubSubtotal, totalHubs, contingency, totalBDT, perHubItems };
}

function runSmokeTests() {
  // 1) Budget arithmetic remains consistent with the table
  const { perHubSubtotal, totalHubs, contingency, totalBDT, perHubItems } = calculatePilotTotals();
  console.assert(perHubSubtotal === 1429000, `perHubSubtotal expected 1429000, got ${perHubSubtotal}`);
  console.assert(totalHubs === 14290000, `totalHubs expected 14290000, got ${totalHubs}`);
  console.assert(contingency === 1429000, `contingency expected 1429000, got ${contingency}`);
  console.assert(totalBDT === 15719000, `totalBDT expected 15719000, got ${totalBDT}`);

  // 1a) Per-hub subtotal equals manual sum (extra test)
  const manualSum = [350000,220000,90000,300000,50000,75000,60000,144000,80000,60000].reduce((a,b)=>a+b,0);
  console.assert(perHubSubtotal === manualSum, `Manual sum mismatch: ${manualSum} vs ${perHubSubtotal}`);

  // 2) USD estimate is within a reasonable band for BDT→USD at 120
  const usd = totalBDT / 120;
  console.assert(usd > 130000 && usd < 132000, `USD approx out of range: ${usd}`);

  // 3) Layout: poster container should be scrollable when content exceeds viewport
  if (typeof document !== 'undefined') {
    const poster = document.getElementById('poster');
    console.assert(poster && poster.className.includes('overflow-y-auto'), 'Poster must allow vertical scrolling');
    console.assert(poster && !poster.className.includes('overflow-hidden'), 'Poster must not be overflow-hidden');

    // 4) DOM content tests: totals and KPI visibility
    const totalCell = document.getElementById('total-bdt-cell');
    console.assert(totalCell && totalCell.textContent?.includes('15,719,000'), 'Total BDT cell should show 15,719,000');

    const uptime = document.getElementById('uptime-kpi');
    console.assert(uptime && uptime.innerHTML.includes('&gt;70%'), 'Uptime KPI should escape > as &gt;');

    const budgetTable = document.getElementById('budget-table');
    console.assert(!!budgetTable, 'Budget table should exist');
  }
}

export default function Poster() {
  // Run smoke tests in the browser; harmless in production (console.assert only).
  React.useEffect(() => {
    try { runSmokeTests(); } catch (e) { console.warn("Smoke tests failed:", e); }
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <div id="poster" className="w-full h-screen bg-white overflow-y-auto">
        {/* Header */}
        <div className="bg-emerald-600 text-white px-10 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold leading-tight">
              Bridging the Digital Gap for Village Students
            </h1>
            <p className="text-sm opacity-90">Rajshahi, Bangladesh • One‑page plan</p>
          </div>
          <div className="text-right text-xs max-w-[40%] opacity-95">
            <p>
              Goal: Equitable access to devices, skills, and learning content for rural
              learners through school‑ and union‑based hubs, low‑cost connectivity, and
              teacher enablement.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 p-8 text-neutral-900 leading-snug">
          {/* Deep overview of the problem */}
          <section className="col-span-6 bg-neutral-50 rounded-xl p-5 border border-neutral-200">
            <h2 className="text-xl font-semibold mb-3">Deep overview of the problem</h2>
            <ul className="list-disc ml-5 space-y-2 text-[13px]">
              <li>
                <span className="font-medium">Access & affordability:</span> Many rural
                students rely on shared/basic phones; home broadband is rare; device costs
                compete with essentials.
              </li>
              <li>
                <span className="font-medium">Usage gap:</span> Even where coverage exists,
                students lack regular, <i>meaningful</i> access to devices, safe internet,
                and localized content that matches the curriculum.
              </li>
              <li>
                <span className="font-medium">School infrastructure:</span> Unreliable power,
                limited computer labs, and few trained teachers constrain ICT‑enabled
                learning, especially in government primary & secondary schools.
              </li>
              <li>
                <span className="font-medium">Inclusion:</span> Girls face disproportionate
                barriers (device ownership norms, safety concerns); learners with
                disabilities rarely find accessible content.
              </li>
              <li>
                <span className="font-medium">Climate & continuity:</span> Heatwaves and
                floods interrupt schooling; digital modalities for catch‑up and remote
                learning are underdeveloped.
              </li>
            </ul>
          </section>

          {/* What is causing it */}
          <section className="col-span-6 bg-neutral-50 rounded-xl p-5 border border-neutral-200">
            <h2 className="text-xl font-semibold mb-3">What is causing it</h2>
            <ul className="list-disc ml-5 space-y-2 text-[13px]">
              <li>
                <span className="font-medium">Cost stack:</span> Device + data + power +
                maintenance form a cumulative barrier for low‑income rural households.
              </li>
              <li>
                <span className="font-medium">Coverage vs. quality:</span> Mobile networks
                reach most unions, but speeds, latency, and SIM data caps limit rich
                learning use (video, interactive apps).
              </li>
              <li>
                <span className="font-medium">Capacity gap:</span> Limited teacher CPD on
                digital pedagogy; scarce tech support at school/union level.
              </li>
              <li>
                <span className="font-medium">Content gap:</span> Shortage of Bengali,
                curriculum‑aligned offline/low‑bandwidth content and accessible formats.
              </li>
              <li>
                <span className="font-medium">Gender & social norms:</span> Girls less likely
                to own smartphones or be allowed unsupervised access; safety/harassment
                concerns reduce participation.
              </li>
            </ul>
          </section>

          {/* Solutions */}
          <section className="col-span-7 bg-white rounded-xl p-5 border border-emerald-200">
            <h2 className="text-xl font-semibold mb-3">Feasible, scalable solutions (Rajshahi pilot)</h2>
            <ol className="list-decimal ml-5 space-y-2 text-[13px]">
              <li>
                <span className="font-medium">Union Digital Learning Hubs (UDLHs):</span>
                Convert existing Union Digital Centers or school rooms into tech hubs with
                20–30 shared tablets, a laptop, pico‑projector, routers, and a local
                offline server (Raspberry Pi + Kolibri) caching Bengali, curriculum‑aligned
                content (textbooks, videos, quizzes). Solar + battery kits ensure uptime.
              </li>
              <li>
                <span className="font-medium">Low‑cost connectivity bundle:</span> Partner with
                MNO/ISP for education APNs or zero‑rated learning sites; use community Wi‑Fi
                (point‑to‑point) where fiber exists; schedule sync windows to refresh the
                local content cache overnight to save data.
              </li>
              <li>
                <span className="font-medium">Teacher enablement & facilitators:</span>
                3‑day onboarding + monthly micro‑PD on digital pedagogy, device care, online
                safety; stipend one local youth facilitator per hub for operations &
                mentoring.
              </li>
              <li>
                <span className="font-medium">Girls‑first inclusion measures:</span> Dedicated
                girls’ hours, family orientation sessions, community women mentors, and
                privacy/safety features on devices.
              </li>
              <li>
                <span className="font-medium">Accessible‑by‑design content:</span> Bengali UI,
                text‑to‑speech for readers, sign‑supported videos, dyslexia‑friendly
                typography; prioritize offline‑first apps and SMS/IVR for basic phones.
              </li>
              <li>
                <span className="font-medium">Monitoring & learning:</span> Lightweight usage
                analytics from the local server; quarterly assessments aligned to BANBEIS/SDG‑4
                indicators; public dashboard at union and upazila levels.
              </li>
            </ol>
          </section>

          {/* Budget */}
          <section className="col-span-5 bg-white rounded-xl p-5 border border-emerald-200">
            <h2 className="text-xl font-semibold mb-3">Pilot budget (10 hubs, 12 months)</h2>
            <p className="text-[11px] mb-2">
              Assumption: 1 USD ≈ BDT 120. Costs indicative; negotiate locally for bulk.
            </p>
            <table id="budget-table" className="w-full text-[12px]">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-1">Line item</th>
                  <th className="py-1">Per hub (BDT)</th>
                  <th className="py-1">10 hubs (BDT)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td>Tablets (25 @ BDT 14k)</td>
                  <td>350,000</td>
                  <td>3,500,000</td>
                </tr>
                <tr>
                  <td>Laptop + projector + charging cart</td>
                  <td>220,000</td>
                  <td>2,200,000</td>
                </tr>
                <tr>
                  <td>Routers, UPS, cabling, furniture</td>
                  <td>90,000</td>
                  <td>900,000</td>
                </tr>
                <tr>
                  <td>Solar + battery backup (~1 kW)</td>
                  <td>300,000</td>
                  <td>3,000,000</td>
                </tr>
                <tr>
                  <td>Offline server & storage (Raspberry Pi + SSD)</td>
                  <td>50,000</td>
                  <td>500,000</td>
                </tr>
                <tr>
                  <td>Content licensing/localization fund</td>
                  <td>75,000</td>
                  <td>750,000</td>
                </tr>
                <tr>
                  <td>Connectivity (data/backhaul)</td>
                  <td>60,000</td>
                  <td>600,000</td>
                </tr>
                <tr>
                  <td>Facilitator stipend (BDT 12k × 12 mo)</td>
                  <td>144,000</td>
                  <td>1,440,000</td>
                </tr>
                <tr>
                  <td>Teacher training & CPD</td>
                  <td>80,000</td>
                  <td>800,000</td>
                </tr>
                <tr>
                  <td>Maintenance/spares</td>
                  <td>60,000</td>
                  <td>600,000</td>
                </tr>
                <tr>
                  <td className="font-medium">Subtotal</td>
                  <td className="font-medium">1,429,000</td>
                  <td className="font-medium">14,290,000</td>
                </tr>
                <tr>
                  <td>Contingency (10%)</td>
                  <td>142,900</td>
                  <td>1,429,000</td>
                </tr>
                <tr>
                  <td className="font-semibold">Total (BDT)</td>
                  <td className="font-semibold">1,571,900</td>
                  <td id="total-bdt-cell" className="font-semibold">15,719,000</td>
                </tr>
                <tr>
                  <td className="italic">Total (approx. USD)</td>
                  <td className="italic">~$13,100</td>
                  <td className="italic">~$130,990</td>
                </tr>
              </tbody>
            </table>
            <p className="text-[11px] mt-2">
              Unit costs vary by vendor; solar may be offset by grants/CSR.
            </p>
          </section>

          {/* Impact & KPIs */}
          <section className="col-span-12 bg-neutral-50 rounded-xl p-5 border border-neutral-200">
            <h2 className="text-xl font-semibold mb-3">Expected outcomes & KPIs (12 months)</h2>
            <div className="grid grid-cols-4 gap-4 text-[13px]">
              <div className="bg-white rounded-lg p-3 border">
                <p className="font-medium">2,500+ learners</p>
                <p>reach (10 hubs × 250 regular users), 50% girls</p>
              </div>
              <div className="bg-white rounded-lg p-3 border">
                <p className="font-medium">+20–30%</p>
                <p>increase in digital skills baseline (pre/post assessments)</p>
              </div>
              <div id="uptime-kpi" className="bg-white rounded-lg p-3 border">
                <p className="font-medium">&gt;70% uptime</p>
                <p>even during outages via solar + offline cache</p>
              </div>
              <div className="bg-white rounded-lg p-3 border">
                <p className="font-medium">Teacher adoption</p>
                <p>2+ digital lessons/week per participating teacher</p>
              </div>
            </div>
          </section>

          {/* References */}
          <section className="col-span-12 bg-white rounded-xl p-5 border border-neutral-200">
            <h2 className="text-xl font-semibold mb-2">References (data sources)</h2>
            <ul className="list-disc ml-5 text-[11px] space-y-1">
              <li>
                World Bank Data: Individuals using the Internet (% of population) —
                https://data.worldbank.org/indicator/IT.NET.USER.ZS
              </li>
              <li>
                BTRC (Bangladesh Telecommunication Regulatory Commission), Internet
                Subscribers & Annual Reports — https://btrc.gov.bd
              </li>
              <li>
                GSMA, <i>The Mobile Gender Gap Report 2024</i> —
                https://www.gsma.com/r/wp-content/uploads/2024/05/The-Mobile-Gender-Gap-Report-2024.pdf
              </li>
              <li>
                BBS, <i>Household Income and Expenditure Survey (HIES) 2022</i> —
                https://bbs.portal.gov.bd/.../HIES%202022.pdf
              </li>
              <li>
                BANBEIS, <i>Bangladesh Education Statistics 2022</i> —
                https://banbeis.portal.gov.bd/.../Bangladesh%20Education%20Statistics%202022.pdf
              </li>
              <li>
                ITU, <i>Measuring digital development: Facts & Figures 2023</i> —
                https://www.itu.int/itu-d/reports/statistics/facts-figures-2023/
              </li>
              <li>
                UNESCO, Digital learning & ICT in Education policy resources —
                https://www.unesco.org/en/digital-education
              </li>
              <li>
                DataReportal, <i>Digital 2024: Bangladesh</i> — https://datareportal.com/reports/digital-2024-bangladesh
              </li>
            </ul>
            <p className="text-[10px] mt-2 text-neutral-600">
              Note: Where district‑level data for Rajshahi are limited, national datasets
              are used as proxies with rural emphasis; validate locally during pilot
              inception.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 -mt-2 text-[10px] text-neutral-600 flex justify-between">
          <p>
            Implementation partners (illustrative): Upazila Education Office • Union Digital
            Centers • Local NGOs • MNO/ISPs • University of Rajshahi (ed‑tech research)
          </p>
          <p>© 2025 — Draft for review</p>
        </div>
      </div>
    </div>
  );
}
