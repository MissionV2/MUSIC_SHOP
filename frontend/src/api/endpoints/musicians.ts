import { api } from "../apiClient";

export const getMusicianById = (id: number) => api.get(`/musicians/${id}`);