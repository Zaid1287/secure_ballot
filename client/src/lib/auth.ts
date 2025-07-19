import { AccountInfo } from "@azure/msal-browser";
import { apiRequest } from "./queryClient";

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  microsoftId: string | null;
  isAdmin: boolean;
}

export async function authenticateWithMicrosoft(account: AccountInfo): Promise<AuthUser> {
  const response = await apiRequest("POST", "/api/auth/microsoft", {
    microsoftId: account.localAccountId,
    email: account.username,
    name: account.name || account.username,
  });
  
  const data = await response.json();
  return data.user;
}

export function getStoredUser(): AuthUser | null {
  const stored = localStorage.getItem("auth_user");
  return stored ? JSON.parse(stored) : null;
}

export function storeUser(user: AuthUser): void {
  localStorage.setItem("auth_user", JSON.stringify(user));
}

export function clearStoredUser(): void {
  localStorage.removeItem("auth_user");
}
