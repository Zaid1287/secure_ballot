import { apiRequest } from "./queryClient";

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  googleId: string | null;
  isAdmin: boolean;
}

export async function authenticateWithGoogle(): Promise<AuthUser> {
  // Mock Google authentication - in real app, use Google OAuth
  const mockToken = "mock_google_token_" + Date.now();
  
  const response = await apiRequest("POST", "/api/auth/google", {
    token: mockToken,
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
