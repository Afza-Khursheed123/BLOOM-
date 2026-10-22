import React, { createContext, useContext, useState, useEffect } from 'react';
import type { BatchItem, ZoneHealth, ActionQueueItem, DiscrepancyAdjustment, BatchStatus } from '../types/admin';
import { initialBatches, mockZoneHealthData, mockActionQueue } from '../data/mockAdminData';

interface AdminInventoryContextType {
  batches: BatchItem[];
  zones: ZoneHealth[];
  actionQueue: ActionQueueItem[];
  reconciliationLogs: DiscrepancyAdjustment[];
  reconcilingBatch: BatchItem | null;
  setReconcilingBatch: (batch: BatchItem | null) => void;
  toggleStorefrontActive: (batchId: string) => void;
  updateBatchStatus: (batchId: string, status: BatchStatus) => void;
  reconcileBatchCount: (adjustment: DiscrepancyAdjustment) => void;
  dismissActionQueueItem: (id: string) => void;
}

const AdminInventoryContext = createContext<AdminInventoryContextType | undefined>(undefined);

export const AdminInventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [batches, setBatches] = useState<BatchItem[]>(() => {
    try {
      const saved = localStorage.getItem('bloom_admin_batches');
      return saved ? JSON.parse(saved) : initialBatches;
    } catch {
      return initialBatches;
    }
  });

  const [zones] = useState<ZoneHealth[]>(mockZoneHealthData);
  const [actionQueue, setActionQueue] = useState<ActionQueueItem[]>(mockActionQueue);
  const [reconciliationLogs, setReconciliationLogs] = useState<DiscrepancyAdjustment[]>([]);
  const [reconcilingBatch, setReconcilingBatch] = useState<BatchItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('bloom_admin_batches', JSON.stringify(batches));
    } catch (e) {
      console.error('Failed to save batches to localStorage', e);
    }
  }, [batches]);

  const toggleStorefrontActive = (batchId: string) => {
    setBatches((prev) =>
      prev.map((batch) =>
        batch.id === batchId ? { ...batch, storefrontActive: !batch.storefrontActive } : batch
      )
    );
  };

  const updateBatchStatus = (batchId: string, status: BatchStatus) => {
    setBatches((prev) =>
      prev.map((batch) =>
        batch.id === batchId
          ? {
              ...batch,
              healthStatus: status === 'On Hold' ? 'Attention' : batch.healthStatus,
            }
          : batch
      )
    );
  };

  const reconcileBatchCount = (adjustment: DiscrepancyAdjustment) => {
    setBatches((prev) =>
      prev.map((batch) => {
        if (batch.id === adjustment.batchId) {
          return {
            ...batch,
            grossCount: adjustment.physicalCount,
            physicalCount: adjustment.physicalCount,
            variance: 0,
            lastScanSync: 'Just now (Reconciled)',
          };
        }
        return batch;
      })
    );

    setReconciliationLogs((prev) => [adjustment, ...prev]);

    // Also update action queue if related
    setActionQueue((prev) =>
      prev.map((item) =>
        item.batchId === adjustment.batchId ? { ...item, status: 'Resolved' } : item
      )
    );

    // Close drawer
    setReconcilingBatch(null);
  };

  const dismissActionQueueItem = (id: string) => {
    setActionQueue((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AdminInventoryContext.Provider
      value={{
        batches,
        zones,
        actionQueue,
        reconciliationLogs,
        reconcilingBatch,
        setReconcilingBatch,
        toggleStorefrontActive,
        updateBatchStatus,
        reconcileBatchCount,
        dismissActionQueueItem,
      }}
    >
      {children}
    </AdminInventoryContext.Provider>
  );
};

export const useAdminInventory = () => {
  const context = useContext(AdminInventoryContext);
  if (!context) {
    throw new Error('useAdminInventory must be used within an AdminInventoryProvider');
  }
  return context;
};
