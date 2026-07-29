import API_BASE_URL from "./api";

export async function getSchools() {
    const response = await fetch(`${API_BASE_URL}/schools/`);

    if (!response.ok) {
        throw new Error("Failed to fetch schools");
    }

    return await response.json();
}