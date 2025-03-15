import React, { useEffect, useState } from 'react';
import api from '../services/api';

const EventoForm = ({ onEventSaved, eventoEditando, limparEdicao }) => {
  const [evento, setEvento] = useState({
    data: '',
    titulo: '',
    comunidade_clube: '',
    observacao: '',
    tipo_evento: 'EVENTO'
  });

  useEffect(() => {
    if (eventoEditando) {
      setEvento(eventoEditando);
    }
  }, [eventoEditando]);

  const handleChange = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (evento.id) {
        await api.put(`/eventos/${evento.id}`, evento);
      } else {
        await api.post('/eventos', evento);
      }

      onEventSaved();
      setEvento({ data: '', titulo: '', comunidade_clube: '', observacao: '', tipo_evento: 'EVENTO' });
      limparEdicao();
    } catch (err) {
      console.error('Erro ao salvar evento:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="evento-form">
      <h2>{evento.id ? 'Editar Evento' : 'Cadastrar Evento'}</h2>

      {/* Campo: Data */}
      <div>
        <label>Data</label>
        <input
          type="date"
          name="data"
          value={evento.data}
          onChange={handleChange}
          required
        />
      </div>

      {/* Campo: Título */}
      <div>
        <label>Título</label>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={evento.titulo}
          onChange={handleChange}
          required
        />
      </div>

      {/* Campo: Comunidade/Clube */}
      <div>
        <label>Comunidade/Clube</label>
        <input
          type="text"
          name="comunidade_clube"
          placeholder="Comunidade/Clube"
          value={evento.comunidade_clube}
          onChange={handleChange}
        />
      </div>

      {/* Campo: Observação */}
      <div>
        <label>Observação</label>
        <textarea
          name="observacao"
          placeholder="Observação"
          value={evento.observacao}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Campo: Tipo de Evento */}
      <div>
        <label>Tipo de Evento</label>
        <select
          name="tipo_evento"
          value={evento.tipo_evento}
          onChange={handleChange}
        >
          <option value="EVENTO">Evento</option>
          <option value="FERIADO NACIONAL">Feriado Nacional</option>
          <option value="FERIADO MUNICIPAL">Feriado Municipal</option>
          <option value="RELIGIOSO">Religioso</option>
          <option value="ESPORTIVO">Esportivo</option>
          <option value="OUTRO">Outro</option>
        </select>
      </div>

      {/* Botão: Salvar */}
      <button type="submit">
        {evento.id ? 'Salvar Alterações' : 'Salvar'}
      </button>

      {/* Botão: Cancelar (se estiver editando) */}
      {evento.id && (
        <button
          type="button"
          onClick={() => {
            setEvento({ data: '', titulo: '', comunidade_clube: '', observacao: '', tipo_evento: 'EVENTO' });
            limparEdicao();
          }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
};

export default EventoForm;