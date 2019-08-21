const express = require("express");

const server = express();

//query params = ?teste=1
//Route Params = /user/1
//Request body = { "name": "Well", "email": "well@email.com"}

const usuarios = ["Gustavo", "Well", "Renan", "Keicy"];
server.get("/user/:index", (req, res) => {
  const { index } = req.params;

  console.log("Requisição recebida");
  return res.json(usuarios[index]);
});

server.listen(3000);
