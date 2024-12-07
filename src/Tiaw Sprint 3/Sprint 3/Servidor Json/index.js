const express = require('express');
const cors = require('cors');
const app = express();

// Permitir CORS
app.use(cors());

// Importar os dados do arquivo JSON
const camisas = require('./camisas.json');
const contato = require('./contato.json');
const carrinhoDeCompra = require('./carrinho-de-compra.json');
const cadastroVendedor = require('./cadastro-vendedor.json');
const perfilDoUsuario = require('./perfil-do-usuario.json');

// Rota para enviar os dados
app.get('/camisas', (req, res) => {
    res.json(camisas); // Envia o conteúdo do arquivo JSON
});

app.get('/contato', (req, res) => {
    res.json(contato); // Envia o conteúdo do arquivo JSON
});

app.get('/carrinho-de-compra', (req, res) => {
    res.json(carrinhoDeCompra); // Envia o conteúdo do arquivo JSON
});

app.get('/cadastro-vendedor', (req, res) => {
    res.json(cadastroVendedor); // Envia o conteúdo do arquivo JSON
});

app.get('/perfil-do-usuario', (req, res) => {
    res.json(perfilDoUsuario); // Envia o conteúdo do arquivo JSON
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));                           