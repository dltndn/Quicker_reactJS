import express, { Request, Response, NextFunction } from 'express';

const app = express();

const port = '3100'

console.log("test")

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('main!');
});

app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
    res.send('welcome!');
});

app.listen(port, () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: ${port}
  ################################################
`);
});