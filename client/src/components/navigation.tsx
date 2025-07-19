import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Shield, User } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const { user, login, logout, isLoading } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/vote", label: "Vote" },
    { path: "/results", label: "Results" },
    ...(user?.isAdmin ? [{ path: "/admin", label: "Admin" }] : []),
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="text-primary-600 text-2xl" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">SecureVote</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors ${
                  location === item.path ? "text-primary-600 font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-600" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-400" />
              )}
            </Button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">{user.name}</span>
                <Button variant="ghost" onClick={logout}>
                  <User className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button onClick={login} disabled={isLoading} className="bg-primary-600 hover:bg-primary-700">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                </svg>
                {isLoading ? "Signing In..." : "Sign In with Microsoft"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
