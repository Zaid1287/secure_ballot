import { createContext, useContext, useState, useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { AuthUser, getStoredUser, storeUser, storeToken, clearStoredUser, logoutUser, authenticateWithMicrosoft } from "@/lib/auth";
import { loginRequest } from "@/lib/msalConfig";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = getStoredUser();
      
      if (isAuthenticated && accounts.length > 0 && !storedUser) {
        try {
          const { user, token } = await authenticateWithMicrosoft(accounts[0]);
          setUser(user);
          storeUser(user);
          storeToken(token);
        } catch (error) {
          console.error("Microsoft authentication failed:", error);
        }
      } else if (storedUser && isAuthenticated) {
        setUser(storedUser);
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, [isAuthenticated, accounts]);

  const login = async () => {
    // Prevent multiple login attempts
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // First try silent authentication
      try {
        await instance.ssoSilent(loginRequest);
      } catch (silentError) {
        // If silent fails, use redirect method
        console.log("Silent auth failed, trying redirect...");
        await instance.loginRedirect({
          ...loginRequest,
          redirectUri: window.location.origin,
        });
      }
    } catch (error) {
      console.error("Microsoft login failed:", error);
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser(); // Clear JWT and backend session
      setUser(null);
      await instance.logoutRedirect({
        postLogoutRedirectUri: window.location.origin,
      }); // Microsoft logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if requests fail, clear local state
      setUser(null);
      clearStoredUser();
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
