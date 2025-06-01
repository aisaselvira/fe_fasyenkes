import { api } from "@/api/api"
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
 * Handle both nested and flat response structures
 */
export const mapToTPPRJCase = (record: SimulationRecord): TPPRJCase => {
  // Handle different possible response structures
  const simulation = record.simulation || record

  if (!simulation || !simulation.id) {
    console.error("Invalid record structure:", record)
    throw new Error("Invalid simulation data structure")
  }

  return {
    id: simulation.id,
    jenisPasien: simulation.patient_type === "pasien_baru" ? "Pasien Baru" : "Pasien Lama",
    jenisKunjungan: "Rawat Jalan",
    diagnosis: simulation.diagnose || "Tidak ada diagnosis",
    judulKasus: simulation.case_type || "Tidak ada judul",
    deskripsiKasus: simulation.case_description || "Tidak ada deskripsi",
    metodePembayaran: (simulation.payment_method || "cash").toUpperCase(),
    caseComponent: [], // This will be populated from scenario API
  }
}

/**
 * Map API simulation data to TPPRI format
 */
export const mapToTPPRICase = (record: SimulationRecord): TPPRICase => {
  // Handle different possible response structures
  const simulation = record.simulation || record

  if (!simulation || !simulation.id) {
    console.error("Invalid record structure:", record)
    throw new Error("Invalid simulation data structure")
  }

  return {
    id: simulation.id,
    perujuk: simulation.perujuk || "Tidak ada",
    jenisKunjungan: "Rawat Inap",
    diagnosis: simulation.diagnose || "Tidak ada diagnosis",
    judulKasus: simulation.case_type || "Tidak ada judul",
    deskripsiKasus: simulation.case_description || "Tidak ada deskripsi",
    metodePembayaran: (simulation.payment_method || "cash").toUpperCase(),
    caseComponent: [], // This will be populated from scenario API
  }
}

/**
 * Map API simulation data to TPPGD format
 */
export const mapToTPPGDCase = (record: SimulationRecord): TPPGDCase => {
  // Handle different possible response structures
  const simulation = record.simulation || record

  if (!simulation || !simulation.id) {
    console.error("Invalid record structure:", record)
    throw new Error("Invalid simulation data structure")
  }

  return {
    id: simulation.id,
    jenisPasien: simulation.patient_type === "pasien_baru" ? "Pasien Baru" : "Pasien Lama",
    jenisKunjungan: "Gawat Darurat",
    keluhan: simulation.diagnose || "Tidak ada keluhan", // Using diagnose as keluhan
    judulKasus: simulation.case_type || "Tidak ada judul",
    deskripsiKasus: simulation.case_description || "Tidak ada deskripsi",
    metodePembayaran: (simulation.payment_method || "cash").toUpperCase(),
    caseComponent: [], // This will be populated from scenario API
  }
}

/**
 * Map API scenario data to CaseComponent format
 */
export const mapScenarioToCaseComponent = (scenario: Scenario, caseType: string): CaseComponent => {
  // Map component to formType based on the component field from API
  let formType: "search" | "pendaftaran" | "admission-rawat-jalan" | "admission-rawat-inap" | "admission-gawat-darurat"

  switch (scenario.component) {
    case "pendaftaran":
      formType = "pendaftaran"
      break
    case "admission-rawat-jalan":
      formType = "admission-rawat-jalan"
      break
    case "admission-rawat-inap":
      formType = "admission-rawat-inap"
      break
    case "admission-gawat-darurat":
      formType = "admission-gawat-darurat"
      break
    default:
      // Fallback based on case type
      if (caseType === "tpprj") {
        formType = "admission-rawat-jalan"
      } else if (caseType === "tppri") {
        formType = "admission-rawat-inap"
      } else if (caseType === "tppgd") {
        formType = "admission-gawat-darurat"
      } else {
        formType = "pendaftaran"
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
      return api.get<SimulationResponse>("/get-tpprj-simulations")
    },
    getById: async (id: number) => {
      return api.get<SimulationDetailResponse>(`/tpprj/get-simulation/${id}`)
    },
    getAllScenarios: async (simulationId: number) => {
      return api.get<ScenarioResponse>(`/tpprj/get-All-Scenario/${simulationId}`)
    },
    getScenario: async (order: number, simulationId: number) => {
      return api.get<ScenarioDetailResponse>(`/tpprj/get-Scenario/?order=${order}&simulation_id=${simulationId}`)
    },
  },

  // TPPRI (Inpatient) endpoints
  tppri: {
    getAll: async () => {
      return api.get<SimulationResponse>("/get-tppri-simulations")
    },
    getById: async (id: number) => {
      return api.get<SimulationDetailResponse>(`/tppri/get-simulation/${id}`)
    },
    getAllScenarios: async (simulationId: number) => {
      return api.get<ScenarioResponse>(`/tppri/get-All-Scenario/${simulationId}`)
    },
    getScenario: async (order: number, simulationId: number) => {
      return api.get<ScenarioDetailResponse>(`/tppri/get-Scenario/?order=${order}&simulation_id=${simulationId}`)
    },
  },

  // TPPGD (Emergency) endpoints
  tppgd: {
    getAll: async () => {
      return api.get<SimulationResponse>("/get-tppgd-simulations")
    },
    getById: async (id: number) => {
      return api.get<SimulationDetailResponse>(`/tppgd/get-simulation/${id}`)
    },
    getAllScenarios: async (simulationId: number) => {
      return api.get<ScenarioResponse>(`/tpprgd/get-All-Scenario/${simulationId}`)
    },
    getScenario: async (order: number, simulationId: number) => {
      return api.get<ScenarioDetailResponse>(`/tpprgd/get-Scenario/?order=${order}&simulation_id=${simulationId}`)
    },
  },

  // Legacy scenario endpoints (keep for backward compatibility)
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
