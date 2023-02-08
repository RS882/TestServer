import request from "supertest"
import { app } from "../../src/app";
import { HTTP_STATUSES } from "../../src/HTTP_Status/HTTP_Status";

import { CreateUserModel } from './../../src/models/CreateUserModel';
import { UpdateUserModel } from './../../src/models/UpdateUserModel';


describe('/users', () => {

	beforeAll(async () => {
		await request(app).delete('/__test__/data')
	});
	const createUserfun = async (nameOfUser: string) => {
		const date: CreateUserModel = { userName: nameOfUser };
		return await request(app)
			.post('/users')
			.send(date)
			.expect(HTTP_STATUSES.CREATED_201);
	};

	it('should return 200 and emty array', async () => {
		await request(app)
			.get('/users')
			.expect(HTTP_STATUSES.OK_200, [])
		//expect(1).toBe(1)
	});
	it('should return 404 for not existing user', async () => {
		await request(app)
			.get('/users/8989')
			.expect(HTTP_STATUSES.NOT_FOUND_404)
	});
	it('should`nt user with intcorrect name', async () => {
		const date: CreateUserModel = { userName: '' };
		await request(app)
			.post('/users')
			.send(date)
			.expect(HTTP_STATUSES.BAD_REQUEST_400);
		await request(app)
			.get('/users')
			.expect(HTTP_STATUSES.OK_200, [])
	});
	it('should user with correct name', async () => {
		const TEST_USER_1 = 'TestUser1';
		const createUser1 = (await createUserfun(TEST_USER_1)).body;
		expect(createUser1).toEqual({
			id: expect.any(Number),
			userName: createUser1.userName,
		});
		await request(app)
			.get('/users')
			.expect(HTTP_STATUSES.OK_200, [createUser1])
		await request(app)
			.delete('/users/' + createUser1.id)
			.expect(HTTP_STATUSES.NO_CONTENT_204);
		await request(app)
			.get('/users')
			.expect(HTTP_STATUSES.OK_200, [])
	});
	it('should one more user', async () => {
		const TEST_USER_1 = 'TestUser1';
		const TEST_USER_2 = 'TestUser2';
		const createUser1 = (await createUserfun(TEST_USER_1)).body;
		const createUser2 = (await createUserfun(TEST_USER_2)).body;
		expect(createUser2).toEqual({
			id: expect.any(Number),
			userName: createUser2.userName,
		});
		await request(app)
			.get('/users')
			.expect(HTTP_STATUSES.OK_200, [createUser1, createUser2])
		await request(app)
			.delete('/users/' + createUser1.id)
			.expect(HTTP_STATUSES.NO_CONTENT_204);
		await request(app)
			.delete('/users/' + createUser2.id)
			.expect(HTTP_STATUSES.NO_CONTENT_204);
		await request(app)
			.get('/users')
			.expect(HTTP_STATUSES.OK_200, [])
	});
	it('should`nt user update incorrect name', async () => {
		const TEST_USER_1 = 'TestUser1';
		const date: UpdateUserModel = { userName: '' };
		const createUser1 = (await createUserfun(TEST_USER_1)).body;
		await request(app)
			.put('/users/' + createUser1.id)
			.send(date)
			.expect(HTTP_STATUSES.BAD_REQUEST_400);
		await request(app)
			.get('/users/' + createUser1.id)
			.expect(HTTP_STATUSES.OK_200, createUser1)
		await request(app)
			.delete('/users/' + createUser1.id)
			.expect(HTTP_STATUSES.NO_CONTENT_204);
		await request(app)
			.get('/users')
			.expect(HTTP_STATUSES.OK_200, [])
	});
	it('should`nt  user update with incorrect id', async () => {
		const TEST_USER_1 = 'TestUser1';
		const date: UpdateUserModel = { userName: TEST_USER_1 };
		await request(app)
			.put('/users/' + -4545645)
			.send(date)
			.expect(HTTP_STATUSES.NOT_FOUND_404);
	});
	it('should user update with correct id', async () => {
		const TEST_USER_1 = 'TestUser1';
		const TEST_USER_2 = 'TestUser2';
		const date: UpdateUserModel = { userName: TEST_USER_1 };
		const createUser1 = (await createUserfun(TEST_USER_1)).body;
		const createUser2 = (await createUserfun(TEST_USER_2)).body;
		await request(app)
			.put('/users/' + createUser1.id)
			.send(date)
			.expect(HTTP_STATUSES.NO_CONTENT_204);
		await request(app)
			.get('/users/' + createUser1.id)
			.expect(HTTP_STATUSES.OK_200,
				{ ...createUser1, userName: date.userName, });
		await request(app)
			.get('/users/' + createUser2.id)
			.expect(HTTP_STATUSES.OK_200, createUser2);
		await request(app)
			.delete('/users/' + createUser1.id)
			.expect(HTTP_STATUSES.NO_CONTENT_204);
		await request(app)
			.delete('/users/' + createUser2.id)
			.expect(HTTP_STATUSES.NO_CONTENT_204);
		await request(app)
			.get('/users')
			.expect(HTTP_STATUSES.OK_200, [])
	});
	it('should`nt  delete user  with incorrect id', async () => {
		await request(app)
			.delete('/users/' + -4545645)
			.expect(HTTP_STATUSES.NOT_FOUND_404);
	});
	it('should delect both users', async () => {
		const TEST_USER_1 = 'TestUser1';
		const TEST_USER_2 = 'TestUser2';
		const createUser1 = (await createUserfun(TEST_USER_1)).body;
		const createUser2 = (await createUserfun(TEST_USER_2)).body;
		await request(app)
			.delete('/users/' + createUser1.id)
			.expect(HTTP_STATUSES.NO_CONTENT_204);
		await request(app)
			.get('/users/' + createUser1.id)
			.expect(HTTP_STATUSES.NOT_FOUND_404,);
		await request(app)
			.delete('/users/' + createUser2.id)
			.expect(HTTP_STATUSES.NO_CONTENT_204);
		await request(app)
			.get('/users/' + createUser1.id)
			.expect(HTTP_STATUSES.NOT_FOUND_404,);
		await request(app)
			.get('/users')
			.expect(HTTP_STATUSES.OK_200, [])
	});

});