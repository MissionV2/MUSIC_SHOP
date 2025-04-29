// api/apiClient.ts
import axios from "axios";
import { API_URL } from "../core/config/appConfig";

export const api = axios.create({
  baseURL: API_URL,
});