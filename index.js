const express = require("express");

const server = express();

//query params = ?teste=1
//Route Params = /user/1
//Request body = { "name": "Well", "email": "well@email.com"}

server.get("/user/:id", (req, res) => {
  const { id } = req.params;

  console.log("Requisição recebida");
  return res.json({ message: `Buscando o usuário ${id}` });
});

server.listen(3000);
