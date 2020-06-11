// controllers/user.service.js

const config = require('../config.json');
const jwt = require('jsonwebtoken');

// hardcoded simplistic user
const users = [{
	id: 1,
	username: 'tester',
	password: 'testing',
	firstName: 'Steph',
	lastName: 'Marby'
}];

async function authenticate({ username, password }) {
	const user = users.find(u => u.username === username && u.password === password);

	if (!user) throw 'Username or password is incorrect';

	const token = jwt.sign({ sub: user.id }, config.secret);
	return {
		...omitPassword(user),
		token
	};
}

async function getAll() {
    return users.map(u => omitPassword(u));
}

// helper functions =========================

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

module.exports = { authenticate, getAll };