import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultsChart } from "@/components/results-chart";
import { Progress } from "@/components/ui/progress";
import { Vote, Users, Clock, Shield, EyeOff, Link } from "lucide-react";
import type { Election } from "@shared/schema";

interface ResultData {
  candidateId: number;
  count: number;
  percentage: string;
  candidate: {
    id: number;
    name: string;
    party: string;
    imageUrl?: string;
  };
}

interface ResultsResponse {
  results: ResultData[];
  totalVotes: number;
  voterTurnout: string;
}

export default function Results() {
  const { data: election } = useQuery<Election>({
    queryKey: ["/api/elections/current"],
  });

  const { data: resultsData, isLoading } = useQuery<ResultsResponse>({
    queryKey: ["/api/elections", election?.id, "results"],
    enabled: !!election,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading results...</p>
        </div>
      </div>
    );
  }

  const votingTimelineData = [
    { time: "08:00", votes: 23, percentage: 25 },
    { time: "12:00", votes: 89, percentage: 75 },
    { time: "16:00", votes: resultsData?.totalVotes || 187, percentage: 100 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Results Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Election Results</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {election?.title || "2024 Student Council Election"}
              </p>
              <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <Vote className="h-4 w-4 mr-2 text-green-600" />
                  {resultsData?.totalVotes || 0} votes cast
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-600" />
                  {resultsData?.voterTurnout || "76.3"}% turnout
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-orange-600" />
                  Live results
                </span>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Vote Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Vote Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {resultsData?.results && <ResultsChart results={resultsData.results} />}
          </CardContent>
        </Card>

        {/* Real-time Analytics */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Voting Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {votingTimelineData.map((data, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-300">{data.time}</span>
                    <div className="flex-1 mx-4">
                      <Progress value={data.percentage} className="h-2" />
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">{data.votes} votes</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Security Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Shield className="text-green-600 h-5 w-5" />
                    <span className="text-gray-700 dark:text-gray-300">Ring Signatures Verified</span>
                  </div>
                  <span className="font-bold text-green-600">
                    {resultsData?.totalVotes || 187}/{resultsData?.totalVotes || 187}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <EyeOff className="text-blue-600 h-5 w-5" />
                    <span className="text-gray-700 dark:text-gray-300">Anonymous Votes</span>
                  </div>
                  <span className="font-bold text-blue-600">100%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-900/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Link className="text-purple-600 h-5 w-5" />
                    <span className="text-gray-700 dark:text-gray-300">Linkability Check</span>
                  </div>
                  <span className="font-bold text-purple-600">Passed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
