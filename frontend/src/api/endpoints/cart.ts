import { api } from "../apiClient";

// Получить корзину пользователя
export const getCart = (userId: number) =>
  api.get(`/cart/${userId}`);

// Добавить товар в корзину
export const addToCart = (user_id: number, record_id: number, quantity: number = 1) =>
  api.post("/cart/add", { user_id, record_id, quantity });

// Удалить товар из корзины
export const removeFromCart = (user_id: number, record_id: number) =>
  api.delete(`/cart/remove`, { params: { user_id, record_id } });