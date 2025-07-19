import { AccountInfo } from "@azure/msal-browser";
import { apiRequest } from "./queryClient";

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  microsoftId: string | null;
  isAdmin: boolean;
}

export async function authenticateWithMicrosoft(account: AccountInfo): Promise<{ user: AuthUser; token: string }> {
  const response = await apiRequest("POST", "/api/auth/microsoft", {
    microsoftId: account.localAccountId,
    email: account.username,
    name: account.name || account.username,
  });
  
  const data = await response.json();
  return { user: data.user, token: data.token };
}

export function getStoredUser(): AuthUser | null {
  const stored = localStorage.getItem("auth_user");
  return stored ? JSON.parse(stored) : null;
}

export function getStoredToken(): string | null {
  return localStorage.getItem("auth_token");
}

export function storeUser(user: AuthUser): void {
  localStorage.setItem("auth_user", JSON.stringify(user));
}

export function storeToken(token: string): void {
  localStorage.setItem("auth_token", token);
}

export function clearStoredUser(): void {
  localStorage.removeItem("auth_user");
  localStorage.removeItem("auth_token");
}

export async function logoutUser(): Promise<void> {
  try {
    await apiRequest("POST", "/api/auth/logout");
  } catch (error) {
    console.error("Logout request failed:", error);
  } finally {
    clearStoredUser();
  }
}
