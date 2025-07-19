import { 
  users, elections, candidates, votes, voterRegistrations,
  type User, type Election, type Candidate, type Vote, type VoterRegistration,
  type InsertUser, type InsertElection, type InsertCandidate, type InsertVote, type InsertVoterRegistration
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Election operations
  getElections(): Promise<Election[]>;
  getElection(id: number): Promise<Election | undefined>;
  createElection(election: InsertElection): Promise<Election>;
  updateElection(id: number, updates: Partial<Election>): Promise<Election | undefined>;

  // Candidate operations
  getCandidatesByElection(electionId: number): Promise<Candidate[]>;
  createCandidate(candidate: InsertCandidate): Promise<Candidate>;

  // Vote operations
  getVotesByElection(electionId: number): Promise<Vote[]>;
  createVote(vote: InsertVote): Promise<Vote>;
  getVoteCountsByCandidate(electionId: number): Promise<{ candidateId: number; count: number; candidate: Candidate }[]>;

  // Voter registration operations
  getVoterRegistration(userId: number, electionId: number): Promise<VoterRegistration | undefined>;
  getVoterRegistrationsByElection(electionId: number): Promise<(VoterRegistration & { user: User })[]>;
  createVoterRegistration(registration: InsertVoterRegistration): Promise<VoterRegistration>;
  updateVoterRegistration(id: number, updates: Partial<VoterRegistration>): Promise<VoterRegistration | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private elections: Map<number, Election>;
  private candidates: Map<number, Candidate>;
  private votes: Map<number, Vote>;
  private voterRegistrations: Map<number, VoterRegistration>;
  
  private currentUserId: number;
  private currentElectionId: number;
  private currentCandidateId: number;
  private currentVoteId: number;
  private currentRegistrationId: number;

  constructor() {
    this.users = new Map();
    this.elections = new Map();
    this.candidates = new Map();
    this.votes = new Map();
    this.voterRegistrations = new Map();
    
    this.currentUserId = 1;
    this.currentElectionId = 1;
    this.currentCandidateId = 1;
    this.currentVoteId = 1;
    this.currentRegistrationId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create admin user
    const adminUser: User = {
      id: this.currentUserId++,
      email: "admin@securevote.com",
      name: "Admin User",
      googleId: null,
      isAdmin: true,
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Create sample election
    const election: Election = {
      id: this.currentElectionId++,
      title: "2024 Student Council Election",
      description: "Annual student council election for leadership positions",
      registrationOpen: true,
      votingOpen: true,
      resultsVisible: true,
      createdAt: new Date(),
    };
    this.elections.set(election.id, election);

    // Create candidates
    const candidate1: Candidate = {
      id: this.currentCandidateId++,
      electionId: election.id,
      name: "Alex Johnson",
      party: "Independent",
      platform: "Promoting student wellness and academic excellence through innovative programs.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    };
    this.candidates.set(candidate1.id, candidate1);

    const candidate2: Candidate = {
      id: this.currentCandidateId++,
      electionId: election.id,
      name: "Sarah Chen",
      party: "Progressive Alliance",
      platform: "Building an inclusive campus community with sustainable initiatives and equal opportunities.",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    };
    this.candidates.set(candidate2.id, candidate2);

    // Create sample votes
    for (let i = 0; i < 98; i++) {
      const vote: Vote = {
        id: this.currentVoteId++,
        electionId: election.id,
        candidateId: candidate1.id,
        ringSignatureHash: `0x${Math.random().toString(16).substring(2, 10)}...`,
        ringSize: Math.floor(Math.random() * 50) + 100,
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
      };
      this.votes.set(vote.id, vote);
    }

    for (let i = 0; i < 89; i++) {
      const vote: Vote = {
        id: this.currentVoteId++,
        electionId: election.id,
        candidateId: candidate2.id,
        ringSignatureHash: `0x${Math.random().toString(16).substring(2, 10)}...`,
        ringSize: Math.floor(Math.random() * 50) + 100,
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
      };
      this.votes.set(vote.id, vote);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.googleId === googleId);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: this.currentUserId++,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async getElections(): Promise<Election[]> {
    return Array.from(this.elections.values());
  }

  async getElection(id: number): Promise<Election | undefined> {
    return this.elections.get(id);
  }

  async createElection(insertElection: InsertElection): Promise<Election> {
    const election: Election = {
      ...insertElection,
      id: this.currentElectionId++,
      createdAt: new Date(),
    };
    this.elections.set(election.id, election);
    return election;
  }

  async updateElection(id: number, updates: Partial<Election>): Promise<Election | undefined> {
    const election = this.elections.get(id);
    if (!election) return undefined;
    
    const updated = { ...election, ...updates };
    this.elections.set(id, updated);
    return updated;
  }

  async getCandidatesByElection(electionId: number): Promise<Candidate[]> {
    return Array.from(this.candidates.values()).filter(c => c.electionId === electionId);
  }

  async createCandidate(insertCandidate: InsertCandidate): Promise<Candidate> {
    const candidate: Candidate = {
      ...insertCandidate,
      id: this.currentCandidateId++,
    };
    this.candidates.set(candidate.id, candidate);
    return candidate;
  }

  async getVotesByElection(electionId: number): Promise<Vote[]> {
    return Array.from(this.votes.values()).filter(v => v.electionId === electionId);
  }

  async createVote(insertVote: InsertVote): Promise<Vote> {
    const vote: Vote = {
      ...insertVote,
      id: this.currentVoteId++,
      timestamp: new Date(),
    };
    this.votes.set(vote.id, vote);
    return vote;
  }

  async getVoteCountsByCandidate(electionId: number): Promise<{ candidateId: number; count: number; candidate: Candidate }[]> {
    const votes = await this.getVotesByElection(electionId);
    const candidates = await this.getCandidatesByElection(electionId);
    
    const counts = new Map<number, number>();
    votes.forEach(vote => {
      counts.set(vote.candidateId, (counts.get(vote.candidateId) || 0) + 1);
    });

    return candidates.map(candidate => ({
      candidateId: candidate.id,
      count: counts.get(candidate.id) || 0,
      candidate,
    }));
  }

  async getVoterRegistration(userId: number, electionId: number): Promise<VoterRegistration | undefined> {
    return Array.from(this.voterRegistrations.values()).find(
      r => r.userId === userId && r.electionId === electionId
    );
  }

  async getVoterRegistrationsByElection(electionId: number): Promise<(VoterRegistration & { user: User })[]> {
    const registrations = Array.from(this.voterRegistrations.values()).filter(
      r => r.electionId === electionId
    );
    
    return registrations.map(registration => {
      const user = this.users.get(registration.userId!);
      return { ...registration, user: user! };
    });
  }

  async createVoterRegistration(insertRegistration: InsertVoterRegistration): Promise<VoterRegistration> {
    const registration: VoterRegistration = {
      ...insertRegistration,
      id: this.currentRegistrationId++,
      registeredAt: new Date(),
    };
    this.voterRegistrations.set(registration.id, registration);
    return registration;
  }

  async updateVoterRegistration(id: number, updates: Partial<VoterRegistration>): Promise<VoterRegistration | undefined> {
    const registration = this.voterRegistrations.get(id);
    if (!registration) return undefined;
    
    const updated = { ...registration, ...updates };
    this.voterRegistrations.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
