export interface IUser {
	id: number;
	userName: string;
	orderCount: number;
};
export interface IDb {
	users: IUser[];
};

export const db: IDb = {
	users: [
		{ id: 1, userName: 'Jhon Tom', orderCount: 5, },
		{ id: 2, userName: 'Tom', orderCount: 15, },
		{ id: 3, userName: 'Jerry Ivan', orderCount: 6, },
		{ id: 4, userName: 'Maria', orderCount: 58, },
		{ id: 5, userName: 'Peter Ivan', orderCount: 2, },]
};