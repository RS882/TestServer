import express, { Response } from 'express';
import { IDb, IUser } from '../db/db';
import { HTTP_STATUSES } from '../HTTP_Status/HTTP_Status';
import { CreateUserModel } from '../models/CreateUserModel';
import { QueryUserModel } from '../models/QueryUserModel';
import { UpdateUserModel } from '../models/UpdateUserModel';
import { URIParamsUserIdModel } from '../models/URIParamsUserIdModel';
import { RequestWithBody, RequestWithBodyAndBody, RequestWithParams, RequestWithQuery } from '../types';
import { APIUserModel } from './../models/APIUserModel';


const getAPIUserModel = (dbUser: IUser): APIUserModel => ({
	id: dbUser.id,
	userName: dbUser.userName,
});


export const getUsersRouter = (db: IDb) => {

	const usersRouter = express.Router();

	//GET---------------------
	usersRouter.get('/', (
		req: RequestWithQuery<QueryUserModel>,
		res: Response<APIUserModel[]>) => {
		let foundUsers = db.users;
		if (req.query.userName) { foundUsers = foundUsers.filter(u => u.userName.indexOf(req.query.userName) > -1) }
		res.json(foundUsers.map(getAPIUserModel));

	});
	//POST---------------------
	usersRouter.post('/', (req: RequestWithBody<CreateUserModel>, res: Response<APIUserModel>) => {
		if (!req.body.userName || req.body.userName!.split('').filter((e) => e !== ' ').length <= 0) {
			res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
			return;
		};
		const newUser: IUser = {
			id: +(new Date()),
			userName: req.body.userName,
			orderCount: 0,
		};
		db.users.push(newUser);
		res.status(HTTP_STATUSES.CREATED_201).json(getAPIUserModel(newUser));
	});
	//GET---------------------
	usersRouter.get('/:id([0-9]+)', (req: RequestWithParams<URIParamsUserIdModel>, res: Response<APIUserModel>) => {
		const foundUser = db.users.find(u => u.id === +req.params.id)
		if (!foundUser) {
			res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
			return;
		};
		res.json(getAPIUserModel(foundUser));
	});
	//DELETE---------------------
	usersRouter.delete('/:id([0-9]+)', (req: RequestWithParams<URIParamsUserIdModel>, res) => {
		if (!db.users.map(e => e.id).includes(+req.params.id)) {
			res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
			return;
		};
		db.users = db.users.filter(u => u.id !== +req.params.id)
		res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
	});
	//PUT---------------------
	usersRouter.put('/:id([0-9]+)', (req: RequestWithBodyAndBody<URIParamsUserIdModel, UpdateUserModel>, res) => {
		if (!req.body.userName || req.body.userName!.split('').filter((e) => e !== ' ').length <= 0) {
			res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
			return;
		};
		const foundUser = db.users.find(u => u.id === +req.params.id)
		if (!foundUser) {
			res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
			return;
		};
		foundUser.userName = req.body.userName;
		res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
	});

	return usersRouter;

};