import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  RotateCcw,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toggle } from '../../components/ui/Toggle';
import { useAdminInventory } from '../../context/AdminInventoryContext';

export const AdminInventoryPage: React.FC = () => {
  const { batches, toggleStorefrontActive, setReconcilingBatch, updateBatchStatus } = useAdminInventory();

  // Selected batch for bottom control card
  const [selectedBatchId, setSelectedBatchId] = useState<string>('#BCH-2026-Sansev01');


  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('All');
  const [speciesFilter, setSpeciesFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredBatches = batches.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.commonName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = zoneFilter === 'All' || b.zone.includes(zoneFilter);
    const matchesSpecies = speciesFilter === 'All' || b.species.toLowerCase().includes(speciesFilter.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && b.storefrontActive) ||
      (statusFilter === 'Hold' && !b.storefrontActive);
    return matchesSearch && matchesZone && matchesSpecies && matchesStatus;
  });

  const selectedBatch = batches.find((b) => b.id === selectedBatchId) || batches[0];
  const orderableUnits = Math.max(0, selectedBatch.saleableCount - selectedBatch.allocatedCount);

  return (
    <div className="space-y-6 text-left">
      {/* 6.1 Sub-Header & Live Operational Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-gray-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-xs font-semibold text-[#3A7D6A] uppercase tracking-wider">
              Live Storefront Inventory Control
            </span>
          </div>
          <h1 className="font-serif italic text-2xl sm:text-3xl text-[#1E3A2F]">
            Live Batch Inventory &amp; Allocation
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            64 batches — Real-time synchronization between nursery bays and storefront availability.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-[#F9F9F6] px-3 py-2 rounded-lg border border-gray-200 text-[#1E3A2F]">
          <span>Synced: <strong>Today • Real-Time</strong></span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Batch ID or Species..."
            className="w-full bg-[#F9F9F6] border border-gray-200 text-xs rounded-md pl-9 pr-3 py-2 text-[#1E3A2F] focus:outline-none focus:border-[#3A7D6A]"
          />
        </div>

        <select
          value={zoneFilter}
          onChange={(e) => setZoneFilter(e.target.value)}
          className="bg-[#F9F9F6] border border-gray-200 text-xs px-3 py-2 rounded-md text-[#1E3A2F]"
        >
          <option value="All">All Zones</option>
          <option value="A">Zone A</option>
          <option value="B">Zone B</option>
          <option value="C">Zone C</option>
          <option value="D">Zone D</option>
        </select>

        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
          className="bg-[#F9F9F6] border border-gray-200 text-xs px-3 py-2 rounded-md text-[#1E3A2F]"
        >
          <option value="All">All Crops &amp; Flowers</option>
          <option value="Rosa">Roses (Rosa)</option>
          <option value="Tagetes">Marigolds (Tagetes)</option>
          <option value="Jatropha">Jatropha</option>
          <option value="Euphorbia">Euphorbia</option>
          <option value="Petunia">Petunias</option>
          <option value="Ficus">Ficus</option>
          <option value="Monstera">Monstera</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#F9F9F6] border border-gray-200 text-xs px-3 py-2 rounded-md text-[#1E3A2F]"
        >
          <option value="All">Storefront Status: All</option>
          <option value="Active">Published (Active)</option>
          <option value="Hold">On Hold</option>
        </select>

        <button
          type="button"
          onClick={() => {
            setSearchQuery('');
            setZoneFilter('All');
            setSpeciesFilter('All');
            setStatusFilter('All');
          }}
          className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 px-2.5 py-2 rounded-md hover:bg-slate-50 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 6.2 Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Batch ID / Species</th>
                <th className="py-3 px-4">Zone / Rack</th>
                <th className="py-3 px-4">Gross Count</th>
                <th className="py-3 px-4">Market-Ready</th>
                <th className="py-3 px-4">Allocated</th>
                <th className="py-3 px-4">Health Status</th>
                <th className="py-3 px-4">Storefront Sync</th>
                <th className="py-3 px-4">Last Scan Sync</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBatches.map((batch) => {
                const isSelected = selectedBatchId === batch.id;
                const hasVariance = batch.variance !== undefined && batch.variance !== 0;

                return (
                  <tr
                    key={batch.id}
                    onClick={() => setSelectedBatchId(batch.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-emerald-50/40' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-slate-800 block">
                        {batch.id}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {batch.species}
                      </span>
                      <span className="text-[11px] text-slate-400 block italic">
                        {batch.commonName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {batch.zone} / {batch.rack}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">{batch.grossCount}</span>
                        {hasVariance && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setReconcilingBatch(batch);
                            }}
                            className="inline-flex items-center gap-1 text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold hover:bg-red-200 transition-colors"
                            title="Click to reconcile count"
                          >
                            <AlertTriangle className="w-3 h-3" />
                            <span>Scan {batch.physicalCount} ({batch.variance})</span>
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#059669]">
                      {batch.saleableCount}
                      {batch.saleableCount === 0 && (
                        <span className="ml-1 text-[10px] text-amber-600">(Locked)</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {batch.allocatedCount} units
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold text-[11px] ${
                          batch.healthStatus === 'Optimal'
                            ? 'bg-emerald-50 text-emerald-700'
                            : batch.healthStatus === 'Attention'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {batch.healthStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <Toggle
                          checked={batch.storefrontActive}
                          onChange={() => toggleStorefrontActive(batch.id)}
                        />
                        <span
                          className={`text-[11px] font-semibold ${
                            batch.storefrontActive ? 'text-emerald-700' : 'text-slate-400'
                          }`}
                        >
                          {batch.storefrontActive ? 'Active' : 'Off'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-400 font-mono">
                      {batch.lastScanSync}
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/admin/batches/${batch.id.replace('#', '')}`}
                          className="p-1 text-slate-400 hover:text-slate-800 rounded transition-colors"
                          title="View Historical Analytics"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6.3 Selected Batch Control Panel (Bottom Card) */}
      {selectedBatch && (
        <div className="bg-[#1E3A2F] text-white rounded-xl p-6 border border-[#152a22] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#E8EDEA] bg-[#3A7D6A]/40 px-2 py-0.5 rounded border border-[#3A7D6A]/50">
                {selectedBatch.id} Selected
              </span>
              <span className="text-xs text-white/70">
                {selectedBatch.species} • {selectedBatch.zone} / {selectedBatch.rack}
              </span>
            </div>
            <h3 className="font-serif italic text-xl text-white">
              {selectedBatch.allocatedCount} units reserved •{' '}
              <span className="text-[#82A799] font-mono font-medium">{orderableUnits} units still orderable</span>
            </h3>
            <p className="text-xs text-white/70">
              Total Market-Ready stock: {selectedBatch.saleableCount} units. Active customer cart reservations reduce storefront available quantity dynamically.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/20 hover:bg-white/10"
              onClick={() => {
                const nextStatus = selectedBatch.healthStatus === 'Attention' ? 'Optimal' : 'Attention';
                updateBatchStatus(selectedBatch.id, nextStatus === 'Attention' ? 'On Hold' : 'Available');
              }}
            >
              Toggle Hold Status
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/20 hover:bg-white/10"
              onClick={() => alert(`Allocation history viewed for ${selectedBatch.id}`)}
            >
              View Allocation History
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setReconcilingBatch(selectedBatch)}
              icon={<AlertTriangle className="w-3.5 h-3.5" />}
            >
              Reconcile Count
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
