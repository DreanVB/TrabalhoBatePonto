async function pegarhistory()
{
    id=localStorage.idUsuario
    folhas = await (await fetch("http://localhost:3000/folhas")).json()
    folha = folhas.find((elemento) => elemento.idUsuario == id)
    document.getElementById("nome1").innerHTML=folha.nome
    document.getElementById("rg1").innerHTML=folha.rg
    pontos = await (await fetch("http://localhost:3000/pontos")).json()
    ponto = pontos.filter((elemento) => elemento.idFolha == folha.id)
    for (let elemento of ponto)
    {
        document.getElementById("tabeladeponto").innerHTML += `<tr><td>${elemento.data.split("T")[0]}</td><td>${elemento.entrada1}</td><td>${elemento.saida1}</td><td>${elemento.entrada2}</td><td>${elemento.saida2}</td></tr>`
    
    }

}
pegarhistory()