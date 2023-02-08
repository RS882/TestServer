
import express from 'express';
import { IDb } from '../db/db';
import { HTTP_STATUSES } from '../HTTP_Status/HTTP_Status';

export const getTestsRouter = (db: IDb) => {
	const testRouter = express.Router();

	//----------------- только для тестов
	testRouter.delete('/data', (req, res) => {
		db.users = [];
		res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

	});

	//-----------
	return testRouter;

};