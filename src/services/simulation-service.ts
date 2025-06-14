import { api } from '@/api/api'

// Types for simulation data
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
  data: SimulationRecord
}

// Simulation API service
const simulationService = {
  // TPPRJ (Outpatient) endpoints
  tpprj: {
    getAll: () => {
      return api.get<SimulationResponse>("/get-tpprj-simulations")
    },
    getById: (id: number) => {
      return api.get<SimulationDetailResponse>(`/tpprj/get-simulation/${id}`)
    },
  },

  // TPPRI (Inpatient) endpoints
  tppri: {
    getAll: () => {
      return api.get<SimulationResponse>("/get-tppri-simulations")
    },
    getById: (id: number) => {
      return api.get<SimulationDetailResponse>(`/tppri/get-simulation/${id}`)
    },
  },

  // TPPGD (Emergency) endpoints
  tppgd: {
    getAll: () => {
      return api.get<SimulationResponse>("/get-tppgd-simulations")
    },
    getById: (id: number) => {
      return api.get<SimulationDetailResponse>(`/tppgd/get-simulation/${id}`)
    },
  },
}

export default simulationService
