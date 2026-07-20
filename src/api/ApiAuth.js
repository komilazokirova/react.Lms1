import { api } from "./api";

export async function loginRequest(email, password) {
  const response = await api.post("/auth/login", { email, password });

  if (!response.data) {
    throw new Error("Something went wrong!");
  }

  // access va refresh tokenlarni saqlab qo'yamiz
  localStorage.setItem("token", response.data.access_token);
  localStorage.setItem("refreshToken", response.data.refresh_token);

  return response.data;
}

export async function registerRequest(email, name, password, role, avatar) {
  const response = await api.post("/users", {
    email,
    name,
    password,
    role,
    avatar,
  });

  if (!response.data) {
    throw new Error("Something went wrong!");
  }

  return response.data;
}

export async function getProfile() {
  const response = await api.get("/auth/profile");

  if (!response.data) {
    throw new Error("Something went wrong!");
  }

  return response.data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
}