const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const postgres = require('postgres') 

const sql = postgres('postgres://postgres:123456@localhost:5432/bateponto')


// var mysql = require('mysql');
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "12345678",
//   database: "bateponto"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });



app.get('/', async function (req, res) {
  res.send('Hello World3')
})

app.get('/usuarios', async function (req, res) {
  const results = await sql`select * from usuarios `;
  res.send(results)
})

app.get('/folhas', async function (req, res) {
  results = await sql`select * from folhas`
    res.send(results)
})

app.get('/pontos', async function (req, res) {
  results = await sql`select * from pontos `
    res.send(results)
})

app.get('/criapontos', async function (req, res) {
  var entrada1=req.query.entrada1
  var entrada2=req.query.entrada2
  var saida1=req.query.saida1
  var saida2=req.query.saida2
  var data=req.query.data
  var idFolha=req.query.idFolha
  var id=req.query.id
  var horasTrabalhadas=req.query.horasTrabalhadas
  results = await sql`INSERT INTO pontos (entrada1, saida1, entrada2, saida2, data, "idFolha", id, "horasTrabalhadas")
  VALUES(${entrada1}, ${saida1}, ${entrada2}, ${saida2}, ${data}, ${idFolha}, ${id}, ${horasTrabalhadas});`
    res.send(results)
})

app.get('/atualizapontos', async function (req, res) {
  var entrada1=req.query.entrada1
  var entrada2=req.query.entrada2
  var saida1=req.query.saida1
  var saida2=req.query.saida2
  var data=req.query.data
  var idFolha=req.query.idFolha
  var id=req.query.id
  var horasTrabalhadas=req.query.horasTrabalhadas
  results = await sql`UPDATE pontos
  SET entrada1=${entrada1}, saida1=${saida1}, entrada2=${entrada2}, saida2=${saida2}, data=${data}, "idFolha"=${idFolha}, "horasTrabalhadas"=${horasTrabalhadas} where id=${id}; `
    res.send(results)
})

app.get('/apagar/:id', async function (req, res) {
  console.log(req.params)
  id = req.params.id
  results = await sql`delete from usuarios where id=${id}`
    res.send(results)
})

app.get('/criarUsuario/:login/:senha/:id/:nome/:idFolha', async function (req, res) {
  console.log(req.params)
  id = req.params.id
  senha = req.params.senha
  login = req.params.login
  results = await sql`INSERT INTO usuarios (login, senha, id, adm) VALUES(${login}, ${senha}, ${id}, 0);`
    nome = req.params.nome
    idFolha = req.params.idFolha
    console.log(`INSERT INTO folhas (nome, cpf, "idUsuario", id) VALUES(${nome}, ${senha}, ${id}, ${idFolha});`)
    results = await sql`INSERT INTO folhas (nome, cpf, "idUsuario", id) VALUES(${nome}, ${senha}, ${id}, ${idFolha});`
      res.send(results)
})

app.get('/teste', async function (req, res) {
  console.log(req.query)
  id = req.query.id
  senha = req.query.senha
  login = req.query.login
  results = await sql`INSERT INTO usuarios (login, senha, id) VALUES(${login}, ${senha}, ${id});`
    nome = req.query.nome
    idFolha = req.query.idFolha
    results = await sql`INSERT INTO folhas (nome, cpf, "idUsuario", id) VALUES(${nome}, ${senha}, ${id}, ${idFolha});`
      // res.send(results)
      res.redirect(`http://127.0.0.1:5500/usuarios.html`)
})

app.get('/editarHoras/:id/:entrada1/:saida1/:entrada2/:saida2/:horasTrabalhadas', async function (req, res) {
  console.log(req.params)
  id = req.params.id
  entrada1 = req.params.entrada1
  saida1 = req.params.saida1
  entrada2 = req.params.entrada2
  saida2 = req.params.saida2
  horasTrabalhadas = req.params.horasTrabalhadas
  results = await sql`UPDATE pontos SET entrada1=${entrada1}, saida1=${saida1}, entrada2=${entrada2}, saida2=${saida2}, "horasTrabalhadas"=${horasTrabalhadas} where id= ${id}`
    res.send(results)
})


app.listen(3000)