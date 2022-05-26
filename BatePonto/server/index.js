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





app.listen(3000)