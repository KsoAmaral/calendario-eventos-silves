import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Home = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      const res = await api.get('/eventos');
      setEventos(res.data);
    };
    fetchEventos();
  }, []);

  const eventosPorMes = () => {
    const grupos = {};
    eventos.forEach(ev => {
      const mes = new Date(ev.data).toLocaleString('pt-BR', { month: 'long' });
      if (!grupos[mes]) grupos[mes] = [];
      grupos[mes].push(ev);
    });
    return grupos;
  };

  const mesesOrganizados = Object.entries(eventosPorMes()).sort((a, b) =>
    new Date(`01 ${a[0]} 2023`) - new Date(`01 ${b[0]} 2023`)
  );

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Calendário de Eventos</h1>
      {mesesOrganizados.map(([mes, eventosMes]) => (
        <div key={mes} className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2 capitalize">{mes}</h2>
          <ul className="list-disc ml-6">
            {eventosMes.map(ev => (
              <li key={ev.id}>
                <strong>{new Date(ev.data).toLocaleDateString()}</strong> – {ev.titulo}{ev.comunidade_clube ? ` (${ev.comunidade_clube})` : ''}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Home;
