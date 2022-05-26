const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "bateponto"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



app.get('/', function (req, res) {
  res.send('Hello World3')
})

app.get('/usuarios', function (req, res) {
  con.query('select * from usuarios ', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.send(results)
  });
})
app.get('/folhas', function (req, res) {
  con.query('select * from folhas ', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.send(results)
  });
})
app.get('/pontos', function (req, res) {
  con.query('select * from pontos ', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.send(results)
  });
})
app.get('/criapontos', function (req, res) {
  var entrada1=req.query.entrada1
  var entrada2=req.query.entrada2
  var saida1=req.query.saida1
  var saida2=req.query.saida2
  var data=req.query.data
  var idFolha=req.query.idFolha
  var id=req.query.id
  con.query(`INSERT INTO bateponto.pontos (entrada1, saida1, entrada2, saida2, data, idFolha, id)
  VALUES('${entrada1}', '${saida1}', '${entrada2}', '${saida2}', '${data}', '${idFolha}', '${id}');`, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.send(results)
  });
})
app.get('/atualizapontos', function (req, res) {
  var entrada1=req.query.entrada1
  var entrada2=req.query.entrada2
  var saida1=req.query.saida1
  var saida2=req.query.saida2
  var data=req.query.data
  var idFolha=req.query.idFolha
  var id=req.query.id
  con.query(`UPDATE bateponto.pontos
  SET entrada1='${entrada1}', saida1='${saida1}', entrada2='${entrada2}', saida2='${saida2}', data='${data}', idFolha='${idFolha}' where id="${id}"; `, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.send(results)
  });
})
app.get('/apagar/:id', function (req, res) {
  console.log(req.params)
  id = req.params.id
  con.query(`delete from usuarios where id="${id}"`, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.send(results)
  });
})
app.get('/criarUsuario/:login/:senha/:id/:nome/:idFolha', function (req, res) {
  console.log(req.params)
  id = req.params.id
  senha = req.params.senha
  login = req.params.login
  con.query(`INSERT INTO bateponto.usuarios (login, senha, id, adm) VALUES('${login}', '${senha}', '${id}',0);`, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    nome = req.params.nome
    idFolha = req.params.idFolha
    con.query(`INSERT INTO bateponto.folhas (nome, cpf, idUsuario, id) VALUES('${nome}', '${senha}', '${id}', '${idFolha}');`, function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      res.send(results)
    });
  });



})

app.get('/teste', function (req, res) {
  console.log(req.query)
  id = req.query.id
  senha = req.query.senha
  login = req.query.login
  con.query(`INSERT INTO bateponto.usuarios (login, senha, id) VALUES('${login}', '${senha}', '${id}');`, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    nome = req.query.nome
    idFolha = req.query.idFolha
    con.query(`INSERT INTO bateponto.folhas (nome, cpf, idUsuario, id) VALUES('${nome}', '${senha}', '${id}', '${idFolha}');`, function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      // res.send(results)
      res.redirect(`http://127.0.0.1:5500/usuarios.html`)
    });
  });
})

app.get('/editarHoras/:id/:entrada1/:saida1/:entrada2/:saida2', function (req, res) {
  console.log(req.params)
  id = req.params.id
  entrada1 = req.params.entrada1
  saida1 = req.params.saida1
  entrada2 = req.params.entrada2
  saida2 = req.params.saida2
  con.query(`UPDATE bateponto.pontos SET entrada1='${entrada1}', saida1='${saida1}', entrada2='${entrada2}', saida2='${saida2}' where id= '${id}'`, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.send(results)
  });
})


app.listen(3000)