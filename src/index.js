import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { index, validate } from './controller';

const port = process.env.PORT || 2500;
const app = express();

app.use(bodyParser.json());
app.use(cors());
morgan('tiny');

app.get('/', index);
app.post('/validate-rule', validate);

app.listen(port, () => {
  console.log(`Express server is running on port: ${port}`);
});
