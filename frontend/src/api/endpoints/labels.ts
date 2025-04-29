// api/endpoints/labels.ts
import { api } from "../apiClient";

export const getLabels = () => api.get("/labels");
export const getLabelById = (id: number) => api.get(`/labels/${id}`);