import express from 'express';
import 'express-async-errors';
import globalError from './helpers/GlobalErrors';
import carRouter from './routes/cars.routes';

const app = express();
app.use(express.json());
app.use('/cars', carRouter);

app.use(globalError);
export default app;
