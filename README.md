# BDD 25 - demonstracija 

Po receptu sledećeg Medium članka:

https://medium.com/@vrknetha/the-ultimate-guide-to-ai-powered-development-with-cursor-from-chaos-to-clean-code-fc679973bbc4

## Angular dev fora za umeravanje na noviji stil, up to date korekcije

https://github.com/mgechev/resourceful-suspense/blob/main/.cursor/rules/angular-latest.md



# TODO API


This is a simple TODO application built with Node.js, Express, TypeScript, and SQLite. It provides a RESTful API for managing a list of TODO items.

## Features

- CRUD operations for TODO items
- API key authentication
- Interactive API documentation with Swagger

## Project Structure

```
.
├── .cursorules
├── docs
│   ├── architecture.mermaid
│   ├── status.md
│   └── technical.md
├── knexfile.ts
├── package.json
├── src
│   ├── config
│   │   └── swagger.ts
│   ├── db
│   │   ├── index.ts
│   │   └── migrations
│   ├── index.ts
│   ├── middleware
│   │   └── auth.middleware.ts
│   ├── routes
│   │   ├── index.ts
│   │   └── todo.routes.ts
│   └── services
│       └── todo.service.ts
├── tasks
│   └── tasks.md
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Set up your environment variables by creating a `.env` file in the root of the project. You can use the `.env.example` file as a template:
    ```bash
    cp .env.example .env
    ```
    Then, add your secret API key to the `.env` file:
    ```
    API_KEY=your-secret-api-key
    ```

### Database Migration

Run the following command to create the `todos` table in your SQLite database:

```bash
npx knex migrate:latest --knexfile knexfile.ts
```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

## API Usage

### Authentication

All API endpoints under `/api/todos` require an API key for authentication. You must provide the key in the `X-API-KEY` header of your requests.

### API Documentation

Interactive API documentation is available through Swagger UI at the following endpoint:

-   **Swagger Docs:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

You can use the Swagger interface to explore and test all the available API endpoints. 
