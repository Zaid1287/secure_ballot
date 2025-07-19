import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  microsoftId: text("microsoft_id").unique(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const elections = pgTable("elections", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  registrationOpen: boolean("registration_open").default(true),
  votingOpen: boolean("voting_open").default(false),
  resultsVisible: boolean("results_visible").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  electionId: integer("election_id").references(() => elections.id),
  name: text("name").notNull(),
  party: text("party"),
  platform: text("platform"),
  imageUrl: text("image_url"),
});

export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  electionId: integer("election_id").references(() => elections.id),
  candidateId: integer("candidate_id").references(() => candidates.id),
  ringSignatureHash: text("ring_signature_hash").notNull(),
  ringSize: integer("ring_size").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const voterRegistrations = pgTable("voter_registrations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  electionId: integer("election_id").references(() => elections.id),
  ringPosition: integer("ring_position"),
  verified: boolean("verified").default(false),
  registeredAt: timestamp("registered_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertElectionSchema = createInsertSchema(elections).omit({
  id: true,
  createdAt: true,
});

export const insertCandidateSchema = createInsertSchema(candidates).omit({
  id: true,
});

export const insertVoteSchema = createInsertSchema(votes).omit({
  id: true,
  timestamp: true,
});

export const insertVoterRegistrationSchema = createInsertSchema(voterRegistrations).omit({
  id: true,
  registeredAt: true,
});

export type User = typeof users.$inferSelect;
export type Election = typeof elections.$inferSelect;
export type Candidate = typeof candidates.$inferSelect;
export type Vote = typeof votes.$inferSelect;
export type VoterRegistration = typeof voterRegistrations.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertElection = z.infer<typeof insertElectionSchema>;
export type InsertCandidate = z.infer<typeof insertCandidateSchema>;
export type InsertVote = z.infer<typeof insertVoteSchema>;
export type InsertVoterRegistration = z.infer<typeof insertVoterRegistrationSchema>;
