import React from 'react';
import EventoForm from '../components/EventoForm';

const CadastrarEvento = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <EventoForm onEventSaved={() => alert('Evento cadastrado com sucesso!')} eventoEditando={null} limparEdicao={() => {}} />
    </div>
  );
};

export default CadastrarEvento;
