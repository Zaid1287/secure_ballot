import { Switch, Route } from "wouter";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/use-auth";
import { Navigation } from "@/components/navigation";
import { msalConfig } from "@/lib/msalConfig";
import Home from "@/pages/home";
import Vote from "@/pages/vote";
import Results from "@/pages/results";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

const msalInstance = new PublicClientApplication(msalConfig);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/vote" component={Vote} />
      <Route path="/results" component={Results} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="secure-vote-theme">
          <AuthProvider>
            <TooltipProvider>
              <div className="min-h-screen bg-background">
                <Navigation />
                <Router />
                <Toaster />
              </div>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </MsalProvider>
  );
}

export default App;
