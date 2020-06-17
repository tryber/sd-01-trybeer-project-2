const app = require('./server');

const PORT = process.env.PORT || 3001;

app.factory().listen(PORT, () => {
  console.log(`Conectado na porta http://localhost:${PORT}`);
});
