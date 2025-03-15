import React, { useEffect, useState } from 'react';
import api from '../services/api';

const EventoList = ({ refresh, onDelete }) => {
  const [eventos, setEventos] = useState([]);
  const [filtroMes, setFiltroMes] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroComunidade, setFiltroComunidade] = useState('');
  const [eventoEditando, setEventoEditando] = useState(null);
  const [eventoEditado, setEventoEditado] = useState({});

  const fetchEventos = async () => {
    const res = await api.get('/eventos');
    setEventos(res.data);
  };

  useEffect(() => {
    fetchEventos();
  }, [refresh]);

  const filtrarEventos = () => {
    return eventos.filter(ev => {
      const mes = new Date(ev.data).getMonth();
      const filtroMesNumero = filtroMes ? parseInt(filtroMes) : null;
      const correspondeMes = filtroMes === '' || mes === filtroMesNumero;
      const correspondeTipo = filtroTipo === '' || ev.tipo_evento === filtroTipo;
      const correspondeComunidade =
        filtroComunidade === '' || (ev.comunidade_clube && ev.comunidade_clube.toLowerCase().includes(filtroComunidade.toLowerCase()));
      return correspondeMes && correspondeTipo && correspondeComunidade;
    });
  };

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const handleEditar = (evento) => {
    setEventoEditando(evento.id);
    setEventoEditado(evento);
  };

  const handleCancelarEdicao = () => {
    setEventoEditando(null);
    setEventoEditado({});
  };

  const handleSalvarEdicao = async () => {
    try {
      await api.put(`/eventos/${eventoEditado.id}`, eventoEditado);
      setEventoEditando(null);
      setEventoEditado({});
      fetchEventos();
    } catch (err) {
      console.error('Erro ao salvar evento:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventoEditado({ ...eventoEditado, [name]: value });
  };

  return (
    <div className="evento-list-container">
      <h2 className="evento-list-title">Lista de Eventos</h2>

      {/* Filtros */}
      <div className="evento-filtros">
        <div>
          <label>Mês</label>
          <select value={filtroMes} onChange={e => setFiltroMes(e.target.value)}>
            <option value="">Todos</option>
            {meses.map((m, idx) => <option key={idx} value={idx}>{m}</option>)}
          </select>
        </div>

        <div>
          <label>Tipo de Evento</label>
          <select value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}>
            <option value="">Todos</option>
            <option value="EVENTO">Evento</option>
            <option value="FERIADO NACIONAL">Feriado Nacional</option>
            <option value="FERIADO MUNICIPAL">Feriado Municipal</option>
            <option value="RELIGIOSO">Religioso</option>
            <option value="ESPORTIVO">Esportivo</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>

        <div>
          <label>Comunidade/Clube</label>
          <input
            type="text"
            value={filtroComunidade}
            onChange={e => setFiltroComunidade(e.target.value)}
            placeholder="Digite parte do nome"
          />
        </div>
      </div>

      {/* Tabela de eventos */}
      <table className="evento-table">
        <thead>
          <tr>
            <th style={{ width: '100px' }}>Data</th>
            <th style={{ width: '150px' }}>Título</th>
            <th style={{ width: '150px' }}>Comunidade</th>
            <th style={{ width: '120px' }}>Tipo</th>
            <th style={{ width: '200px' }}>Obs</th>
            <th style={{ width: '120px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrarEventos().map(ev => (
            <tr key={ev.id}>
              <td>
                {eventoEditando === ev.id ? (
                  <input
                    type="date"
                    name="data"
                    value={eventoEditado.data || ''}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  />
                ) : (
                  new Date(ev.data).toLocaleDateString()
                )}
              </td>
              <td>
                {eventoEditando === ev.id ? (
                  <input
                    type="text"
                    name="titulo"
                    value={eventoEditado.titulo || ''}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  />
                ) : (
                  ev.titulo
                )}
              </td>
              <td>
                {eventoEditando === ev.id ? (
                  <input
                    type="text"
                    name="comunidade_clube"
                    value={eventoEditado.comunidade_clube || ''}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  />
                ) : (
                  ev.comunidade_clube
                )}
              </td>
              <td>
                {eventoEditando === ev.id ? (
                  <select
                    name="tipo_evento"
                    value={eventoEditado.tipo_evento || 'EVENTO'}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  >
                    <option value="EVENTO">Evento</option>
                    <option value="FERIADO NACIONAL">Feriado Nacional</option>
                    <option value="FERIADO MUNICIPAL">Feriado Municipal</option>
                    <option value="RELIGIOSO">Religioso</option>
                    <option value="ESPORTIVO">Esportivo</option>
                    <option value="OUTRO">Outro</option>
                  </select>
                ) : (
                  ev.tipo_evento
                )}
              </td>
              <td>
                {eventoEditando === ev.id ? (
                  <input
                    type="text"
                    name="observacao"
                    value={eventoEditado.observacao || ''}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  />
                ) : (
                  ev.observacao
                )}
              </td>
              <td className="evento-actions">
                {eventoEditando === ev.id ? (
                  <>
                    <button onClick={handleSalvarEdicao} className="salvar">Salvar</button>
                    <button onClick={handleCancelarEdicao} className="cancelar">Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditar(ev)} className="editar">Editar</button>
                    <button onClick={() => onDelete(ev.id)} className="excluir">Excluir</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventoList;