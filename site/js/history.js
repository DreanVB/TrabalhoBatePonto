idFolha = ""
async function pegarhistory() {
    id = localStorage.idUsuario
    folhas = await (await fetch("http://127.0.0.1:3000/folhas")).json()
    folha = folhas.find((elemento) => elemento.idUsuario == id)
    document.getElementById("nome1").innerHTML = folha.nome
    document.getElementById("rg1").innerHTML = folha.cpf
    pontos = await (await fetch("http://127.0.0.1:3000/pontos")).json()
    ponto = pontos.filter((elemento) => elemento.idFolha == folha.id)
    for (let elemento of ponto) {
        document.getElementById("tabeladeponto").innerHTML += `<tr onclick="editor('${elemento.id}','${elemento.data.split("T")[0]}','${elemento.entrada1}','${elemento.saida1}','${elemento.entrada2}','${elemento.saida2}')"><td>${elemento.data.split("T")[0]}</td><td>${elemento.entrada1}</td><td>${elemento.saida1}</td><td>${elemento.entrada2}</td><td>${elemento.saida2}</td></tr>`

    }

}
pegarhistory()

async function editarHora() {
    event.preventDefault()
    data1 = document.getElementById("data1").value
    entrada1 = document.getElementById("entrada1").value
    saida1 = document.getElementById("saida1").value
    entrada2 = document.getElementById("entrada2").value
    saida2 = document.getElementById("saida2").value
    

    entrada22 = new Date("0001-01-01 "+entrada2)
    saida22 = new Date("0001-01-01 "+saida2)
    var diferenca2 = saida22 - entrada22

    entrada11 = new Date("0001-01-01 "+entrada1)
    saida11 = new Date("0001-01-01 "+saida1)
    var diferenca1 = saida11 - entrada11

    diferenca = diferenca1 + diferenca2

    minutos = Math.floor (((diferenca/3600000)%1)*60)
    horas = Math.floor ((diferenca/1000/60)/60)
console.log(minutos, horas)
    horasFinalDia = new Date("0001-01-01 "+"00:00:00")
    horasFinalDia = new Date(horasFinalDia.setHours(horasFinalDia.getHours() + horas))
    horasFinalDia = new Date(horasFinalDia.setMinutes(horasFinalDia.getMinutes() + minutos))

    horasTrabalhadas = (horasFinalDia).toTimeString().split(` `)[0]

    console.log(horasTrabalhadas)
    await (await fetch(`http://127.0.0.1:3000/editarHoras/${idFolha}/${entrada1}/${saida1}/${entrada2}/${saida2}/${horasTrabalhadas}`)).json()
    location.reload()
}

function editor(id, data, entrada1, saida1, entrada2, saida2) {
    document.getElementById("formulario").style.display = "block"
    document.getElementById("data1").value = data
    document.getElementById("entrada1").value = entrada1.slice(0,-3)
    document.getElementById("saida1").value = saida1.slice(0,-3)
    document.getElementById("entrada2").value = entrada2.slice(0,-3)
    document.getElementById("saida2").value = saida2.slice(0,-3)
    idFolha = id

}

function cancelar() {
    document.getElementById("formulario").style.display = "none"
}