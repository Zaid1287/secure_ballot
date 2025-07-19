import { Progress } from "@/components/ui/progress";
import type { Candidate } from "@shared/schema";

interface ResultData {
  candidateId: number;
  count: number;
  percentage: string;
  candidate: Candidate;
}

interface ResultsChartProps {
  results: ResultData[];
}

export function ResultsChart({ results }: ResultsChartProps) {
  const colors = ["bg-primary-600", "bg-teal-600", "bg-purple-600", "bg-orange-600"];

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <div key={result.candidateId} className="border border-gray-200 dark:border-gray-600 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img 
                src={result.candidate.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"} 
                alt={`${result.candidate.name} result photo`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{result.candidate.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{result.candidate.party}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${index === 0 ? "text-primary-600" : "text-teal-600"}`}>
                {result.percentage}%
              </div>
              <div className="text-sm text-gray-500">{result.count} votes</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${colors[index] || "bg-gray-500"}`}
              style={{ width: `${result.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
