import API_BASE_URL from "./api";

export async function loginUser(credentials: any) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error("Failed to login");
    }

    return await response.json();
}