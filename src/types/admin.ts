export type HealthStatus = 'Optimal' | 'Attention' | 'Critical';
export type BatchStatus = 'Available' | 'Reserved' | 'On Hold' | 'Sold Out';

export interface BatchItem {
  id: string; // e.g. '#BCH-2026-Ficus04'
  species: string; // 'Ficus elastica'
  commonName: string; // 'Rubber Plant'
  zone: string; // 'Zone B'
  rack: string; // 'Rack 04'
  plantDate: string; // 'Jul 14, 2026'
  stage: string; // 'Vegetative Growth'
  grossCount: number; // 450
  physicalCount?: number; // 420
  variance?: number; // -30
  saleableCount: number; // 360
  allocatedCount: number; // 80
  healthScore: number; // 94.0
  healthStatus: HealthStatus;
  bloomMaturity: number; // 78 (%)
  gradeA: number; // 62 (%)
  gradeB: number; // 28 (%)
  gradeC: number; // 10 (%)
  storefrontActive: boolean; // toggle for public shop
  lastScanSync: string; // 'Today, 11:45 AM'
  alertsCount?: number;
}

export interface ZoneRack {
  id: string; // 'B04'
  name: string; // 'Rack 04'
  species: string;
  totalCapacity: number;
  currentUnits: number;
  healthRate: number;
  healthStatus: HealthStatus;
  maturity: number;
  anomaliesCount: number;
}

export interface ZoneHealth {
  id: string; // 'A' through 'H'
  name: string; // 'Zone A — Tropical Foliage'
  healthScore: number;
  status: HealthStatus;
  racks: ZoneRack[];
}

export interface ActionQueueItem {
  id: string;
  priority: 'P1' | 'P2' | 'P3';
  title: string;
  description: string;
  location: string;
  timestamp: string;
  batchId: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
}

export interface ScanRecord {
  id: string;
  timestamp: string;
  scanType: 'Vision AI Drone' | 'Horticulturist Manual Audit';
  operator: string;
  grossDetected: number;
  healthCalculated: number;
  anomaliesDetected: string[];
  notes: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface DiscrepancyAdjustment {
  batchId: string;
  expectedCount: number;
  physicalCount: number;
  adjustmentDelta: number;
  reason: string;
  flagForFollowup: boolean;
  adminName: string;
  timestamp: string;
}
