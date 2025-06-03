/**
 * API utility functions for making requests to the backend
 */

// Base API URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:19200"

// Types for API responses
export type RequestBody = Record<string, unknown>

export interface ApiResponse<T> {
  data?: T
  error?: string
}

/**
 * Get authentication token from localStorage
 */
const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

/**
 * Add authorization header if token exists
 */
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken()
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  return headers
}

/**
 * Generic fetch function with error handling and authentication
 */
const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
)
: Promise<ApiResponse<T>> =>
{
  try {
    const url = `${API_BASE_URL}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
    })

    // Handle unauthorized error
    if (response.status === 401) {
      // Redirect to login page if not already there
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        window.location.href = "/login"
      }
      return { error: "Unauthorized. Please log in." }
    }

    // Parse response
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      return {
        error: data.message || `Error: ${response.status} ${response.statusText}`,
      }
    }

    return { data }
  } catch (error) {
    console.error("API request failed:", error)
    return {
      error: error instanceof Error ? error.message : "Network error",
    }
  }
}

/**
 * HTTP methods wrapped with the fetchApi function
 */
export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => 
    fetchApi<T>(endpoint, { ...options, method: "GET" }),
    
  post: <T>(endpoint: string, data: RequestBody, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      ...options, 
      method: "POST", 
      body: JSON.stringify(data) 
    }),
    
  put: <T>(endpoint: string, data: RequestBody, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      ...options, 
      method: "PUT", 
      body: JSON.stringify(data) 
    }),
    
  patch: <T>(endpoint: string, data: RequestBody, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      ...options, 
      method: "PATCH", 
      body: JSON.stringify(data) 
    }),
    
  delete: <T>(endpoint: string, options?: RequestInit) => 
    fetchApi<T>(endpoint, { ...options, method: "DELETE" }),
}

///////////////////////
