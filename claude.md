# Claude.md - Project Context

## Project Overview
This is a notes taking web application built with SvelteKit. 

## Tech Stack
- **Frontend**: SvelteKit, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript, Amplify
- **Database**: PostgreSQL
- **Testing**: Jest
- **Build Tools**: Vite, esbuild
- **Package Manager**: npm

## Project Structure

## Key Files and Directories

## Coding Standards
- Use TypeScript strict mode
- Follow ESLint configuration in `.eslintrc.js`
- Use Prettier for code formatting
- Prefer functional components with hooks
- Use descriptive variable names (camelCase)
- Use absolute imports with path mapping

## Common Patterns
- **API Routes**: Follow REST conventions (`/api/v1/resource`)
- **Components**: Use compound component pattern for complex UI
- **Error Handling**: Use custom error classes and error boundaries

## Environment Setup

## Database Schema
Main entities:

## API Conventions
- Use HTTP status codes correctly
- Return consistent JSON response format
- Include request/response TypeScript interfaces
- Use middleware for authentication and validation
- Follow RESTful URL patterns

## Frontend Patterns

## Recent Changes

## Common Commands

## Important Notes
- Always run type checking before committing
- Use the shared types from `packages/types` for API interfaces
- Follow the component naming convention: PascalCase for components, camelCase for props
- Keep components small and focused on single responsibility

## Context for AI Assistants
When helping with this project:
1. Assume TypeScript strict mode is enabled
2. Use the established file structure and naming conventions
3. Consider both frontend and backend implications for changes
4. Suggest type-safe solutions and proper error handling