import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Loader2 } from "lucide-react";
import type { Candidate } from "@shared/schema";

interface VoteConfirmationProps {
  candidate: Candidate;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export function VoteConfirmation({ candidate, onConfirm, onCancel }: VoteConfirmationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(75);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate ring signature generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    try {
      await onConfirm();
    } finally {
      clearInterval(interval);
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600 dark:text-green-400 text-3xl" />
          </div>
          Confirm Your Vote
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-gray-600 dark:text-gray-300">
          You have selected: <span className="font-semibold">{candidate.name}</span>
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">Cryptographic Process</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
              <span>Generating Ring Signature...</span>
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin text-primary-600" />}
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </div>

        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Vote"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
