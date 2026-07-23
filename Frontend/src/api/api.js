import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

let authToken = "";

export const setAuthToken = (token) => {
  authToken = token || "";
};

api.interceptors.request.use((config) => {
  if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
  return config;
});

export const getEvents = (params = {}) => api.get("/events", { params });
export const getEvent = (id) => api.get(`/events/${id}`);
export const createEvent = (payload) => api.post("/events", payload);
export const updateEvent = (id, payload) => api.put(`/events/${id}`, payload);
export const deleteEvent = (id) => api.delete(`/events/${id}`);
export const createRegistration = (payload) => api.post("/registrations", payload);
export const getRegistrations = (params = {}) => api.get("/registrations", { params });
export const getRegistration = (id) => api.get(`/registrations/${id}`);
export const updateRegistration = (id, payload) => api.put(`/registrations/${id}`, payload);
export const deleteRegistration = (id) => api.delete(`/registrations/${id}`);
export const registerUser = (payload) => api.post("/auth/register", payload);
export const loginUser = (payload) => api.post("/auth/login", payload);
export const getCurrentUser = () => api.get("/auth/me");
export const updateProfile = (payload) => api.put("/auth/profile", payload);

export default api;
