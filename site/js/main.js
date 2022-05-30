logado = localStorage.logado
adm = localStorage.adm
if(adm=="1"){
document.getElementById("adm").style.display= "inline"
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


  