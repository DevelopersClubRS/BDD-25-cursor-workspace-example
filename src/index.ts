import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', apiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default server; 