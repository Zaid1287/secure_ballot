import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CandidateCard } from "@/components/candidate-card";
import { VoteConfirmation } from "@/components/vote-confirmation";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, CheckCircle, Clock, Users } from "lucide-react";
import type { Election, Candidate } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Vote() {
  const { user, login } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [voteDetails, setVoteDetails] = useState<any>(null);

  const { data: election, isLoading: electionLoading } = useQuery<Election>({
    queryKey: ["/api/elections/current"],
    enabled: !!user,
  });

  const { data: candidates = [], isLoading: candidatesLoading } = useQuery<Candidate[]>({
    queryKey: ["/api/elections", election?.id, "candidates"],
    enabled: !!election,
  });

  const voteMutation = useMutation({
    mutationFn: async (candidateId: number) => {
      const response = await apiRequest("POST", `/api/elections/${election?.id}/vote`, {
        candidateId,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setVoteDetails(data);
      setVoteSubmitted(true);
      setShowConfirmation(false);
      toast({
        title: "Vote Submitted Successfully!",
        description: "Your vote has been anonymously recorded using Linkable Ring Signature technology.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/elections", election?.id, "results"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit vote. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCandidateSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowConfirmation(true);
  };

  const handleConfirmVote = async () => {
    if (selectedCandidate) {
      await voteMutation.mutateAsync(selectedCandidate.id);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="pt-8">
              <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserPlus className="text-yellow-600 dark:text-yellow-400 text-3xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Registration Required</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">You need to register with Google to participate in the voting process.</p>
              <Button onClick={login} className="bg-primary-600 hover:bg-primary-700">
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Register with Google
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (voteSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-8">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="text-green-600 dark:text-green-400 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Vote Submitted Successfully!</h3>
                <p className="text-gray-600 dark:text-gray-300">Your vote has been anonymously recorded using Linkable Ring Signature technology.</p>
                
                {voteDetails && (
                  <div className="bg-blue-50 dark:bg-blue-900/50 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Transaction Details</h4>
                    <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                      <div className="flex justify-between">
                        <span>Ring Signature Hash:</span>
                        <span className="font-mono">{voteDetails.ringSignatureHash}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Timestamp:</span>
                        <span>{new Date(voteDetails.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ring Size:</span>
                        <span>{voteDetails.ringSize}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showConfirmation && selectedCandidate) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <VoteConfirmation
            candidate={selectedCandidate}
            onConfirm={handleConfirmVote}
            onCancel={() => setShowConfirmation(false)}
          />
        </div>
      </div>
    );
  }

  if (electionLoading || candidatesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading election...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Election Header */}
        {election && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{election.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">{election.description || "Select your preferred candidate"}</p>
                <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Voting ends in 2 days
                  </span>
                  <span className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    245 registered voters
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        )}

        {/* Candidates */}
        <div className="grid md:grid-cols-2 gap-6">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onSelect={handleCandidateSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
