import express, { Response } from 'express';
import { QueryUserModel } from './models/QueryUserModel';
import { CreateUserModel } from './models/CreateUserModel';
import { RequestWithBody, RequestWithBodyAndBody, RequestWithParams, RequestWithQuery } from './types';
import { UpdateUserModel } from './models/UpdateUserModel';
import { APIUserModel } from './models/APIUserModel';
import { URIParamsUserIdModel } from './models/URIParamsUserIdModel';
import { db, IUser } from './db/db';
import { HTTP_STATUSES } from './HTTP_Status/HTTP_Status';

export const app = express();

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);






const gerAPIUserModel = (dbUser: IUser): APIUserModel => ({
	id: dbUser.id,
	userName: dbUser.userName,
})
//GET---------------------
app.get('/', (req, res) => {
	//res.send({ message: 'Hello-- World!!!!!' });  send неявній код много делат сам под капотом
	//res.sendStatus(404)
	//res.json('Hello World')
	res.send('<h1>Hello-- World!!!!! </h1>');

});
//GET---------------------
app.get('/users', (
	req: RequestWithQuery<QueryUserModel>,
	res: Response<APIUserModel[]>) => {
	let foundUsers = db.users;
	if (req.query.userName) { foundUsers = foundUsers.filter(u => u.userName.indexOf(req.query.userName) > -1) }
	res.json(foundUsers.map(gerAPIUserModel));

});
//---------------------
app.get('/users/:id', (req: RequestWithParams<URIParamsUserIdModel>, res: Response<APIUserModel>) => {
	const foundUser = db.users.find(u => u.id === +req.params.id)
	if (!foundUser) {
		res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
		return;
	};
	res.json(gerAPIUserModel(foundUser));
});
//POST---------------------
app.post('/users', (req: RequestWithBody<CreateUserModel>, res: Response<APIUserModel>) => {
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
	res.status(HTTP_STATUSES.CREATED_201).json(gerAPIUserModel(newUser));
});
//DELETE---------------------
app.delete('/users/:id', (req: RequestWithParams<URIParamsUserIdModel>, res) => {
	if (!db.users.map(e => e.id).includes(+req.params.id)) {
		res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
		return;
	};
	db.users = db.users.filter(u => u.id !== +req.params.id)
	res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
//PUT---------------------
app.put('/users/:id', (req: RequestWithBodyAndBody<URIParamsUserIdModel, UpdateUserModel>, res) => {
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

//---------------------
app.get('/about', (req, res) => {
	res.send('Hello World-333!!');
});
//---------------------
app.post('/about', (req, res) => {
	res.send('New World started!!111');
});
//---------------------

//----------------- только для тестов
app.delete('/__test__/data', (req, res) => {
	db.users = [];
	res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

});

//-----------

