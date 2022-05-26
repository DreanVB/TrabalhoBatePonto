usuarios = JSON.parse(localStorage.usuarios)
for (let elemento of usuarios)
{
    document.getElementById("customers").innerHTML += "<tr><td>"+elemento.login+"</td><td>"+elemento.senha+"</td><td ><a href=\"controles/apagarusuarios.html?id="+elemento.id+"\" >X</a></td></tr>"
}
