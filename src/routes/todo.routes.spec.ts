import request from 'supertest';
import server from '../index';
import db from '../db';

// Set the API key for testing
process.env.API_KEY = 'test-key';
const API_KEY = process.env.API_KEY;

describe('Todo API', () => {

    beforeAll(async () => {
        // Run migrations for the in-memory test database
        await db.migrate.latest();
    });

    afterAll(async () => {
        // Destroy the database connection and close the server after all tests
        await db.destroy();
        server.close();
    });

    beforeEach(async () => {
        // Clear the todos table before each test
        await db('todos').del();
    });

    describe('POST /api/todos', () => {
        it('should create a new todo and return it', async () => {
            const newTodo = {
                title: 'Test Todo',
                description: 'Test description',
            };

            const response = await request(server)
                .post('/api/todos')
                .set('X-API-KEY', API_KEY)
                .send(newTodo);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe(newTodo.title);
        });

        it('should return 401 for missing API key', async () => {
            const newTodo = {
                title: 'Test Todo',
                description: 'Test description',
            };

            const response = await request(server)
                .post('/api/todos')
                .send(newTodo);

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/todos', () => {
        it('should return a list of todos', async () => {
            await db('todos').insert({ title: 'Todo 1', description: 'Desc 1' });
            await db('todos').insert({ title: 'Todo 2', description: 'Desc 2' });

            const response = await request(server)
                .get('/api/todos')
                .set('X-API-KEY', API_KEY);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
        });
    });

    describe('GET /api/todos/:id', () => {
        it('should return a single todo by id', async () => {
            const [newTodo] = await db('todos').insert({ title: 'Single Todo', description: 'Desc' }).returning('id');
            const todoId = newTodo.id;

            const response = await request(server)
                .get(`/api/todos/${todoId}`)
                .set('X-API-KEY', API_KEY);

            expect(response.status).toBe(200);
            expect(response.body.id).toBe(todoId);
        });

        it('should return 404 if todo not found', async () => {
            const response = await request(server)
                .get('/api/todos/999')
                .set('X-API-KEY', API_KEY);

            expect(response.status).toBe(404);
        });
    });

    describe('PUT /api/todos/:id', () => {
        it('should update a todo and return it', async () => {
            const [newTodo] = await db('todos').insert({ title: 'Update Todo', description: 'Desc' }).returning('id');
            const todoId = newTodo.id;
            const updatedData = { title: 'Updated Title', completed: true };

            const response = await request(server)
                .put(`/api/todos/${todoId}`)
                .set('X-API-KEY', API_KEY)
                .send(updatedData);

            expect(response.status).toBe(200);
            expect(response.body.title).toBe(updatedData.title);
            expect(response.body.completed).toBe(true);
        });
    });

    describe('DELETE /api/todos/:id', () => {
        it('should delete a todo and return 204 status', async () => {
            const [newTodo] = await db('todos').insert({ title: 'Delete Todo', description: 'Desc' }).returning('id');
            const todoId = newTodo.id;

            const response = await request(server)
                .delete(`/api/todos/${todoId}`)
                .set('X-API-KEY', API_KEY);

            expect(response.status).toBe(204);

            const foundTodo = await db('todos').where({ id: todoId }).first();
            expect(foundTodo).toBeUndefined();
        });
    });
}); 