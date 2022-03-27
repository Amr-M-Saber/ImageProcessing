import express, { Request, Response, Application } from 'express';
import routes from './routes';
const app: Application = express();
const port = 3000;

console.log(Number(-1));

app.use('/', routes);

// Welcome Message
app.get('/', (req: Request, res: Response): void => {
    res.send('Welcome to Image Processing API');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

export default app;
