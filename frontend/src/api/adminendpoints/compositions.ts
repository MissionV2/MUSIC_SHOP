const API_PREFIX = "http://127.0.0.1:8000/compositions";

function getAuthHeaders(): HeadersInit {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (user?.token) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  return headers;
}

export interface Composition {
  id: number;
  title: string;
  year: number;
  genre: string;
  duration: number;
  ensemble_id: number;
}

export async function createComposition(data: object) {
  const res = await fetch(`${API_PREFIX}/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateComposition(id: number, data: object) {
  const res = await fetch(`${API_PREFIX}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteComposition(id: number) {
  const res = await fetch(`${API_PREFIX}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function getAllCompositions(): Promise<Composition[]> {
  const res = await fetch(`/api/adminendpoints/compositions/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}