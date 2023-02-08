import express from 'express';
import { db } from './db/db';
import { getUsersRouter } from './Routes/users';
import { getTestsRouter } from './Routes/testsRoutes';
import { getOtherRouter } from './Routes/othersRoutes';

export const app = express();

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);


app.use('/users', getUsersRouter(db));
app.use('/__test__', getTestsRouter(db));
app.use('/', getOtherRouter());




