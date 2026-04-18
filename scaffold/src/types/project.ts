export type ProjectType = "deck" | "kitchen" | "bath" | "adu" | "garage";

export type ProjectStatus = "draft" | "ready" | "submitted";

export interface Dimensions {
  lengthFt: number;
  widthFt: number;
  heightFt?: number;
}

export interface ProjectIntake {
  projectType: ProjectType;
  dimensions?: Dimensions;
  jurisdiction: string;
  structural: boolean;
  electrical: boolean;
  plumbing: boolean;
  photos: string[];
}

export interface Project {
  id: string;
  createdAt: string;
  scope: string;
  jurisdiction: string;
  readiness: number;
  status: ProjectStatus;
  intake?: ProjectIntake;
}

export interface Blocker {
  id: string;
  label: string;
  detail: string;
  severity: "warn" | "risk";
  fixable: boolean;
}

export interface ReadinessResult {
  score: number;
  missingFields: string[];
  riskFlags: string[];
  blockers: Blocker[];
}

export interface InspectionStage {
  id: string;
  title: string;
  description: string;
  order: number;
  requires: string[];
}
