const http = require('http');
const fs = require("fs");

let requestCounter = 0;
const PORT = 3010;


const delay = (ms) => new Promise((resolve, redject) => setTimeout(() => { resolve() }, ms));

const fileReader = (path) => new Promise((resolve, redject) => {
	fs.readFile(path, (error, data) => error ? redject(error) : resolve(data));
});

const server = http.createServer(async (request, response) => {


	switch (request.url) {
		case '/favicon.ico':

			try {
				const data = await fileReader('favicon.ico');
				response.end(data);
			} catch (err) {
				response.statusCode = 500;
				response.end("Resourse not found!");
			};
			// fs.readFile('favicon.ico', (error, data) => {
			// 	if (error) {
			// 		response.statusCode = 404;
			// 		response.end("Resourse not found!");
			// 	}
			// 	else {
			// 		response.end(data);
			// 	}
			// });

			return;
			break;
		case '/':
			try {
				const data = await fileReader('index.html');
				response.end(data);
			} catch (err) {
				response.statusCode = 500;
				response.end("Resourse not found!");
			}

			// const data = `request count: ${requestCounter}`
			break;
		case '/about':

			await delay(3000);
			response.end(`ABOUT PAGE`);
			break;
		default:
			response.end(`404 NOT FOUND`);
			break;
	}

	// requestCounter++;
	// response.end();

})

server.listen(PORT);


// fetch('http://localhost:3010/api/users', { method: 'GET' }); - ВСЕ ЗАПИСИ
// fetch('http://localhost:3010/api/users/576/books/123', { method: 'GET' });- URL PARAMETRS
// fetch('http://localhost:3010/api/books?year=2022&limit=100&sort=title', { method: 'GET' }); -QUERY (SORT) PARAMETRS
// fetch('http://localhost:3010/api/users', { method: 'POST', body:{ json объект} }); - + новый юзер

// C - POST
// R - GET
// U - PUT / PATH
// D - DELETE

fetch('http://localhost:3010/users?userName=Tom', { method: 'GET' })
	.then(res => res.json())
	.then(json => console.log(json))

fetch('http://localhost:3010/users', { method: 'POST', body: JSON.stringify({ userName: 'Ivan9' }), headers: { 'content-type': 'application/json' } })
	.then(res => res.json())
	.then(json => console.log(json))

fetch('http://localhost:3010/users/1', { method: 'DELETE' })
	.then(res => res.json())
	.then(json => console.log(json))

fetch('http://localhost:3010/users/1', { method: 'PUT', body: JSON.stringify({ userName: 'Ivan9' }), headers: { 'content-type': 'application/json' } })
	.then(res => res.json())
	.then(json => console.log(json))