import API_BASE_URL from "./api";

export async function getUsers() {
    const response = await fetch(`${API_BASE_URL}/users/`);

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return await response.json();
}