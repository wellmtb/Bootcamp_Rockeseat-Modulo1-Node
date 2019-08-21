const express = require("express");

const server = express();
server.use(express.json());

//query params = ?teste=1
//Route Params = /user/1
//Request body = { "name": "Well", "email": "well@email.com"}

const usuarios = ["Gustavo", "Well", "Renan", "Keicy"];

server.get("/users", (req, res) => {
  return res.json(usuarios);
});

server.get("/user/:index", (req, res) => {
  const { index } = req.params;

  console.log("Requisição recebida");
  return res.json(usuarios[index]);
});

server.post("/user", (req, res) => {
  const { name } = req.body;

  usuarios.push(name);
  return res.json(usuarios);
});

server.put("/user/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  usuarios[index] = name;

  return res.json(usuarios);
});

server.delete("/user/:index", (req, res) => {
  const { index } = req.params;

  usuarios.splice(index, 1);

  return res.send();
});

server.listen(3000);
