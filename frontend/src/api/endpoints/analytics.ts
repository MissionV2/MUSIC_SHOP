import { api } from "../apiClient";

export const getTopRecords = (limit: number = 10) =>
  api.get(`/analytics/records/records/sorted-by-sales`, { params: { limit } });