const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const PASSWORD = 'senha123'; // Altere a senha aqui

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('redirect.json'));
  res.redirect(data.url);
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.post('/update', (req, res) => {
  const { password, new_url } = req.body;
  if (password !== PASSWORD) {
    return res.send('Senha incorreta.');
  }

  fs.writeFileSync('redirect.json', JSON.stringify({ url: new_url }));
  res.send('URL atualizada com sucesso! <a href="/admin">Voltar</a>');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
