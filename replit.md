# SecureVote - Anonymous Voting Platform

## Overview

SecureVote is a modern web application that implements anonymous voting using Linkable Ring Signatures (LRS) technology. The system combines a React frontend with an Express.js backend, featuring Microsoft Azure AD authentication and PostgreSQL database storage via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Authentication**: Microsoft MSAL (Microsoft Authentication Library)
- **Build Tool**: Vite with custom plugins for development

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Authentication**: JWT tokens with Microsoft Azure AD integration
- **API Design**: RESTful API with role-based access control
- **Middleware**: Cookie parser, JSON parsing, request logging

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with Zod validation schemas
- **Migration**: Drizzle Kit for schema management
- **Schema**: Five main tables - users, elections, candidates, votes, voter_registrations

## Key Components

### Authentication System
- **Microsoft Integration**: Azure AD B2C for enterprise-grade authentication
- **Token Management**: JWT with 7-day expiration, stored in localStorage
- **Authorization**: Role-based access with admin privileges
- **Security**: Secure token verification with issuer/audience validation

### Voting System
- **Anonymous Voting**: Linkable Ring Signatures for privacy-preserving votes
- **Ring Structure**: Randomized ring size to prevent server overload
- **Vote Storage**: Ring signature hash with metadata (no voter identity)
- **Real-time Results**: Live vote counting with percentage calculations

### Admin Dashboard
- **Election Control**: Toggle registration and voting phases
- **Voter Management**: View and manage voter registrations
- **Results Monitoring**: Real-time election results with visualizations
- **User Management**: Admin role assignment and user oversight

### UI Components
- **Design System**: shadcn/ui with consistent Tailwind styling
- **Responsive Design**: Mobile-first approach with dark/light theme support
- **Interactive Elements**: Progress bars, charts, confirmation dialogs
- **Accessibility**: ARIA labels and keyboard navigation support

## Data Flow

### User Registration & Authentication
1. User initiates Microsoft login via MSAL
2. Azure AD authenticates and returns user profile
3. Backend creates/updates user record with Microsoft ID
4. JWT token generated and returned to client
5. Token stored in localStorage for subsequent requests

### Voting Process
1. User selects candidate from election interface
2. System generates ring signature with randomized ring members
3. Vote submitted with ring signature hash (no voter identity)
4. Backend validates signature and stores anonymous vote
5. Real-time results updated via query invalidation

### Admin Operations
1. Admin authentication verified via JWT middleware
2. Election settings modified through protected endpoints
3. Voter registration status managed in real-time
4. Results dashboard updated with live vote counts

## External Dependencies

### Microsoft Azure Services
- **Azure AD B2C**: Primary authentication provider
- **MSAL Browser**: Client-side authentication library
- **MSAL React**: React integration for Azure authentication

### Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations
- **Drizzle Kit**: Schema migrations and management

### UI & Styling
- **Radix UI**: Unstyled, accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Fast build tool with HMR
- **TypeScript**: Type safety across frontend and backend
- **Zod**: Runtime type validation for API schemas

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite middleware integrated with Express server
- **Error Handling**: Runtime error modal for development debugging
- **Logging**: Structured request/response logging with performance metrics

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: ESBuild compiles TypeScript server to `dist/index.js`
- **Static Assets**: Express serves built frontend from public directory
- **Environment**: Production mode disables development features

### Database Management
- **Migrations**: Drizzle Kit handles schema changes
- **Connection**: Environment-based database URL configuration
- **Schema**: Shared TypeScript types between frontend and backend

### Security Considerations
- **CORS**: Configured for cross-origin requests
- **Authentication**: JWT verification on protected endpoints
- **Input Validation**: Zod schemas validate all API inputs
- **Error Handling**: Structured error responses without sensitive data exposure