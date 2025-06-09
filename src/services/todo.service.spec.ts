import { TodoService, Todo } from './todo.service';
import db from '../db';

describe('TodoService', () => {
    beforeAll(async () => {
        await db.migrate.latest();
    });

    afterAll(async () => {
        await db.destroy();
    });

    beforeEach(async () => {
        await db('todos').del();
    });

    describe('create', () => {
        it('should create a new todo and return it', async () => {
            const newTodoData: Todo = {
                title: 'Service Test',
                description: 'A test from the service',
                completed: false,
            };

            const createdTodo = await TodoService.create(newTodoData);

            expect(createdTodo).toHaveProperty('id');
            expect(createdTodo.title).toBe(newTodoData.title);
            expect(createdTodo.completed).toBe(false);

            const dbTodo = await db('todos').where({ id: createdTodo.id }).first();
            expect(dbTodo).toBeDefined();
            expect(dbTodo.title).toBe(newTodoData.title);
        });
    });

    describe('findAll', () => {
        it('should return all todos', async () => {
            await db('todos').insert([
                { title: 'Todo 1', description: 'Desc 1' },
                { title: 'Todo 2', description: 'Desc 2' },
            ]);

            const todos = await TodoService.findAll();

            expect(todos).toHaveLength(2);
        });
    });

    describe('findById', () => {
        it('should return a todo by its id', async () => {
            const [inserted] = await db('todos').insert({ title: 'Find Me', description: 'Desc' }).returning('id');
            const todoId = inserted.id;

            const foundTodo = await TodoService.findById(todoId);

            expect(foundTodo).toBeDefined();
            expect(foundTodo?.id).toBe(todoId);
        });

        it('should return undefined if todo not found', async () => {
            const foundTodo = await TodoService.findById(999);
            expect(foundTodo).toBeUndefined();
        });
    });

    describe('update', () => {
        it('should update a todo and return the updated data', async () => {
            const [inserted] = await db('todos').insert({ title: 'To Be Updated', description: 'Desc' }).returning('id');
            const todoId = inserted.id;

            const updatedData = {
                title: 'I am Updated',
                completed: true,
            };

            const updatedTodo = await TodoService.update(todoId, updatedData);

            expect(updatedTodo).toBeDefined();
            expect(updatedTodo?.title).toBe(updatedData.title);
            expect(updatedTodo?.completed).toBe(true);

            const dbTodo = await db('todos').where({ id: todoId }).first();
            expect(dbTodo.completed).toBe(1); // SQLite stores booleans as 0 or 1
        });
    });

    describe('delete', () => {
        it('should delete a todo from the database', async () => {
            const [inserted] = await db('todos').insert({ title: 'To Be Deleted', description: 'Desc' }).returning('id');
            const todoId = inserted.id;

            await TodoService.delete(todoId);

            const dbTodo = await db('todos').where({ id: todoId }).first();
            expect(dbTodo).toBeUndefined();
        });
    });
}); 