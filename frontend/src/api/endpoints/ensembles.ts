import { api } from "../apiClient";

export const getEnsembleById = (id: number) => api.get(`/ensembles/${id}`);