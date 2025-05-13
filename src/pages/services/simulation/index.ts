import { api } from "@/pages/api/api"
import type {
  SimulationResponse,
  SimulationDetailResponse,
  TPPRJCase,
  TPPRICase,
  TPPGDCase,
  SimulationRecord,
  ScenarioResponse,
  ScenarioDetailResponse,
  Scenario,
  CaseComponent,
} from "./types"

/**
 * Map API simulation data to TPPRJ format
 */
export const mapToTPPRJCase = (record: SimulationRecord): TPPRJCase => {
  return {
    id: record.simulation.id,
    jenisPasien: record.simulation.patient_type === "pasien_baru" ? "Pasien Baru" : "Pasien Lama",
    jenisKunjungan: "Rawat Jalan",
    diagnosis: record.simulation.diagnose,
    judulKasus: record.simulation.case_type,
    deskripsiKasus: record.simulation.case_description,
    metodePembayaran: record.simulation.payment_method.toUpperCase(),
    caseComponent: [], // This will be populated from scenario API
  }
}

/**
 * Map API simulation data to TPPRI format
 */
export const mapToTPPRICase = (record: SimulationRecord): TPPRICase => {
  return {
    id: record.simulation.id,
    perujuk: record.simulation.perujuk || "Tidak ada",
    jenisKunjungan: "Rawat Inap",
    diagnosis: record.simulation.diagnose,
    judulKasus: record.simulation.case_type,
    deskripsiKasus: record.simulation.case_description,
    metodePembayaran: record.simulation.payment_method.toUpperCase(),
    caseComponent: [], // This will be populated from scenario API
  }
}

/**
 * Map API simulation data to TPPGD format
 */
export const mapToTPPGDCase = (record: SimulationRecord): TPPGDCase => {
  return {
    id: record.simulation.id,
    jenisPasien: record.simulation.patient_type === "pasien_baru" ? "Pasien Baru" : "Pasien Lama",
    jenisKunjungan: "Gawat Darurat",
    keluhan: record.simulation.diagnose, // Using diagnose as keluhan
    judulKasus: record.simulation.case_type,
    deskripsiKasus: record.simulation.case_description,
    metodePembayaran: record.simulation.payment_method.toUpperCase(),
    caseComponent: [], // This will be populated from scenario API
  }
}

/**
 * Map API scenario data to CaseComponent format
 */
export const mapScenarioToCaseComponent = (scenario: Scenario, caseType: string): CaseComponent => {
  // Map component to formType based on case type
  let formType: "pendaftaran" | "admission-rawat-jalan" | "admission-rawat-inap" | "admission-gawat-darurat"

  if (scenario.component === "pendaftaran") {
    formType = "pendaftaran"
  } else {
    // Use appropriate admission type based on case type
    if (caseType === "tpprj") {
      formType = "admission-rawat-jalan"
    } else if (caseType === "tppri") {
      formType = "admission-rawat-inap"
    } else {
      formType = "admission-gawat-darurat"
    }
  }

  return {
    id: scenario.id,
    question: scenario.question,
    answer: "", // This would need to be populated from another API endpoint if needed
    scenarios: [scenario.scenario],
    formType,
  }
}

// Simulation API service
const simulationService = {
  // TPPRJ (Outpatient) endpoints
  tpprj: {
    getAll: async () => {
      return api.get<SimulationResponse>("/tpprj/get-all-simulation")
    },
    getById: async (id: number) => {
      return api.get<SimulationDetailResponse>(`/tpprj/get-simulation/${id}`)
    },
  },

  // TPPRI (Inpatient) endpoints
  tppri: {
    getAll: async () => {
      return api.get<SimulationResponse>("/tppri/get-all-simulation")
    },
    getById: async (id: number) => {
      return api.get<SimulationDetailResponse>(`/tppri/get-simulation/${id}`)
    },
  },

  // TPPGD (Emergency) endpoints
  tppgd: {
    getAll: async () => {
      return api.get<SimulationResponse>("/tppgd/get-all-simulation")
    },
    getById: async (id: number) => {
      return api.get<SimulationDetailResponse>(`/tppgd/get-simulation/${id}`)
    },
  },

  // Scenario endpoints
  scenario: {
    getAllBySimulationId: async (simulationId: number) => {
      return api.get<ScenarioResponse>(`/auth/get-all-scenario/${simulationId}`)
    },
    getById: async (scenarioId: number) => {
      return api.get<ScenarioDetailResponse>(`/auth/get-Scenario/${scenarioId}`)
    },
  },
}

export default simulationService
