import { createContext, useContext, useState, useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { AuthUser, getStoredUser, storeUser, clearStoredUser, authenticateWithMicrosoft } from "@/lib/auth";
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
          const authUser = await authenticateWithMicrosoft(accounts[0]);
          setUser(authUser);
          storeUser(authUser);
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
    setIsLoading(true);
    try {
      await instance.loginPopup(loginRequest);
    } catch (error) {
      console.error("Microsoft login failed:", error);
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    clearStoredUser();
    instance.logoutPopup();
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
