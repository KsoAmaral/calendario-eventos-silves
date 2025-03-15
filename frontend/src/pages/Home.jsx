import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../components//CalendarioEventos.css'; // Importe o arquivo CSS

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
    <div className="home-container">
      <h1 className="home-title">Calendário de Eventos</h1>
      {mesesOrganizados.map(([mes, eventosMes]) => (
        <div key={mes} className="mes-container">
          <h2 className="mes-title">{mes}</h2>
          <ul className="eventos-list">
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