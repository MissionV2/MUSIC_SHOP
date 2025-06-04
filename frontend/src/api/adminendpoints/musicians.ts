const API_PREFIX = "http://127.0.0.1:8000/musicians";

function getAuthHeaders(): HeadersInit {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (user?.token) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  return headers;
}

export interface Musician {
  id: number;
  full_name: string;
  birth_date: string;
  death_date: string;
  nationality: string;
  bio: string;
}

export async function createMusician(data: Omit<Musician, "id">) {
  const res = await fetch(`${API_PREFIX}/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateMusician(id: number, data: Omit<Musician, "id">) {
  const res = await fetch(`${API_PREFIX}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteMusician(id: number) {
  const res = await fetch(`${API_PREFIX}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function getAllMusicians(): Promise<Musician[]> {
  const res = await fetch(`${API_PREFIX}/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return res.json();
}