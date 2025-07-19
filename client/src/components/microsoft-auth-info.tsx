import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Lock, Eye, Key } from "lucide-react";

export function MicrosoftAuthInfo() {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mt-6">
      <div className="flex items-center space-x-3 mb-4">
        <Shield className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
          Microsoft Azure AD Security
        </h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
        <div className="flex items-center space-x-2">
          <Lock className="h-4 w-4" />
          <span>Enterprise-grade authentication</span>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="h-4 w-4" />
          <span>Zero-knowledge architecture</span>
        </div>
        <div className="flex items-center space-x-2">
          <Key className="h-4 w-4" />
          <span>Multi-factor authentication</span>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4" />
          <span>GDPR & HIPAA compliant</span>
        </div>
      </div>
      
      <Alert className="mt-4 border-blue-200 bg-blue-50 dark:bg-blue-900/30">
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Your Microsoft credentials are never stored on our servers. Authentication is handled 
          directly by Microsoft Azure AD with industry-leading security standards.
        </AlertDescription>
      </Alert>
    </div>
  );
}