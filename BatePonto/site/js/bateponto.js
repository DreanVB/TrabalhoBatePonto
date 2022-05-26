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
    folhas = await (await fetch("http://localhost:3000/folhas")).json()
    folha = folhas.find((elemento) => elemento.idUsuario == id)
    pontos =  await (await fetch("http://localhost:3000/pontos")).json()
    ponto = pontos.filter((elemento) => elemento.idFolha == folha.id)
    console.log(str_data,pontos)
    date=(mes+1)+"/"+dia+"/"+ano4
   date=new Date((mes+1)+"/"+dia+"/"+ano4).toISOString()
console.log(date)
    pontohoje = ponto.find((elemento) => elemento.data == date)
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
        
        await (await fetch(`http://localhost:3000/criapontos?entrada1=${str_hora}&entrada2=00:00&saida1=00:00&saida2=00:00&data=${date}&idFolha=${folha.id}&id=${uuidv4()}`)).json()
        pontos.push(gravarponto)
        localStorage.folhadepontos = JSON.stringify(pontos)

    }
    if (pontohoje != undefined) {
        if (pontohoje.saida1 == "00:00:00") {
            pontohoje.saida1 = str_hora
            console.log(pontohoje)
            
        }
        else if (pontohoje.entrada2 == "00:00:00") {
            pontohoje.entrada2 = str_hora
        }
        else if (pontohoje.saida2 == "00:00:00") {
            pontohoje.saida2 = str_hora
        }
        console.log(`http://localhost:3000/atualizapontos?entrada1=${pontohoje.entrada1}&entrada2=${pontohoje.entrada2}&saida1=${pontohoje.saida1}&saida2=${pontohoje.saida2}&data=${date}&idFolha=${pontohoje.idFolha}&id=${pontohoje.id}`)
        await (await fetch(`http://localhost:3000/atualizapontos?entrada1=${pontohoje.entrada1}&entrada2=${pontohoje.entrada2}&saida1=${pontohoje.saida1}&saida2=${pontohoje.saida2}&data=${date}&idFolha=${pontohoje.idFolha}&id=${pontohoje.id}`)).json()

    }

    location.reload()
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
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
