import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Candidate } from "@shared/schema";

interface CandidateCardProps {
  candidate: Candidate;
  onSelect: (candidate: Candidate) => void;
  selected?: boolean;
}

export function CandidateCard({ candidate, onSelect, selected }: CandidateCardProps) {
  return (
    <Card 
      className={`hover:shadow-2xl transition-all cursor-pointer border-2 ${
        selected 
          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" 
          : "border-transparent hover:border-primary-500"
      }`}
    >
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <img 
            src={candidate.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"} 
            alt={`${candidate.name} professional photo`}
            className="w-24 h-24 rounded-full mx-auto object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{candidate.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{candidate.party}</p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {candidate.platform}
          </p>
          <Button 
            className="w-full bg-primary-600 hover:bg-primary-700 text-white"
            onClick={() => onSelect(candidate)}
          >
            Select Candidate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
