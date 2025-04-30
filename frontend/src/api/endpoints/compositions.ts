import { api } from "../apiClient";

export const getCompositions = () => api.get("/compositions");
export const getCompositionById = (id: number) => api.get(`/compositions/${id}`);