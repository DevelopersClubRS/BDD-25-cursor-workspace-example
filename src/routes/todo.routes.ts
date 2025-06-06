import { Router, Request, Response } from 'express';
import { TodoService, Todo } from '../services/todo.service';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const todo: Todo = req.body;
        const newTodo = await TodoService.create(todo);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo' });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const todos = await TodoService.findAll();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const todo = await TodoService.findById(id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todo' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const todo: Partial<Todo> = req.body;
        const updatedTodo = await TodoService.update(id, todo);
        if (updatedTodo) {
            res.json(updatedTodo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        await TodoService.delete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo' });
    }
});

export default router; 