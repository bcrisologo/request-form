// controllers/user.service.js

var config = require('config.json');
var jwt = require('jsonwebtoken');

// hardcoded user for simplicity
const users = [{
	id: 1,
	username: 'test', 
	password: 'test', 
	firstName: 'Test', 
	lastName: 'User' 
}];

async function authenticate({ username, password}) {
	const user = users.find(u => u.username === username && u.password === password);

	if (!user) throw 'Username or passowrd is incorrect';

	const token = jwt.sign({ sub: user.id }, config.secret);
	return {
		...omitPassword(user),
		token
	};
}

async function getAll() {
	return users.map(u => omitPassword(u));
}

// helper functions

function omitPassword(user) {
	const { password, ...userWithoutPassword } = user;
	return userWithoutPassword;
}

module.exports = { authenticate, getAll };
