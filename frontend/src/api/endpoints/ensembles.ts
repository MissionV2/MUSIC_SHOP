import { api } from "../apiClient";

export const getEnsembleById = (id: number) => api.get(`/ensembles/${id}`);

export const getEnsembleCompositionsCount = (id: number) =>
  api.get(`/ensembles/ensembles/${id}/compositions-count`);

export const getEnsembleRecordTitles = (id: number) =>
  api.get(`/ensembles/${id}/record-titles`);