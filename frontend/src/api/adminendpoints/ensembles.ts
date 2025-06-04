const API_PREFIX = "http://127.0.0.1:8000/ensembles";

function getAuthHeaders(): HeadersInit {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (user?.token) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  return headers;
}

export async function createEnsemble(data: object) {
  const res = await fetch(`${API_PREFIX}/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateEnsemble(id: number, data: object) {
  const res = await fetch(`${API_PREFIX}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteEnsemble(id: number) {
  const res = await fetch(`${API_PREFIX}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
}

export interface Ensemble {
  id: number;
  name: string;
  formation_date: string; // формат YYYY-MM-DD
  description: string;
}

export async function getAllEnsembles(): Promise<Ensemble[]> {
  const res = await fetch(`http://127.0.0.1:8000/ensembles/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}