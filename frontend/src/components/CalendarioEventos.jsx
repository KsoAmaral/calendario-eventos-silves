import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../services/api';

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
    return diaTemEvento ? 'bg-blue-100 text-blue-800 font-bold' : null;
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Calendário Visual de Eventos</h2>

      <Calendar
        onChange={handleDataChange}
        value={dataSelecionada}
        tileClassName={marcarDias}
      />

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">
          Eventos do dia {dataSelecionada.toLocaleDateString()}
        </h3>
        {eventosDoDia.length > 0 ? (
          <ul className="list-disc ml-6">
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