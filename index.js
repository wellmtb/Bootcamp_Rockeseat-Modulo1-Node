const express = require("express");

const server = express();
server.use(express.json());

//query params = ?teste=1
//Route Params = /user/1
//Request body = { "name": "Well", "email": "well@email.com"}

const usuarios = ["Gustavo", "Well", "Renan", "Keicy"];

server.use((req, res, next) => {
  console.time("request");
  console.log(`Método ${req.method}, URL: ${req.url}`);
  next();
  console.timeEnd("request");
});

//Midleware Global verificar se o usuário existe
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}
//Midleware Global verificar se o usuário existe dentro do array
function checkUserInArray(req, res, next) {
  const user = usuarios[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User name is required" });
  }
  req.user = user;
  return next();
}

//Rota Buscar todos os usuários
server.get("/users", (req, res) => {
  return res.json(usuarios);
});

//Rota Buscar usuario
server.get("/user/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

//Rota Adicionar um novo usuário
server.post("/user", checkUserExists, (req, res) => {
  const { name } = req.body;

  usuarios.push(name);
  return res.json(usuarios);
});

//Rota Alterar um usuário
server.put("/user/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  usuarios[index] = name;

  return res.json(usuarios);
});

//Deletar um usuário por Id
server.delete("/user/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  usuarios.splice(index, 1);

  return res.send();
});

server.listen(3000);
