import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Square, 
  UserPlus, 
  Download, 
  Activity, 
  Shield, 
  Zap, 
  Eye,
  Trash2
} from "lucide-react";
import type { Election, VoterRegistration, User } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Admin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: election } = useQuery<Election>({
    queryKey: ["/api/elections/current"],
  });

  const { data: registrations = [] } = useQuery<(VoterRegistration & { user: User })[]>({
    queryKey: ["/api/admin/elections", election?.id, "registrations"],
    enabled: !!election,
  });

  const updateElectionMutation = useMutation({
    mutationFn: async (updates: Partial<Election>) => {
      const response = await apiRequest("PATCH", `/api/admin/elections/${election?.id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/elections/current"] });
      toast({
        title: "Election Updated",
        description: "Election settings have been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update election settings.",
        variant: "destructive",
      });
    },
  });

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-8 text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
              <p className="text-gray-600 dark:text-gray-300">You do not have administrative privileges.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleToggleSetting = (setting: keyof Election, value: boolean) => {
    updateElectionMutation.mutate({ [setting]: value });
  };

  const quickActions = [
    {
      icon: Play,
      title: "Start Election",
      description: "Open voting process",
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-400",
      action: () => handleToggleSetting("votingOpen", true),
    },
    {
      icon: Square,
      title: "End Election", 
      description: "Close voting process",
      color: "bg-red-100 dark:bg-red-900",
      iconColor: "text-red-600 dark:text-red-400",
      action: () => handleToggleSetting("votingOpen", false),
    },
    {
      icon: UserPlus,
      title: "Manage Voters",
      description: "Registration control",
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
      action: () => {},
    },
    {
      icon: Download,
      title: "Export Results",
      description: "Download reports",
      color: "bg-purple-100 dark:bg-purple-900", 
      iconColor: "text-purple-600 dark:text-purple-400",
      action: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-primary-600 to-teal-600 text-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-primary-100">Manage elections and monitor system security</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-primary-100">System Monitoring</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-6 text-center group hover:shadow-2xl transition-all"
              onClick={action.action}
            >
              <div className="w-full">
                <div className={`w-16 h-16 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`${action.iconColor} text-2xl`} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">{action.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>

        {/* System Status & Controls */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Election Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Election Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Registration Status</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Voter registration process</p>
                  </div>
                  <Switch
                    checked={election?.registrationOpen || false}
                    onCheckedChange={(checked) => handleToggleSetting("registrationOpen", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Voting Status</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Active voting process</p>
                  </div>
                  <Switch
                    checked={election?.votingOpen || false}
                    onCheckedChange={(checked) => handleToggleSetting("votingOpen", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Results Visible</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Public result access</p>
                  </div>
                  <Switch
                    checked={election?.resultsVisible || false}
                    onCheckedChange={(checked) => handleToggleSetting("resultsVisible", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Monitoring */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">System Monitoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-800 dark:text-green-200 font-medium">System Health</span>
                    <span className="text-green-600 font-bold">Excellent</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-800 dark:text-blue-200 font-medium">Ring Signature Performance</span>
                    <span className="text-blue-600 font-bold">0.23s avg</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-800 dark:text-purple-200 font-medium">Security Level</span>
                    <span className="text-purple-600 font-bold">256-bit</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Voter Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Registered Voters</CardTitle>
              <Button className="bg-primary-600 hover:bg-primary-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Voter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-300 font-medium">Voter ID</th>
                    <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-300 font-medium">Name</th>
                    <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-300 font-medium">Registration Time</th>
                    <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-300 font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-300 font-medium">Ring Position</th>
                    <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((registration) => (
                    <tr key={registration.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-4 px-4 text-gray-900 dark:text-white font-mono">
                        #VTR-{registration.id.toString().padStart(4, '0')}
                      </td>
                      <td className="py-4 px-4 text-gray-900 dark:text-white">
                        {registration.user?.name || 'Unknown'}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                        {new Date(registration.registeredAt!).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={registration.verified ? "default" : "secondary"}>
                          {registration.verified ? "Verified" : "Pending"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                        {registration.ringPosition || '-'}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
