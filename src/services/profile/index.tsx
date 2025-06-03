import {getAuthToken} from "@/lib/utils";

export interface ProfileData {
    id: number;
    name: string;
    email: string;
    profesion: string | null;
    institute: string | null;
    phone_number: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProfileResponse {
    data: ProfileData;
}

export interface UpdateProfileData {
    name?: string;
    profesion?: string;
    institute?: string;
    phone_number?: string;
}

export interface UpdateProfileResponse {
    message: string;
    user: ProfileData;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:19200";

export const profileService = {
    async getProfile(): Promise<ProfileResponse> {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await fetch(`${API_URL}/auth/profile`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error("Authentication failed: Your session may have expired");
            }
            throw new Error(`Error fetching profile: ${response.status}`);
        }

        return await response.json();
    },

    async updateProfile(data: UpdateProfileData): Promise<UpdateProfileResponse> {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await fetch(`${API_URL}/auth/profile/update`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error("Authentication failed: Your session may have expired");
            }
            throw new Error(`Error updating profile: ${response.status}`);
        }

        return await response.json();
    },
};
