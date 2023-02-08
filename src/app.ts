import express from 'express';
import { db } from './db/db';
import { getUsersRoutes } from './Routes/users';
import { getTestsRoutes } from './Routes/testsRoutes';
import { getOtherRoutes } from './Routes/othersRoutes';

export const app = express();

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

const userRuoter = getUsersRoutes(db);
app.use('/users', userRuoter);

const testRouter = getTestsRoutes(db);
app.use('/__test__/data', testRouter);

const otherRouter = getOtherRoutes();
app.use('/', otherRouter);




