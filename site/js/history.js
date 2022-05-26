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
    console.log(idFolha)
    await (await fetch(`http://127.0.0.1:3000/editarHoras/${idFolha}/${entrada1}/${saida1}/${entrada2}/${saida2}`)).json()
    location.reload()
}

function editor(id, data, entrada1, saida1, entrada2, saida2) {
    document.getElementById("formulario").style.display = "block"
    document.getElementById("data1").value = data
    document.getElementById("entrada1").value = entrada1
    document.getElementById("saida1").value = saida1
    document.getElementById("entrada2").value = entrada2
    document.getElementById("saida2").value = saida2
    idFolha = id

}

function cancelar() {
    document.getElementById("formulario").style.display = "none"
}