import React, { useState } from 'react';
import EventoList from '../components/EventoList';
import api from '../services/api'; // Importe a API

const GerenciarEventos = () => {
  const [refresh, setRefresh] = useState(false);
  const [eventoEditando, setEventoEditando] = useState(null);

  const handleDelete = async (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este evento?');
    if (confirmacao) {
      try {
        await api.delete(`/eventos/${id}`);
        setRefresh(!refresh); // Atualiza a lista após exclusão
      } catch (err) {
        console.error('Erro ao excluir evento:', err);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <EventoList
        onEdit={(ev) => setEventoEditando(ev)} // Passa o evento para edição
        onDelete={handleDelete} // Passa a função de exclusão
        refresh={refresh} // Força a atualização da lista
        eventoEditando={eventoEditando} // Passa o evento sendo editado
        onEventSaved={() => {
          setRefresh(!refresh); // Atualiza a lista ao salvar
          setEventoEditando(null); // Limpa o evento sendo editado
        }}
      />
    </div>
  );
};

export default GerenciarEventos;