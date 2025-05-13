// API response types
export interface Simulation {
    id: number
    patient_type: string
    category: string
    perujuk: string | null
    diagnose: string
    case_type: string
    payment_method: string
    case_description: string
    createdAt: string
    updatedAt: string
  }
  
  export interface SimulationRecord {
    id: number
    user_id: number
    simulation_id: number
    checklist: boolean
    duration: number
    createdAt: string
    updatedAt: string
    simulation: Simulation
  }
  
  export interface SimulationResponse {
    data: SimulationRecord[]
  }
  
  export interface SimulationDetailResponse {
    data: Simulation
  }
  
  // Scenario types
  export interface Scenario {
    id: number
    simulation_id: number
    scenario: string
    question: string
    component:
      | "search"
      | "pendaftaran"
      | "admission-rawat-jalan"
      | "admission-rawat-inap"
      | "admission-gawat-darurat"
      | "Data Kunjungan"
  }
  
  export interface ScenarioResponse {
    data: Scenario[]
  }
  
  export interface ScenarioDetailResponse {
    data: Scenario
  }
  
  // Component types (matching your existing structure)
  export interface CaseComponent {
    id: number
    question: string
    answer: string
    scenarios: string[]
    formType: "search" | "pendaftaran" | "admission-rawat-jalan" | "admission-rawat-inap" | "admission-gawat-darurat"
  }
  
  // TPPRJ Case type
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
  
  // TPPRI Case type
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
  
  // TPPGD Case type
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
  