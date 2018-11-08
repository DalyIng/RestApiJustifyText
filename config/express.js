import express from 'express';
import bodyParser from 'body-parser';
import routes from '../server/routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.text({ type: text/plain }));
//app.get('/', (req, res) => res.send('Hello, this is API and I\'m ok!'));
app.use('/api', routes);

export default app;