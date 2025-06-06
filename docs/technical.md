## Overview

This document outlines the technical architecture for a simple TODO application built using Node.js, Express, TypeScript, and SQLite.

## Technology Stack

- **Backend Framework**: Express.js
- **Database ORM/Query Builder**: Knex.js
- **Language**: TypeScript
- **Database**: SQLite
- **API Documentation**: Swagger (OpenAPI)

## Core Components

### 1. API Endpoints

- All API endpoints will be defined in `src/routes`.
- Routes will be responsible for handling HTTP requests, validating input, and calling the appropriate services.

### 2. Services

- Business logic will reside in services located in `src/services`.
- Services will coordinate data access and perform operations required by the API endpoints.

### 3. Data Access

- All database interactions will be handled by a data access layer in `src/db`.
- We will use Knex.js for query building and interacting with the SQLite database.

### 4. Authentication

- API endpoints will be secured using an API key.
- A custom middleware in `src/middleware/auth.ts` will handle API key validation.

## API Documentation

- Swagger UI will be available at the `/api-docs` endpoint.
- OpenAPI specifications will be generated from JSDoc comments in the route files.

## Development Workflow

1.  **Local Development**

    ```bash
    # Start development environment
    npm run dev
    ```

2.  **Database Migrations**

    - Knex.js will be used for managing database schema changes.
    - Migrations will be stored in `src/db/migrations`.

    ```bash
    # Run database migrations
    npx knex migrate:latest

    # Create a new migration
    npx knex migrate:make <migration_name>
    ``` 