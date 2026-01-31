export const config = {
    // API Configuration
    api: {
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:19200",
        timeout: 30000,
    },

    // App Configuration
    app: {
        name: "Open MRI",
        version: "1.0.0",
    },

    // Auth Configuration
    auth: {
        tokenKey: "token",
        roleKey: "role",
        cookieExpires: 1, // 1 hari
    },

    // FRONTEND ROUTES
    routes: {
        // Public
        login: "/login",
        register: "/register",
        forgotPassword: "/forgot-password",

        // Admin
        admin: {
            dashboard: "/admin/dashboard",
            // Simulasi TPPRJ (Rawat Jalan)
            simulasiTpprj: {
                index: "/admin/simulasi-tpprj",
                detail: (id: string | number) => `/admin/simulasi-tpprj/${id}`,
                formSimulasi: "/admin/simulasi-tpprj/form-simulasi",
                formSkenario: (id: string | number) => `/admin/simulasi-tpprj/${id}/form-skenario`,
                edit: (id: string | number) => `/admin/simulasi-tpprj/edit/${id}`,
                show: (id: string | number) => `/admin/simulasi-tpprj/show/${id}`,
                showSkenario: (id: string | number, skenarioId: string | number) =>
                    `/admin/simulasi-tpprj/${id}/show/${skenarioId}`,
            },
            // Simulasi TPPRI (Rawat Inap)
            simulasiTppri: {
                index: "/admin/simulasi-tppri",
                detail: (id: string | number) => `/admin/simulasi-tppri/${id}`,
                formSimulasi: "/admin/simulasi-tppri/form-simulasi",
                formSkenario: (id: string | number) => `/admin/simulasi-tppri/${id}/form-skenario`,
                edit: (id: string | number) => `/admin/simulasi-tppri/edit/${id}`,
                show: (id: string | number) => `/admin/simulasi-tppri/show/${id}`,
                showSkenario: (id: string | number, skenarioId: string | number) =>
                    `/admin/simulasi-tppri/${id}/show/${skenarioId}`,
            },
            // Simulasi TPPGD (Gawat Darurat)
            simulasiTppgd: {
                index: "/admin/simulasi-tppgd",
                detail: (id: string | number) => `/admin/simulasi-tppgd/${id}`,
                formSimulasi: "/admin/simulasi-tppgd/form-simulasi",
                formSkenario: (id: string | number) => `/admin/simulasi-tppgd/${id}/form-skenario`,
                edit: (id: string | number) => `/admin/simulasi-tppgd/edit/${id}`,
                show: (id: string | number) => `/admin/simulasi-tppgd/show/${id}`,
                showSkenario: (id: string | number, skenarioId: string | number) =>
                    `/admin/simulasi-tppgd/${id}/show/${skenarioId}`,
            },
        },

        // User
        user: {
            home: "/user/home-page",
        },
    },

    // BACKEND API ENDPOINTS
    endpoints: {
        // Auth
        auth: {
            login: "/auth/login",
            signup: "/auth/signup",
            register: "/auth/register",
            logout: "/auth/logout",
            requestPasswordReset: "/auth/requestPasswordReset",
            resetPassword: (userId: string, token: string) => `/auth/resetpassword/${userId}/${token}`,
        },

        // Admin - User Management
        adminUser: {
            userCountPerDay: "/admin/user/user-count-per-day",
            totalUsers: "/admin/user/total-users",
            getAllUsers: "/admin/user/get-all-users",
            getUser: (id: string | number) => `/admin/user/get-user/${id}`,
            deleteUser: (id: string | number) => `/admin/user/delete-user/${id}`,
        },

        // Admin - Scenario
        adminScenario: {
            postScenario: "/admin/scenario/post-scenario",
            getAllScenarios: "/admin/scenario/get-all-scenarios",
            getScenario: (id: string | number) => `/admin/scenario/get-scenario/${id}`,
            getScenarioBySimulation: (simulationId: string | number) =>
                `/admin/scenario/get-scenario-by-simulation/${simulationId}`,
            updateScenario: (id: string | number) => `/admin/scenario/update-scenario/${id}`,
            deleteScenario: (id: string | number) => `/admin/scenario/delete-scenario/${id}`,
        },

        // Admin - Component (Pendaftaran, Admisi)
        adminComponent: {
            getComponent: (type: string, id: string | number) =>
                `/admin/component/get-component/${type}/${id}`,
            postComponent: (type: string) => `/admin/component/post-component/${type}`,
            updateComponent: (type: string, id: string | number) =>
                `/admin/component/update-component/${type}/${id}`,
            deleteComponent: (type: string, id: string | number) =>
                `/admin/component/delete-component/${type}/${id}`,
        },

        // Admin - Simulation
        adminSimulation: {
            postSimulation: "/admin/simulation/post-simulation",
            getAllSimulationsByCategory: (category: string) => `/admin/simulation/get-all-simulation/${category}`,
            getSimulation: (id: string | number) => `/admin/simulation/get-simulation/${id}`,
            updateSimulation: (id: string | number) => `/admin/simulation/update-simulation/${id}`,
            deleteSimulation: (id: string | number) => `/admin/simulation/delete-simulation/${id}`,
        },

        // Admin - Registration
        adminRegistration: {
            postRegistration: "/admin/registration/post-registration",
            getRegistration: (id: string | number) => `/admin/registration/get-registration/${id}`,
            updateRegistration: (id: string | number) => `/admin/registration/update-registration/${id}`,
            deleteRegistration: (id: string | number) => `/admin/registration/delete-registration/${id}`,
        },

        // Admin - Admission
        adminAdmission: {
            postAdmission: "/admin/admission/post-admission",
            getAdmission: (simulationId: string | number) => `/admin/admission/get-admission/${simulationId}`,
            updateAdmission: (simulationId: string | number) => `/admin/admission/update-admission/${simulationId}`,
            deleteAdmission: (simulationId: string | number) => `/admin/admission/delete-admission/${simulationId}`,
        },
    },
} as const;

export const getApiUrl = (endpoint: string): string => {
    const base = config.api.baseUrl.replace(/\/$/, ""); 
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    return `${base}${path}`;
};

export default config;
