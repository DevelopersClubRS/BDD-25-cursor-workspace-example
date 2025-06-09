import { Request, Response, NextFunction } from 'express';

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction): void => {
    const userApiKey = req.get('X-API-KEY');
    const appApiKey = process.env.API_KEY;

    if (!userApiKey || userApiKey !== appApiKey) {
        res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
        return;
    }

    next();
}; 