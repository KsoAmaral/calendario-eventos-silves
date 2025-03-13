import React, { useEffect, useState } from 'react';
import api from '../services/api';

const EventoList = ({ onEdit, refresh, onDelete }) => {
  const [eventos, setEventos] = useState([]);
  const [filtroMes, setFiltroMes] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroComunidade, setFiltroComunidade] = useState('');

  const fetchEventos = async () => {
    const res = await api.get('/eventos');
    setEventos(res.data);
  };

  useEffect(() => {
    fetchEventos();
  }, [refresh]);

  const filtrarEventos = () => {
    return eventos.filter(ev => {
      const mes = new Date(ev.data).getMonth(); // 0=Janeiro, 1=Fevereiro...
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

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Lista de Eventos</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex flex-col">
          <label>Mês</label>
          <select className="border p-2 rounded" value={filtroMes} onChange={e => setFiltroMes(e.target.value)}>
            <option value="">Todos</option>
            {meses.map((m, idx) => <option key={idx} value={idx}>{m}</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <label>Tipo de Evento</label>
          <select className="border p-2 rounded" value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}>
            <option value="">Todos</option>
            <option value="EVENTO">Evento</option>
            <option value="FERIADO NACIONAL">Feriado Nacional</option>
            <option value="FERIADO MUNICIPAL">Feriado Municipal</option>
            <option value="RELIGIOSO">Religioso</option>
            <option value="ESPORTIVO">Esportivo</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label>Comunidade/Clube</label>
          <input type="text" className="border p-2 rounded" value={filtroComunidade} onChange={e => setFiltroComunidade(e.target.value)} placeholder="Digite parte do nome" />
        </div>
      </div>

      <table className="w-full border border-gray-300 rounded table-auto">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Data</th>
            <th className="p-2 border">Título</th>
            <th className="p-2 border">Comunidade</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Obs</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrarEventos().map(ev => (
            <tr key={ev.id} className="hover:bg-gray-50">
              <td className="p-2 border">{new Date(ev.data).toLocaleDateString()}</td>
              <td className="p-2 border">{ev.titulo}</td>
              <td className="p-2 border">{ev.comunidade_clube}</td>
              <td className="p-2 border">{ev.tipo_evento}</td>
              <td className="p-2 border">{ev.observacao}</td>
              <td className="p-2 border">
                <button onClick={() => onEdit(ev)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600">Editar</button>
                <button onClick={() => handleDelete(ev.id)} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventoList;
