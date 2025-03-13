import React, { useState } from 'react';
import EventoForm from '../components/EventoForm';
import EventoList from '../components/EventoList';

const GerenciarEventos = () => {
  const [refresh, setRefresh] = useState(false);
  const [eventoEditando, setEventoEditando] = useState(null);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <EventoForm
        onEventSaved={() => setRefresh(!refresh)}
        eventoEditando={eventoEditando}
        limparEdicao={() => setEventoEditando(null)}
      />
      <EventoList
        onEdit={(ev) => setEventoEditando(ev)}
        onDelete={() => setRefresh(!refresh)}
        refresh={refresh}
      />
    </div>
  );
};

export default GerenciarEventos;
