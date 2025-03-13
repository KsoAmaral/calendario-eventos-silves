const db = require('../db');

const Evento = {
  getAll: (callback) => {
    db.query('SELECT * FROM eventos ORDER BY data', callback);
  },
  create: (evento, callback) => {
    const sql = 'INSERT INTO eventos (data, titulo, comunidade_clube, observacao, tipo_evento) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [evento.data, evento.titulo, evento.comunidade_clube, evento.observacao, evento.tipo_evento], callback);
  },
  update: (id, evento, callback) => {
    const sql = 'UPDATE eventos SET data=?, titulo=?, comunidade_clube=?, observacao=?, tipo_evento=? WHERE id=?';
    db.query(sql, [evento.data, evento.titulo, evento.comunidade_clube, evento.observacao, evento.tipo_evento, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM eventos WHERE id=?', [id], callback);
  }
};

module.exports = Evento;
