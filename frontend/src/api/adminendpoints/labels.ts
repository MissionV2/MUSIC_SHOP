const API_PREFIX = "http://127.0.0.1:8000/labels";

function getAuthHeaders(): HeadersInit {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (user?.token) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  return headers;
}

export async function createLabel(data: object) {
  const res = await fetch(`${API_PREFIX}/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (res.status === 204) return null;
  if (!res.ok) throw new Error("Ошибка при создании лейбла");
  return res.headers.get("content-type")?.includes("application/json")
    ? res.json()
    : null;
}

export async function updateLabel(id: number, data: object) {
  const res = await fetch(`${API_PREFIX}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteLabel(id: number) {
  const res = await fetch(`${API_PREFIX}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function getAllLabels(): Promise<Label[]> {
  const res = await fetch(`${API_PREFIX}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

// Определите тип Label
export interface Label {
  id: number;
  name: string;
  address: string;
  is_wholesaler: boolean;
}