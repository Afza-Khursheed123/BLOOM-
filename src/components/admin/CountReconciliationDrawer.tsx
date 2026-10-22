import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2, History, ShieldAlert } from 'lucide-react';
import { useAdminInventory } from '../../context/AdminInventoryContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export const CountReconciliationDrawer: React.FC = () => {
  const { reconcilingBatch, setReconcilingBatch, reconcileBatchCount } = useAdminInventory();
  const { currentUser } = useAuth();

  const [physicalCount, setPhysicalCount] = useState<number>(() =>
    reconcilingBatch ? reconcilingBatch.physicalCount ?? reconcilingBatch.grossCount : 420
  );
  const [reasonCategory, setReasonCategory] = useState<string>('Damaged plants removed');
  const [detailedNotes, setDetailedNotes] = useState<string>(
    '30 units removed due to root rot and leaf damage found during physical inspection on Rack B04.'
  );
  const [flagForFollowup, setFlagForFollowup] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!reconcilingBatch) return null;

  const expectedCount = reconcilingBatch.grossCount;
  const delta = physicalCount - expectedCount;

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      reconcileBatchCount({
        batchId: reconcilingBatch.id,
        expectedCount,
        physicalCount,
        adjustmentDelta: delta,
        reason: `[${reasonCategory}] ${detailedNotes}`,
        flagForFollowup,
        adminName: currentUser?.name || 'Avis Lee',
        timestamp: new Date().toISOString(),
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setReconcilingBatch(null)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col text-slate-800">
          {/* Header */}
          <div className="p-6 bg-[#1E3A2F] text-white flex items-center justify-between border-b border-[#152a22]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] tracking-wider uppercase font-semibold bg-[#3A7D6A]/40 text-[#E8EDEA] px-2 py-0.5 rounded border border-[#3A7D6A]/50">
                  Inventory Reconciliation
                </span>
                <span className="text-xs text-white/70 font-mono">
                  {reconcilingBatch.id}
                </span>
              </div>
              <h2 className="text-lg font-serif italic font-medium text-white">
                {reconcilingBatch.species}
              </h2>
              <p className="text-xs text-[#E8EDEA]/80">
                {reconcilingBatch.commonName} • {reconcilingBatch.zone} / {reconcilingBatch.rack}
              </p>
            </div>
            <button
              onClick={() => setReconcilingBatch(null)}
              className="p-2 text-white/70 hover:text-white rounded-md hover:bg-white/10 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Count Comparison Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#FAFBF9] border border-gray-200 rounded-lg p-4">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Expected System Count
                </span>
                <p className="text-2xl font-bold font-mono text-[#1E3A2F] mt-1">
                  {expectedCount}
                </p>
                <span className="text-[10px] text-gray-400">Gross recorded units</span>
              </div>

              <div className="bg-white border-2 border-[#3A7D6A] rounded-lg p-4 shadow-xs">
                <label className="text-[11px] font-semibold text-[#1E3A2F] uppercase tracking-wide block">
                  Physical Count Found
                </label>
                <input
                  type="number"
                  value={physicalCount}
                  onChange={(e) => setPhysicalCount(Number(e.target.value))}
                  className="text-2xl font-bold font-mono text-[#1E3A2F] w-full mt-1 border-b border-gray-200 focus:outline-none focus:border-[#3A7D6A]"
                />
                <span className="text-[10px] text-gray-400">Manually verified units</span>
              </div>
            </div>

            {/* Proposed Adjustment Delta */}
            <div className={`p-4 rounded-lg flex items-center justify-between border ${
              delta === 0
                ? 'bg-gray-50 border-gray-200 text-gray-700'
                : delta < 0
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-[#F4F6F4] border-[#3A7D6A]/30 text-[#1E3A2F]'
            }`}>
              <div className="flex items-center gap-2.5">
                <AlertTriangle className={`w-5 h-5 ${delta < 0 ? 'text-amber-600' : 'text-[#3A7D6A]'}`} />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider">
                    Proposed Count Adjustment
                  </h4>
                  <p className="text-xs opacity-80">
                    Net variance against digital ledger
                  </p>
                </div>
              </div>
              <span className={`text-lg font-mono font-bold px-3 py-1 rounded ${
                delta < 0
                  ? 'bg-amber-200/60 text-amber-900'
                  : delta > 0
                  ? 'bg-[#E8EDEA] text-[#1E3A2F]'
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {delta > 0 ? `+${delta}` : delta} units
              </span>
            </div>

            {/* Reason for Discrepancy */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-[#1E3A2F] uppercase tracking-wider">
                Reason for Discrepancy
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  'Damaged plants removed',
                  'Stunted growth culled',
                  'Vision camera occlusion',
                  'Misplaced rack transit',
                ].map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => setReasonCategory(reason)}
                    className={`p-2.5 rounded-md border text-left transition-all ${
                      reasonCategory === reason
                        ? 'border-[#1E3A2F] bg-[#E8EDEA]/70 font-semibold text-[#1E3A2F]'
                        : 'border-gray-200 hover:bg-[#FAFBF9] text-gray-600'
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                value={detailedNotes}
                onChange={(e) => setDetailedNotes(e.target.value)}
                placeholder="Provide detailed explanation for the discrepancy audit trail..."
                className="w-full text-xs p-3 rounded-md border border-gray-200 focus:outline-none focus:border-[#3A7D6A] focus:ring-1 focus:ring-[#3A7D6A] text-[#1E3A2F]"
              />
            </div>

            {/* Follow-up Flag Checkbox */}
            <label className="flex items-start gap-3 p-3 bg-[#FAFBF9] rounded-md border border-gray-200 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={flagForFollowup}
                onChange={(e) => setFlagForFollowup(e.target.checked)}
                className="mt-0.5 rounded text-[#1E3A2F] focus:ring-[#3A7D6A]"
              />
              <div className="text-xs">
                <span className="font-semibold text-[#1E3A2F]">
                  Flag discrepancy for follow-up audit
                </span>
                <p className="text-gray-500 text-[11px] mt-0.5">
                  Notifies lead horticulturist and schedules high-resolution camera scan tomorrow at 08:00 AM.
                </p>
              </div>
            </label>

            {/* Impact Preview ("What Confirmation Changes") */}
            <div className="bg-[#1E3A2F] text-white rounded-lg p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#E8EDEA]">
                <ShieldAlert className="w-4 h-4 text-[#82A799]" />
                <span>What Confirmation Changes</span>
              </div>
              <ul className="text-xs space-y-1.5 text-gray-200">
                <li className="flex justify-between">
                  <span>Gross System Count:</span>
                  <span className="font-mono font-bold text-white">
                    {expectedCount} ➔ {physicalCount} units
                  </span>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>Market-Ready / Reserved:</span>
                  <span className="font-mono">
                    {reconcilingBatch.saleableCount} / {reconcilingBatch.allocatedCount} (Unchanged)
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Orderable Availability:</span>
                  <span className="font-mono text-amber-300 font-bold">
                    {Math.max(0, physicalCount - reconcilingBatch.allocatedCount)} units (Temporary Hold)
                  </span>
                </li>
              </ul>
            </div>

            {/* Audit Trail Disclaimer */}
            <div className="p-3 bg-[#F4F6F4] rounded-md flex items-start gap-2.5 text-[11px] text-gray-500">
              <History className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <p>
                Confirmation records original count ({expectedCount}), adjusted count ({physicalCount}), operator ({currentUser?.name || 'Avis Lee'}), and immutable UTC timestamp in nursery logs.
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-gray-200 bg-[#FAFBF9] flex items-center justify-end gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => setReconcilingBatch(null)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleConfirm}
              isLoading={isSubmitting}
              icon={<CheckCircle2 className="w-4 h-4" />}
            >
              Confirm Adjustment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
