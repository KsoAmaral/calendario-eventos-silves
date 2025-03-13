const Evento = require('../models/eventoModel');

exports.getAllEventos = (req, res) => {
  Evento.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.createEvento = (req, res) => {
  const novoEvento = req.body;
  Evento.create(novoEvento, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Evento criado com sucesso!' });
  });
};

exports.updateEvento = (req, res) => {
  const id = req.params.id;
  const evento = req.body;
  Evento.update(id, evento, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Evento atualizado com sucesso!' });
  });
};

exports.deleteEvento = (req, res) => {
  const id = req.params.id;
  Evento.delete(id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Evento excluído com sucesso!' });
  });
};
