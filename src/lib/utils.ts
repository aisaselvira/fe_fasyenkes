import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get the authentication token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

// Set the authentication token in localStorage
export const setAuthToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token)
  }
}

// Remove the authentication token from localStorage
export const removeAuthToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
  }
}

/**
 * Check if the user is logged in
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") {
    return false
  }

  const token = localStorage.getItem("token")
  return !!token
}

/**
 * Redirect to login page
 */
export const redirectToLogin = (): void => {
  if (typeof window !== "undefined") {
    // Store the current URL to redirect back after login
    const currentPath = window.location.pathname
    localStorage.setItem("redirectAfterLogin", currentPath)

    // Redirect to login page
    window.location.href = "/login"
  }
}

/**
 * Get redirect path after login
 */
export const getRedirectPath = (): string | null => {
  if (typeof window === "undefined") {
    return null
  }

  const redirectPath = localStorage.getItem("redirectAfterLogin")
  localStorage.removeItem("redirectAfterLogin") // Clear it after getting
  return redirectPath
}
