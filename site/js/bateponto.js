str_data = ""
str_hora = ""
dia=""
mes=""
ano4=""
gethora()

folha={}
pontos=[]
id=""
pontohoje={}

async function pegarpontos()
{
    id = localStorage.idUsuario
    folhas = await (await fetch("http://127.0.0.1:3000/folhas")).json()
    folha = folhas.find((elemento) => elemento.idUsuario == id)
    pontos =  await (await fetch("http://127.0.0.1:3000/pontos")).json()
    ponto = pontos.filter((elemento) => elemento.idFolha == folha.id)
    console.log(str_data,pontos)
    date=(mes+1)+"/"+dia+"/"+ano4
    console.log(ano4+"-"+(mes+1)+"-"+dia +" 00:00:00")
   date=new Date(ano4+"-"+(mes+1)+"-"+dia +" 00:00:00").toISOString()
   date = date.split("T")[0]+"T00:00:00.000Z"
console.log(date)
    pontohoje = ponto.find((elemento) => elemento.data == date)
    console.log(ponto)
    console.log(pontohoje)
    
    if (pontohoje != undefined) {
        document.getElementById("entrada1").innerHTML = pontohoje.entrada1
        document.getElementById("saida1").innerHTML = pontohoje.saida1
        document.getElementById("entrada2").innerHTML = pontohoje.entrada2
        document.getElementById("saida2").innerHTML = pontohoje.saida2
    }

}
pegarpontos()

async function baterponto() {

    gethora()
    date=ano4+"-"+(mes+1)+"-"+dia
    console.log(date)
    console.log(str_data, str_hora)
    if (pontohoje == undefined) {
        gravarponto =
        {
            "entrada1": str_hora,
            "saida1": "00:00",
            "entrada2": "00:00",
            "saida2": "00:00",
            "data": str_data,
            "idFolha": folha.id,
            "id": uuidv4()
        }
        
        await (await fetch(`http://127.0.0.1:3000/criapontos?entrada1=${str_hora}&entrada2=00:00&saida1=00:00&saida2=00:00&data=${date}&idFolha=${folha.id}&id=${uuidv4()}&horasTrabalhadas=${"00:00"}`)).json()
        pontos.push(gravarponto)
        localStorage.folhadepontos = JSON.stringify(pontos)

    }

    console.log(pontohoje)
    calculoHorasTrabalhadas = 0
    if (pontohoje != undefined) {
        if (pontohoje.saida1 == "00:00:00") {
            console.log(str_hora)
            pontohoje.saida1 = str_hora

            var entrada1 = pontohoje.entrada1
            var saida1 = pontohoje.saida1
            entrada1 = new Date("0001-01-01 "+entrada1)
            saida1 = new Date("0001-01-01 "+saida1)
            var diferenca = saida1 - entrada1
            minutos = Math.floor (((diferenca/3600000)%1)*60)
            horas = Math.floor ((diferenca/1000/60)/60)
            calculoHorasTrabalhadas = (new Date("0001-01-01 "+horas+':'+minutos)).toTimeString().split(` `)[0]
            console.log(calculoHorasTrabalhadas)
        }
        else if (pontohoje.entrada2 == "00:00:00") {
            pontohoje.entrada2 = str_hora
            calculoHorasTrabalhadas = pontohoje.horasTrabalhadas

        }
        else if (pontohoje.saida2 == "00:00:00") {
            pontohoje.saida2 = str_hora
            var entrada2 = pontohoje.entrada2
            var saida2 = pontohoje.saida2
            entrada2 = new Date("0001-01-01 "+entrada2)
            saida2 = new Date("0001-01-01 "+saida2)
            var diferenca = saida2 - entrada2
            minutos = Math.floor (((diferenca/3600000)%1)*60)
            horas = Math.floor ((diferenca/1000/60)/60)

            horasFinalDia = new Date("0001-01-01 "+pontohoje.horasTrabalhadas)
            horasFinalDia = new Date(horasFinalDia.setHours(horasFinalDia.getHours() + horas))
            horasFinalDia = new Date(horasFinalDia.setMinutes(horasFinalDia.getMinutes() + minutos))

            calculoHorasTrabalhadas = (horasFinalDia).toTimeString().split(` `)[0]

        }
        await (await fetch(`http://127.0.0.1:3000/atualizapontos?entrada1=${pontohoje.entrada1}&entrada2=${pontohoje.entrada2}&saida1=${pontohoje.saida1}&saida2=${pontohoje.saida2}&data=${date}&idFolha=${pontohoje.idFolha}&id=${pontohoje.id}&horasTrabalhadas=${calculoHorasTrabalhadas}`)).json()

    }

    location.reload()
}



function gethora() {
    const data = new Date()
    var dia = data.getDate();
    var dia_sem = data.getDay();
    var mes = data.getMonth();
    var ano2 = data.getYear();
    var ano4 = data.getFullYear();
    var hora = data.getHours();
    var min = data.getMinutes();
    var seg = data.getSeconds();
    var mseg = data.getMilliseconds();
    var tz = data.getTimezoneOffset();
    str_data = dia + '/' + (mes + 1) + '/' + ano4;
    str_hora = hora + ':' + min + ':' + seg;
}
