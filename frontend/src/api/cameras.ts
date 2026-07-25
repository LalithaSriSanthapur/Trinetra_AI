import API_BASE_URL from "./api";

export async function getCameras() {
    const response = await fetch(`${API_BASE_URL}/cameras/`);

    if (!response.ok) {
        throw new Error("Failed to fetch cameras");
    }

    return await response.json();
}