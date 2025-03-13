const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '11235813', // atualize conforme sua senha
  database: 'evento_silves'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao MySQL!');
});
module.exports = connection;
