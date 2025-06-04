const API_PREFIX = "/api/adminendpoints/musicians";

function getAuthHeaders(): HeadersInit {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (user?.token) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  return headers;
}

export async function createMusician(data: object) {
  const res = await fetch(`${API_PREFIX}/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateMusician(id: number, data: object) {
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

export async function getAllMusicians() {
  const res = await fetch(`${API_PREFIX}/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return res.json();
}