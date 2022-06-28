logado = localStorage.logado
adm = localStorage.adm
if(adm=="1"){
document.getElementById("adm").style.display= "inline"
document.getElementById("historico").style.display="none"
document.getElementById("ponto").style.display="none"
}
console.log(adm)
if(logado != "true")
{
    location.href = "login.html"
}
console.log(logado)

const data = new Date()
var dia     = data.getDate();        
var dia_sem = data.getDay();          
var mes     = data.getMonth();          
var ano2    = data.getYear();          
var ano4    = data.getFullYear();     
var hora    = data.getHours();          
var min     = data.getMinutes();        
var seg     = data.getSeconds();        
var mseg    = data.getMilliseconds();   
var tz      = data.getTimezoneOffset();
var str_data = dia + '/' + (mes+1) + '/' + ano4;
var str_hora = hora + ':' + min + ':' + seg;

function showTimer() {
    var time=new Date();
    var hour=time.getHours();
    var minute=time.getMinutes();
    var second=time.getSeconds();
    if(hour<10)   hour  ="0"+hour;
    if(minute<10) minute="0"+minute;
    if(second<10) second="0"+second;
    var st=hour+":"+minute+":"+second;
    document.getElementById("timer").innerHTML=st; 
   }
   function initTimer() { 
    setInterval(showTimer,1000);
   }
   dayName = new Array("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado")
        monName = new Array("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
        now = new Date
document.getElementById("data").innerHTML = dayName[now.getDay()] + ", " + now.getDate() + " de " + monName[now.getMonth()] + " de " + now.getFullYear() + "."
initTimer()
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
async function pegarpontos()
{
    id = localStorage.idUsuario
    folhas = await (await fetch("http://192.168.0.10:3000/folhas")).json()
    folha = folhas.find((elemento) => elemento.idUsuario == id)
    document.getElementById("nome2").innerHTML = folha.nome
    pontos =  await (await fetch("http://192.168.0.10:3000/pontos")).json()
    ponto = pontos.filter((elemento) => elemento.idFolha == folha.id)
    console.log(str_data,pontos)
    date=(mes+1)+"/"+dia+"/"+ano4
   date=new Date((mes+1)+"/"+dia+"/"+ano4).toISOString()
    console.log(ponto)
    bancoHoras =new Date("0001-01-01 00:00:00")
    console.log(bancoHoras)
    for(p of ponto ){
        console.log(p)
        horas = p.horasTrabalhadas.split(":")[0]
        minutos = p.horasTrabalhadas.split(":")[1]
        bancoHoras = new Date(bancoHoras.setHours(bancoHoras.getHours() + parseInt(horas)-8))
        bancoHoras = new Date(bancoHoras.setMinutes(bancoHoras.getMinutes() + parseInt(minutos)))
    }
    console.log(bancoHoras)
    bancoHoras = bancoHoras - new Date("0001-01-01 00:00:00")
    console.log(bancoHoras)
    minutos = Math.floor (((bancoHoras/3600000)%1)*60)
    horas = Math.trunc ((bancoHoras/1000/60)/60)
    console.log(horas)
    calculoBancoHoras = (new Date("0001-01-01 "+Math.abs(horas)+':'+Math.abs(minutos))).toTimeString().split(` `)[0]
    if((minutos<=0)&&(horas<=0)){
        calculoBancoHoras="-"+calculoBancoHoras
    }
    document.getElementById("bancoDeHoras").innerHTML=calculoBancoHoras
    console.log(calculoBancoHoras)
    date = date.split("T")[0]+"T00:00:00.000Z"
    pontohoje = ponto.find((elemento) => elemento.data == date)
    console.log(pontohoje)
    if(pontohoje){
    document.getElementById("horasTrabalhadas").innerHTML = pontohoje.horasTrabalhadas
    }
}

pegarpontos()
  