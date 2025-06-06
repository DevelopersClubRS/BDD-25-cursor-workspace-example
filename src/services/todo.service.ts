import db from '../db';

export interface Todo {
    id?: number;
    title: string;
    description: string;
    completed: boolean;
}

export class TodoService {
    private static readonly TABLE_NAME = 'todos';

    public static async create(todo: Todo): Promise<Todo> {
        const [newTodo] = await db(this.TABLE_NAME).insert(todo).returning('*');
        return newTodo;
    }

    public static async findAll(): Promise<Todo[]> {
        return db(this.TABLE_NAME).select('*');
    }

    public static async findById(id: number): Promise<Todo | undefined> {
        return db(this.TABLE_NAME).where({ id }).first();
    }

    public static async update(id: number, todo: Partial<Todo>): Promise<Todo | undefined> {
        const [updatedTodo] = await db(this.TABLE_NAME)
            .where({ id })
            .update(todo)
            .returning('*');
        return updatedTodo;
    }

    public static async delete(id: number): Promise<void> {
        await db(this.TABLE_NAME).where({ id }).del();
    }
} 