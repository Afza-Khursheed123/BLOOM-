import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Activity,
  Layers,
  Camera,
  UserCheck,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { mockFicusScans } from '../../data/mockAdminData';
import { useAdminInventory } from '../../context/AdminInventoryContext';

export const AdminBatchDetailPage: React.FC = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const { batches, setReconcilingBatch } = useAdminInventory();

  const [activeChartMetric, setActiveChartMetric] = useState<'quantity' | 'health' | 'maturity' | 'gradeA'>('health');
  const [timeRange, setTimeRange] = useState<'all' | '7days' | 'custom'>('all');

  // Find target batch by batchId or default to Ficus04
  const batch = batches.find((b) => batchId && b.id.toLowerCase().includes(batchId.toLowerCase())) || batches[0];


  return (
    <div className="space-y-8 text-left">
      {/* 5.1 Breadcrumb & Batch Identity Header */}
      <div className="space-y-3">
        <Link
          to="/admin/inventory"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1E3A2F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Live Inventory &amp; Batches</span>
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-gray-200/80 shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold bg-[#E8EDEA] text-[#1E3A2F] px-2 py-0.5 rounded border border-[#1E3A2F]/10">
                {batch.id}
              </span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">
                Requires Inspection
              </span>
              <span className="text-xs text-gray-400">14 scans recorded</span>
            </div>
            <h1 className="font-serif italic text-2xl sm:text-3xl text-[#1E3A2F]">
              {batch.species}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {batch.commonName} • Plant Date: {batch.plantDate} • {batch.zone} / {batch.rack} • Stage: {batch.stage}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert('Exporting batch historical scan logs (CSV)...')}
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Export Batch History
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setReconcilingBatch(batch)}
              icon={<AlertTriangle className="w-3.5 h-3.5" />}
            >
              Reconcile Count
            </Button>
          </div>
        </div>
      </div>

      {/* 5.2 Four Detailed Diagnostic Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Live Count & Saleable Ratio */}
        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex justify-between items-center text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <span>Live Count &amp; Saleable</span>
            <Layers className="w-4 h-4 text-[#3A7D6A]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-semibold text-[#1E3A2F]">
                2,420
              </span>
              <span className="text-xs text-gray-400">total units</span>
            </div>
            <p className="text-xs text-[#3A7D6A] font-medium mt-1">
              1,840 Saleable plants (76% market-ready)
            </p>
          </div>
          <div className="w-full bg-[#F4F6F4] rounded-full h-2 overflow-hidden">
            <div className="bg-[#3A7D6A] h-full rounded-full" style={{ width: '76%' }} />
          </div>
          <span className="text-[11px] text-gray-400 block">
            580 units ripening in secondary bay
          </span>
        </div>

        {/* Card 2: Health Screening Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex justify-between items-center text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <span>Health Screening</span>
            <Activity className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-semibold text-[#1E3A2F]">
                94.0%
              </span>
              <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-semibold">
                Attention
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              2,275 Healthy • 145 Flagged (6.0%)
            </p>
          </div>
          <div className="text-[11px] space-y-1 pt-1 border-t border-gray-100 text-gray-600">
            <div className="flex justify-between">
              <span>Leaf discoloration:</span>
              <span className="font-semibold text-amber-800">90 plants</span>
            </div>
            <div className="flex justify-between">
              <span>Suspected leaf spot:</span>
              <span className="font-semibold text-red-700">35 plants</span>
            </div>
            <div className="flex justify-between">
              <span>Mechanical handling:</span>
              <span className="font-semibold text-gray-500">20 plants</span>
            </div>
          </div>
        </div>

        {/* Card 3: Bloom Maturity / Readiness */}
        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex justify-between items-center text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <span>Bloom Maturity / Readiness</span>
            <TrendingUp className="w-4 h-4 text-[#3A7D6A]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-semibold text-[#1E3A2F]">
                78%
              </span>
              <span className="text-xs text-gray-500">Vegetative</span>
            </div>
            <p className="text-xs text-[#3A7D6A] font-medium mt-1">
              Target &gt;= 80% • +36 pts since Sep 05
            </p>
          </div>
          <div className="w-full bg-[#F4F6F4] rounded-full h-2 overflow-hidden">
            <div className="bg-[#1E3A2F] h-full rounded-full" style={{ width: '78%' }} />
          </div>
          <span className="text-[11px] text-gray-400 block">
            Estimated showroom release in ~6 days
          </span>
        </div>

        {/* Card 4: Quality Grade Distribution */}
        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex justify-between items-center text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <span>Quality Grade Yield</span>
            <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-semibold text-[#1E3A2F]">
                90%
              </span>
              <span className="text-xs text-gray-500">Grade A / B</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Commercial showroom qualification
            </p>
          </div>
          <div className="text-[11px] space-y-1 pt-1 border-t border-gray-100">
            <div className="flex justify-between text-[#1E3A2F] font-medium">
              <span>Grade A (Showroom):</span>
              <span className="font-bold">62% (1,500)</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Grade B (Commercial):</span>
              <span>28% (678)</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Grade C (Propagation):</span>
              <span>10% (242)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5.3 "A Season of Progress" — Historical Scan Timeline & Analytics */}
      <div className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-serif italic text-[#1E3A2F]">
              A Season of Progress — Historical Scan Analytics
            </h2>
            <p className="text-xs text-gray-500">
              Continuous multi-spectral monitoring across 14 scans • Sep 05 – Oct 01, 2026
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Metric Toggles */}
            <div className="inline-flex rounded-md border border-gray-200 bg-[#F9F9F6] p-1 text-xs">
              {(
                [
                  { id: 'health', label: 'Health %' },
                  { id: 'maturity', label: 'Readiness' },
                  { id: 'quantity', label: 'Plant Count' },
                  { id: 'gradeA', label: 'Grade A %' },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveChartMetric(m.id)}
                  className={`px-2.5 py-1 rounded font-medium transition-all ${
                    activeChartMetric === m.id
                      ? 'bg-white shadow-2xs text-[#1E3A2F] font-bold'
                      : 'text-gray-600 hover:text-[#1E3A2F]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Time Filter */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="bg-[#F9F9F6] border border-gray-200 text-xs px-2.5 py-1.5 rounded-md text-[#1E3A2F]"
            >
              <option value="all">All 14 Scans</option>
              <option value="7days">Last 7 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>

        {/* Visual Progress Sparkline / Bar Graph Simulation */}
        <div className="bg-[#1E3A2F] text-white p-6 rounded-xl">
          <div className="flex justify-between items-center text-xs text-white/70 mb-6">
            <span className="font-mono uppercase tracking-wider">Metric: {activeChartMetric.toUpperCase()} TRAJECTORY</span>
            <span>Sep 05 Baseline (82.0%) ➔ Oct 01 Current (94.0%)</span>
          </div>

          <div className="grid grid-cols-8 gap-2 items-end h-40 pt-4">
            {[82, 85, 87, 89.2, 91.5, 92.8, 93.4, 94.0].map((val, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] text-white/60 font-mono group-hover:text-white transition-colors">
                  {val}%
                </span>
                <div
                  className="w-full bg-[#3A7D6A] hover:bg-[#4A8B71] rounded-t transition-all cursor-pointer"
                  style={{ height: `${(val / 100) * 120}px` }}
                />
                <span className="text-[10px] text-white/40 font-mono">
                  S{idx + 7}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chronological Scan History Log */}
        <div>
          <h3 className="text-xs font-semibold text-[#1E3A2F] uppercase tracking-wider mb-3">
            Chronological Scan Logs (14 Events)
          </h3>
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
            {mockFicusScans.map((scan) => (
              <div
                key={scan.id}
                className="p-4 bg-white hover:bg-[#F9F9F6] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      scan.scanType.includes('Drone')
                        ? 'bg-[#E8EDEA] text-[#1E3A2F]'
                        : 'bg-[#F4F6F4] text-[#3A7D6A]'
                    }`}
                  >
                    {scan.scanType.includes('Drone') ? (
                      <Camera className="w-4 h-4" />
                    ) : (
                      <UserCheck className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#1E3A2F]">{scan.scanType}</span>
                      <span className="text-[11px] text-gray-400 font-mono">• {scan.timestamp}</span>
                    </div>
                    <p className="text-gray-500 text-[11px]">{scan.notes}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto font-mono text-right">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Detected</span>
                    <span className="font-bold text-[#1E3A2F]">{scan.grossDetected} plants</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Health</span>
                    <span className="font-bold text-[#3A7D6A]">{scan.healthCalculated}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
