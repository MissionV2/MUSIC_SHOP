import { api } from "../apiClient";

export const getRecords = () => api.get("/records");
export const getRecordById = (id: number) => api.get(`/records/${id}`);