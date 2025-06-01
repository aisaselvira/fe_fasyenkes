// Base simulation types
export interface SimulationRecord {
  simulation: {
    id: number
    patient_type: string
    category: string
    perujuk?: string
    diagnose: string
    case_type: string
    payment_method: string
    symptoms?: string
    case_description: string
    createdAt: string
    updatedAt: string
  }
}

export interface SimulationResponse {
  data: SimulationRecord[]
}

export interface SimulationDetailResponse {
  data: {
    id: number
    patient_type: string
    category: string
    perujuk?: string
    diagnose: string
    case_type: string
    payment_method: string
    symptoms?: string
    case_description: string
    createdAt: string
    updatedAt: string
  }
}

// Scenario types - updated to match API response
export interface Scenario {
  id: number
  simulation_id: number
  scenario: string
  order: number
  question: string
  component: string
  createdAt: string
  updatedAt: string
}

export interface ScenarioResponse {
  data: Scenario[]
}

export interface ScenarioDetailResponse {
  data: Scenario
}

// Case component interface
export interface CaseComponent {
  id: number
  question: string
  answer: string
  scenarios: string[]
  formType: "search" | "pendaftaran" | "admission-rawat-jalan" | "admission-rawat-inap" | "admission-gawat-darurat"
}

// Case types for different simulation categories
export interface TPPRJCase {
  id: number
  jenisPasien: string
  jenisKunjungan: string
  diagnosis: string
  judulKasus: string
  deskripsiKasus: string
  metodePembayaran: string
  caseComponent: CaseComponent[]
}

export interface TPPRICase {
  id: number
  perujuk: string
  jenisKunjungan: string
  diagnosis: string
  judulKasus: string
  deskripsiKasus: string
  metodePembayaran: string
  caseComponent: CaseComponent[]
}

export interface TPPGDCase {
  id: number
  jenisPasien: string
  jenisKunjungan: string
  keluhan: string
  judulKasus: string
  deskripsiKasus: string
  metodePembayaran: string
  caseComponent: CaseComponent[]
}
