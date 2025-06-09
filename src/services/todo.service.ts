import db from '../db';

export interface Todo {
    id?: number;
    title: string;
    description: string;
    completed: boolean;
}

const mapToTodo = (data: any): Todo => {
    return {
        ...data,
        completed: !!data.completed,
    };
};

export class TodoService {
    private static readonly TABLE_NAME = 'todos';

    public static async create(todo: Todo): Promise<Todo> {
        const [newTodo] = await db(this.TABLE_NAME).insert(todo).returning('*');
        return mapToTodo(newTodo);
    }

    public static async findAll(): Promise<Todo[]> {
        const todos = await db(this.TABLE_NAME).select('*');
        return todos.map(mapToTodo);
    }

    public static async findById(id: number): Promise<Todo | undefined> {
        const todo = await db(this.TABLE_NAME).where({ id }).first();
        return todo ? mapToTodo(todo) : undefined;
    }

    public static async update(id: number, todo: Partial<Todo>): Promise<Todo | undefined> {
        const [updatedTodo] = await db(this.TABLE_NAME)
            .where({ id })
            .update(todo)
            .returning('*');
        return updatedTodo ? mapToTodo(updatedTodo) : undefined;
    }

    public static async delete(id: number): Promise<void> {
        await db(this.TABLE_NAME).where({ id }).del();
    }
} 