"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3010;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
;
;
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
};
const db = {
    users: [
        { id: 1, userName: 'Jhon Tom', },
        { id: 2, userName: 'Tom', },
        { id: 3, userName: 'Jerry Ivan', },
        { id: 4, userName: 'Maria', },
        { id: 5, userName: 'Peter Ivan', },
    ]
};
//GET---------------------
app.get('/', (req, res) => {
    //res.send({ message: 'Hello-- World!!!!!' });  send неявній код много делат сам под капотом
    //res.sendStatus(404)
    //res.json('Hello World')
    res.send('<h1>Hello-- World!!!!! </h1>');
});
//---------------------
app.get('/users', (req, res) => {
    let foundUsers = db.users;
    if (req.query.userName) {
        foundUsers = foundUsers.filter(u => u.userName.indexOf(req.query.userName) > -1);
    }
    res.json(foundUsers);
});
//---------------------
app.get('/users/:id', (req, res) => {
    const foundUser = db.users.find(u => u.id === +req.params.id);
    if (!foundUser) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
        return;
    }
    ;
    res.json(foundUser);
});
//POST---------------------
app.post('/users', (req, res) => {
    if (!req.body.userName || req.body.userName.split('').filter((e) => e !== ' ').length <= 0) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    ;
    const newUser = {
        id: +(new Date()),
        userName: req.body.userName,
    };
    db.users.push(newUser);
    res.status(HTTP_STATUSES.CREATED_201).json(newUser);
});
//DELETE---------------------
app.delete('/users/:id', (req, res) => {
    if (!db.users.map(e => e.id).includes(+req.params.id)) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    ;
    db.users = db.users.filter(u => u.id !== +req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
//PUT---------------------
app.put('/users/:id', (req, res) => {
    if (!req.body.userName || req.body.userName.split('').filter((e) => e !== ' ').length <= 0) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    ;
    const foundUser = db.users.find(u => u.id === +req.params.id);
    if (!foundUser) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    ;
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
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
