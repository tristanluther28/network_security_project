const mysql = require('mysql2/promise');

let connection;

exports.init = async () => {
	const connectionConfig = {
		port: 3306,
		host: 'alm-db.cpif5gmpkbjh.us-east-1.rds.amazonaws.com',
		database: 'fingerprint',
		user: 'testuser',
		password: 'DGjuKv6PE8yEpg62',
	};
	
	connection = await mysql.createConnection(connectionConfig);
	console.log(`RDS connected as id: ${connection.threadId}`);
};

exports.end = async() => {
	await connection.end();
};

exports.query = async(query, values = []) => {
	try{
		const res = await connection.query(query, values);
		console.log(`[${query.substring(0, 30)} ...] - SUCCESS rds.query`);
		return res[0];
	}catch(e){
		console.log(e);
		console.log(`[${query.substring(0, 30)} ...] - FAIL rds.query`);
		throw e;
	}
};