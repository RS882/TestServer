import express from 'express';


export const getOtherRoutes = () => {

	const otherRouter = express.Router()
	//GET---------------------
	otherRouter.get('/', (req, res) => {
		//res.send({ message: 'Hello-- World!!!!!' });  send неявній код много делат сам под капотом
		//res.sendStatus(404)
		//res.json('Hello World')
		res.send('<h1>Hello-- World!!!!! </h1>');

	});


	//---------------------
	otherRouter.get('/about', (req, res) => {
		res.send('Hello World-333!!');
	});
	//---------------------
	otherRouter.post('/about', (req, res) => {
		res.send('New World started!!111');
	});
	//---------------------
	return otherRouter;
};