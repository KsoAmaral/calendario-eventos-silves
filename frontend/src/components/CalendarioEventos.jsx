import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../services/api';
import './CalendarioEventos.css'; // Importe o arquivo CSS

const CalendarioEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [eventosDoDia, setEventosDoDia] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      const res = await api.get('/eventos');
      setEventos(res.data);
    };
    fetchEventos();
  }, []);

  const handleDataChange = (date) => {
    setDataSelecionada(date);

    const eventosFiltrados = eventos.filter(ev => {
      const dataEv = new Date(ev.data);
      return (
        dataEv.getDate() === date.getDate() &&
        dataEv.getMonth() === date.getMonth() &&
        dataEv.getFullYear() === date.getFullYear()
      );
    });

    setEventosDoDia(eventosFiltrados);
  };

  // Marcar datas com eventos
  const marcarDias = ({ date }) => {
    const diaTemEvento = eventos.some(ev => {
      const dataEv = new Date(ev.data);
      return (
        dataEv.getDate() === date.getDate() &&
        dataEv.getMonth() === date.getMonth() &&
        dataEv.getFullYear() === date.getFullYear()
      );
    });
    return diaTemEvento ? 'react-calendar__tile--hasEvent' : null;
  };

  return (
    <div className="calendario-container">
      <h2 className="calendario-title">Calendário Visual de Eventos</h2>

      <Calendar
        onChange={handleDataChange}
        value={dataSelecionada}
        tileClassName={marcarDias}
      />

      <div className="eventos-do-dia">
        <h3>Eventos do dia {dataSelecionada.toLocaleDateString()}</h3>
        {eventosDoDia.length > 0 ? (
          <ul>
            {eventosDoDia.map(ev => (
              <li key={ev.id}>
                <strong>{ev.titulo}</strong> – {ev.tipo_evento} ({ev.comunidade_clube || 'N/A'})
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum evento nesta data.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarioEventos;