import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  AlertTriangle,
  Sprout,
  CheckCircle,
  Flower2,
  ArrowRight,
} from 'lucide-react';
import { useAdminInventory } from '../../context/AdminInventoryContext';

export const AdminOverviewPage: React.FC = () => {
  const { batches, actionQueue, setReconcilingBatch } = useAdminInventory();

  // Search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('All');

  const filteredBatches = batches.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.commonName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies =
      filterSpecies === 'All' || b.species.toLowerCase().includes(filterSpecies.toLowerCase());
    return matchesSearch && matchesSpecies;
  });

  return (
    <div className="space-y-8 text-left">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2 border-b border-gray-200/70">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#3A7D6A]">
            Executive Nursery Dashboard
          </p>
          <h1 className="font-serif italic text-3xl sm:text-4xl text-[#1E3A2F] mt-1">
            Nursery operations, simplified.
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Real-time status for living floral crops, soil health, and market-ready inventory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/inventory"
            className="inline-flex items-center gap-2 bg-[#1E3A2F] text-white hover:bg-[#152a22] text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-2xs"
          >
            <span>Manage Inventory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Focused KPI Metric Cards (4 Clean Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Specimens
            </span>
            <Sprout className="w-4 h-4 text-[#3A7D6A]" />
          </div>
          <div className="font-serif text-3xl font-semibold text-[#1E3A2F]">
            142,850
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#3A7D6A] font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+8.4% monthly growth</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Active Batches
            </span>
            <Flower2 className="w-4 h-4 text-[#3A7D6A]" />
          </div>
          <div className="font-serif text-3xl font-semibold text-[#1E3A2F]">
            64
          </div>
          <p className="text-xs text-gray-500">
            Roses, marigolds, jatropha, euphorbia
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Overall Health Rate
            </span>
            <CheckCircle className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="font-serif text-3xl font-semibold text-[#1E3A2F]">
            96.2%
          </div>
          <p className="text-xs text-[#3A7D6A] font-medium">
            Grade A standard compliant
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Ready for Storefront
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
          </div>
          <div className="font-serif text-3xl font-semibold text-[#1E3A2F]">
            18,400
          </div>
          <p className="text-xs text-gray-500">
            Market-ready across greenhouses
          </p>
        </div>
      </div>

      {/* 3. Main Content: Batches Table (8 Cols) & Action Queue (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Batches Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
          {/* Table Toolbar */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FAFBF9]">
            <div>
              <h2 className="font-serif italic text-lg sm:text-xl text-[#1E3A2F]">
                Active Nursery Batches
              </h2>
              <p className="text-xs text-gray-500">
                Cultivated varieties and crop maturity status
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search batch or species..."
                className="bg-white border border-gray-300 text-xs px-3 py-1.5 rounded-md focus:outline-none focus:border-[#3A7D6A] text-[#1E3A2F]"
              />
              <select
                value={filterSpecies}
                onChange={(e) => setFilterSpecies(e.target.value)}
                className="bg-white border border-gray-300 text-xs px-2.5 py-1.5 rounded-md text-[#1E3A2F] focus:outline-none"
              >
                <option value="All">All Crops &amp; Flowers</option>
                <option value="Rosa">Roses (Rosa)</option>
                <option value="Tagetes">Marigolds (Tagetes)</option>
                <option value="Jatropha">Jatropha</option>
                <option value="Euphorbia">Euphorbia</option>
                <option value="Petunia">Petunia</option>
                <option value="Ficus">Ficus</option>
                <option value="Monstera">Monstera</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F4F6F4] text-gray-600 font-semibold uppercase tracking-wider border-b border-gray-200/60">
                <tr>
                  <th className="py-3 px-4">Batch ID</th>
                  <th className="py-3 px-4">Plant &amp; Species</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Saleable Qty</th>
                  <th className="py-3 px-4">Health Rate</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBatches.map((batch) => (
                  <tr key={batch.id} className="hover:bg-[#F9F9F6] transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-[#1E3A2F]">
                      <Link
                        to={`/admin/batches/${batch.id.replace('#', '')}`}
                        className="hover:text-[#3A7D6A] hover:underline"
                      >
                        {batch.id}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#1E3A2F]">{batch.commonName}</div>
                      <div className="text-[11px] text-gray-500 italic">{batch.species}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {batch.zone} • {batch.rack}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#1E3A2F]">
                      {batch.saleableCount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 font-medium text-[#1E3A2F]">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            batch.healthScore >= 95
                              ? 'bg-[#10B981]'
                              : batch.healthScore >= 90
                              ? 'bg-amber-400'
                              : 'bg-red-500'
                          }`}
                        />
                        {batch.healthScore.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {batch.storefrontActive ? (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8EDEA] text-[#1E3A2F]">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          Hold
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/admin/batches/${batch.id.replace('#', '')}`}
                        className="text-[#3A7D6A] hover:text-[#1E3A2F] font-semibold hover:underline"
                      >
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Attention Required Action Queue (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h2 className="font-serif italic text-lg text-[#1E3A2F]">
                Attention Required
              </h2>
            </div>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              {actionQueue.length} Active
            </span>
          </div>

          <div className="space-y-3">
            {actionQueue.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-lg border border-gray-200/70 bg-[#FAFBF9] hover:bg-white hover:shadow-2xs transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.priority === 'P1'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.priority} Priority
                  </span>
                  <span className="text-[10px] text-gray-400">{item.timestamp}</span>
                </div>
                <h3 className="text-xs font-semibold text-[#1E3A2F]">
                  {item.title}
                </h3>
                <p className="text-[11px] text-gray-500 line-clamp-2">
                  {item.description}
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-mono">
                    {item.location}
                  </span>
                  {item.title.includes('mismatch') ? (
                    <button
                      type="button"
                      onClick={() => {
                        const targetBatch = batches.find((b) => b.id.includes('Ficus'));
                        if (targetBatch) setReconcilingBatch(targetBatch);
                      }}
                      className="text-xs font-semibold text-[#3A7D6A] hover:underline"
                    >
                      Reconcile Now →
                    </button>
                  ) : (
                    <Link
                      to="/admin/batches/BCH-2026-Ficus04"
                      className="text-xs font-semibold text-[#1E3A2F] hover:underline"
                    >
                      Inspect →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/admin/inventory"
            className="pt-2 flex items-center justify-between text-xs font-semibold text-[#3A7D6A] hover:text-[#1E3A2F] transition-colors"
          >
            <span>Open live inventory controls</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
