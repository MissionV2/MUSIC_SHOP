const API_PREFIX = "http://127.0.0.1:8000/records";

function getAuthHeaders(): HeadersInit {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (user?.token) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  return headers;
}

export async function createRecord(data: object) {
  const res = await fetch(`${API_PREFIX}/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateRecord(id: number, data: object) {
  const res = await fetch(`${API_PREFIX}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteRecord(id: number) {
  const res = await fetch(`${API_PREFIX}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
}

export interface RecordType {
  id: number;
  catalog_number: string;
  title: string;
  release_date: string;
  wholesale_price: number;
  retail_price: number;
  stock_quantity: number;
  sales_current_year: number;
  sales_previous_year: number;
  label_id: number;
}

export async function getAllRecords(): Promise<RecordType[]> {
  const res = await fetch(`http://127.0.0.1:8000/records`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}