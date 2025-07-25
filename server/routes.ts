import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateToken, authenticateToken, requireAdmin, type AuthenticatedRequest } from "./auth";
import { insertVoteSchema, insertVoterRegistrationSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current election
  app.get("/api/elections/current", async (req, res) => {
    try {
      const elections = await storage.getElections();
      const currentElection = elections[0]; // For demo, use first election
      if (!currentElection) {
        return res.status(404).json({ message: "No election found" });
      }
      res.json(currentElection);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch election" });
    }
  });

  // Get candidates for current election
  app.get("/api/elections/:id/candidates", async (req, res) => {
    try {
      const electionId = parseInt(req.params.id);
      const candidates = await storage.getCandidatesByElection(electionId);
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch candidates" });
    }
  });

  // Get election results
  app.get("/api/elections/:id/results", async (req, res) => {
    try {
      const electionId = parseInt(req.params.id);
      const results = await storage.getVoteCountsByCandidate(electionId);
      const totalVotes = results.reduce((sum, result) => sum + result.count, 0);
      
      const formattedResults = results.map(result => ({
        ...result,
        percentage: totalVotes > 0 ? ((result.count / totalVotes) * 100).toFixed(1) : "0.0",
      }));

      res.json({
        results: formattedResults,
        totalVotes,
        voterTurnout: "76.3", // Mock turnout percentage
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch results" });
    }
  });

  // Microsoft authentication endpoint with JWT
  app.post("/api/auth/microsoft", async (req, res) => {
    try {
      const { microsoftId, email, name } = req.body;
      
      if (!microsoftId || !email || !name) {
        return res.status(400).json({ message: "Missing required authentication data" });
      }

      let user = await storage.getUserByMicrosoftId(microsoftId);
      if (!user) {
        user = await storage.createUser({
          microsoftId,
          email,
          name,
          isAdmin: false,
        });
      }

      // Generate JWT token
      const token = generateToken(user);
      
      // Set secure HTTP-only cookie
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.json({ user, token });
    } catch (error) {
      console.error("Microsoft authentication error:", error);
      res.status(500).json({ message: "Authentication failed" });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie('auth_token');
    res.json({ message: "Logged out successfully" });
  });

  // Register voter for election (protected route)
  app.post("/api/elections/:id/register", authenticateToken, async (req: AuthenticatedRequest, res) => {
    try {
      const electionId = parseInt(req.params.id);
      const userId = req.user!.id;

      const existingRegistration = await storage.getVoterRegistration(userId, electionId);
      if (existingRegistration) {
        return res.status(400).json({ message: "Already registered for this election" });
      }

      const registrations = await storage.getVoterRegistrationsByElection(electionId);
      const ringPosition = registrations.length + 1;

      const registration = await storage.createVoterRegistration({
        userId,
        electionId,
        ringPosition,
        verified: true,
      });

      res.json(registration);
    } catch (error) {
      res.status(500).json({ message: "Failed to register voter" });
    }
  });

  // Submit vote (protected route)
  app.post("/api/elections/:id/vote", authenticateToken, async (req: AuthenticatedRequest, res) => {
    try {
      const electionId = parseInt(req.params.id);
      const voteData = insertVoteSchema.parse({
        ...req.body,
        electionId,
      });

      // Verify user is registered for this election
      const registration = await storage.getVoterRegistration(req.user!.id, electionId);
      if (!registration || !registration.verified) {
        return res.status(403).json({ message: "Not registered or verified for this election" });
      }

      // Mock ring signature generation
      const ringSignatureHash = `0x${Math.random().toString(16).substring(2, 10)}...`;
      const ringSize = Math.floor(Math.random() * 50) + 100;

      const vote = await storage.createVote({
        ...voteData,
        ringSignatureHash,
        ringSize,
      });

      res.json({
        vote,
        ringSignatureHash,
        ringSize,
        timestamp: vote.timestamp,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid vote data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit vote" });
    }
  });

  // Admin: Update election settings
  app.patch("/api/admin/elections/:id", async (req, res) => {
    try {
      const electionId = parseInt(req.params.id);
      const updates = req.body;

      const election = await storage.updateElection(electionId, updates);
      if (!election) {
        return res.status(404).json({ message: "Election not found" });
      }

      res.json(election);
    } catch (error) {
      res.status(500).json({ message: "Failed to update election" });
    }
  });

  // Admin: Get voter registrations
  app.get("/api/admin/elections/:id/registrations", async (req, res) => {
    try {
      const electionId = parseInt(req.params.id);
      const registrations = await storage.getVoterRegistrationsByElection(electionId);
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch registrations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
