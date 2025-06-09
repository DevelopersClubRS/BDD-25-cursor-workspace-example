# Current Sprint Tasks

## TASK-001: Implement TODO CRUD Endpoints
Status: To Do
Priority: High
Dependencies: None

### Requirements
- Create, Read, Update, and Delete operations for TODO items.
- A TODO item should have an `id`, `title` (string), `description` (text), and `status` (string, one of "pending", "in-progress", "completed").
- Endpoints should return appropriate JSON responses and HTTP status codes.

### Acceptance Criteria
1. `POST /todos`: Creates a new TODO item. Returns the created item with a 201 status code.
2. `GET /todos`: Returns a list of all TODO items.
3. `GET /todos/:id`: Returns a single TODO item by its ID.
4. `PUT /todos/:id`: Updates an existing TODO item. Returns the updated item.
5. `DELETE /todos/:id`: Deletes a TODO item. Returns a 204 status code on success.

### Technical Notes
- Use Knex.js for database interactions.
- Create a `todos` table with the specified fields.
- Implement a `TodoService` to handle the business logic.

---

## TASK-002: Secure Endpoints with API Key Authentication
Status: To Do
Priority: High
Dependencies: TASK-001

### Requirements
- All endpoints under `/todos` should be protected.
- A valid API key must be provided in the `X-API-KEY` request header.
- If the API key is missing or invalid, the server should respond with a `401 Unauthorized` error.

### Acceptance Criteria
1. Requests to `/todos` without a valid `X-API-KEY` header are rejected with a 401 status.
2. Requests to `/todos` with a valid `X-API-KEY` header are processed successfully.
3. The API key should be configurable via environment variables.

### Technical Notes
- Create a custom middleware for authentication.
- Store the API key in a `.env` file.

---

## TASK-003: Set Up Swagger for API Documentation
Status: To Do
Priority: Medium
Dependencies: TASK-001

### Requirements
- Integrate Swagger UI to provide interactive API documentation.
- The documentation should be available at the `/api-docs` endpoint.
- All TODO endpoints should be documented.

### Acceptance Criteria
1. The Swagger UI is accessible at `/api-docs`.
2. The documentation accurately reflects all available `/todos` endpoints, including request bodies, parameters, and responses.
3. Users can test the API endpoints directly from the Swagger UI.

### Technical Notes
- Use `swagger-ui-express` and `swagger-jsdoc`.
- Write JSDoc comments on the route definitions to generate the Swagger specification.

---

## TASK-004: Add Status to TODOs
Status: To Do
Priority: High
Dependencies: TASK-001

### Requirements
- Add a `status` field to the TODO items.
- The `status` field can have one of the following values: "pending", "in-progress", "completed".
- Update the CRUD endpoints to support the new `status` field.
- The `completed` boolean field should be removed.

### Acceptance Criteria
1. The `todos` table in the database is updated to include a `status` column and remove the `completed` column.
2. `POST /todos`: A new TODO item is created with a default status of "pending".
3. `PUT /todos/:id`: The status of a TODO item can be updated.
4. `GET /todos`: The response includes the `status` for each TODO item.

### Technical Notes
- Create a new database migration to alter the `todos` table.
- Update the `TodoService` to handle the logic for the new `status` field.
- Update API documentation to reflect the changes. 