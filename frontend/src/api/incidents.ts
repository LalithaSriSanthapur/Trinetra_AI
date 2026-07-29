import API_BASE_URL from "./api";

export async function getIncidents() {
    const response = await fetch(`${API_BASE_URL}/incidents/`);

    if (!response.ok) {
        throw new Error("Failed to fetch incidents");
    }

    return await response.json();
}