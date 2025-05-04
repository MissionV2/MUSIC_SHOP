import { api } from "../apiClient";

export const createOrder = (user_id: number) =>
  api.post("/orders/", null, { params: { user_id } });

export const getOrders = (user_id: number) =>
  api.get("/orders/orders", { params: { user_id } });