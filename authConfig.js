// Microsoft Azure AD Authentication Configuration
const authConfig = {
  // Client application details
  clientId: "f456d66d-734d-418d-ba98-dd48ea081819",
  
  // Authority URL for authentication
  authority: "https://login.microsoftonline.com/a57f7d92-038e-4d4c-8265-7cd2beb33b34",
  
  // Redirect URIs
  redirectUri: "http://localhost:5000",
  postLogoutRedirectUri: "http://localhost:5000",
  
  // Application scopes
  scopes: [
    "User.Read",
    "openid", 
    "profile"
  ],
  
  // Cache configuration
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  },
  
  // Graph API endpoints
  graphEndpoints: {
    me: "https://graph.microsoft.com/v1.0/me"
  },
  
  // Tenant information
  tenant: {
    type: "single-tenant", // specific tenant
    id: "a57f7d92-038e-4d4c-8265-7cd2beb33b34"
  },
  
  // Application settings
  application: {
    name: "SecureVote - Anonymous Voting System",
    version: "1.0.0",
    environment: "development"
  }
};

module.exports = authConfig;