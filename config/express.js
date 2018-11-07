import express from 'express';
import routes from '../server/routes';

const app = express();

//app.get('/', (req, res) => res.send('Hello, this is API and I\'m ok!'));
app.use('/api', routes);

export default app;