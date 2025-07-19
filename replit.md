# SecureVote - Anonymous Voting System

## Overview

SecureVote is a full-stack web application implementing an anonymous voting system using Linkable Ring Signatures (LRS) technology. The application provides secure, privacy-preserving elections with real-time results and comprehensive admin controls.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state
- **UI Framework**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite with hot module replacement

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with JSON responses
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Express sessions with PostgreSQL store

### Database Design
- **Primary Database**: PostgreSQL (via Neon serverless)
- **Schema Management**: Drizzle migrations
- **Tables**: users, elections, candidates, votes, voter_registrations
- **Key Features**: Ring signature hash storage, voter anonymity

## Key Components

### Authentication System
- **Strategy**: Microsoft Azure AD with MSAL (Microsoft Authentication Library)
- **Security**: Enterprise-grade authentication with multi-factor support
- **Storage**: Secure token management via MSAL with session storage
- **Authorization**: Role-based access (admin/voter)
- **Privacy**: Zero-knowledge architecture - credentials never stored on server

### Voting Mechanism
- **Technology**: Linkable Ring Signatures for anonymity
- **Process**: Candidate selection → Ring signature generation → Anonymous vote submission
- **Privacy**: No voter identity linkage to cast votes
- **Verification**: Ring signature hash validation

### Admin Dashboard
- **Election Control**: Open/close registration and voting phases
- **Real-time Results**: Live vote counting and visualization
- **Voter Management**: Registration approval and monitoring
- **Data Export**: Election results and statistics

### UI/UX Design
- **Design System**: Consistent component library with dark/light themes
- **Responsive**: Mobile-first design with adaptive layouts
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Code splitting and optimized bundles

## Data Flow

### Voter Registration Flow
1. User authenticates via Google OAuth mock
2. System creates user record in database
3. Voter registers for specific election
4. Admin approves registration (optional)
5. Ring position assigned for anonymity

### Voting Flow
1. Authenticated user selects candidate
2. Client generates ring signature locally
3. Vote submitted with ring signature hash
4. Server validates and stores anonymous vote
5. Real-time results updated

### Results Flow
1. Admin or public views results page
2. Server aggregates votes by candidate
3. Percentage calculations and statistics
4. Real-time updates via React Query

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **express**: Web server framework
- **zod**: Runtime type validation

### Security Dependencies
- **@azure/msal-browser**: Microsoft Authentication Library for browser
- **@azure/msal-react**: React integration for MSAL authentication
- **Microsoft Azure AD**: Enterprise identity platform for secure authentication

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tailwindcss**: Utility-first CSS framework
- **eslint**: Code linting and formatting

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Code navigation assistance

## Deployment Strategy

### Development Environment
- **Server**: Express with Vite middleware for HMR
- **Database**: Neon PostgreSQL with connection pooling
- **Build**: TypeScript compilation with source maps
- **Hot Reload**: Client and server-side hot reloading

### Production Build
- **Frontend**: Vite build to static assets
- **Backend**: esbuild compilation to single file
- **Database**: Drizzle migrations for schema updates
- **Environment**: NODE_ENV-based configuration

### Database Management
- **Migrations**: Drizzle Kit for schema versioning
- **Connection**: Environment-based DATABASE_URL
- **Pooling**: Neon serverless connection management
- **Backup**: Automated via Neon platform

### Security Considerations
- **Input Validation**: Zod schemas for API endpoints
- **Rate Limiting**: Express middleware for abuse prevention
- **Session Security**: Secure cookie configuration
- **CORS**: Configured for production domains
- **Environment Variables**: Sensitive data protection

The application is designed to be scalable, secure, and maintainable with clear separation of concerns between frontend and backend systems. The ring signature implementation ensures voter privacy while maintaining election integrity.