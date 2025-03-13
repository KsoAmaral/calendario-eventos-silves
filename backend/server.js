const express = require('express');
const cors = require('cors');
const app = express();
const eventoRoutes = require('./routes/eventoRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/eventos', eventoRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
