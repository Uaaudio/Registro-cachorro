// server.js
const express = require('express');
const bodyParser = require('body-parser');
const Cachorro = require('./models/cachorro');
const sequelize = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Rota inicial
app.get('/', (req, res) => {
  res.render(__dirname + '/views/index.html');
});

// Rota para cadastrar cachorro
app.post('/cachorros', async (req, res) => {
  if (!req.body.nome || !req.body.raca || !req.body.idade || !req.body.peso) {
    return res.send("Nome, raça, idade e peso são obrigatórios.");
  }
  await Cachorro.create({
    nome: req.body.nome,
    raca: req.body.raca,
    idade: req.body.idade,
    peso: req.body.peso
  });
  res.redirect('/');
});

// Rota para listar todos os cachorros
app.get('/cachorros', async (req, res) => {
  const cachorros = await Cachorro.findAll();
  res.json(cachorros);
});

// Rota para deletar cachorro por ID
app.get('/cachorros/delete', async (req, res) => {
  const id = req.query.id;
  await Cachorro.destroy({ where: { id } });
  res.redirect('/');
});

// Rota para deletar cachorro por nome
app.get('/cachorros/delete/nome', async (req, res) => {
  const nome = req.query.nome;
  await Cachorro.destroy({ where: { nome } });
  res.redirect('/');
});

// Sincroniza com banco e inicia o servidor
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
  });
});

