logado = localStorage.logado
if(logado == "true")
{
    location.href = "index.html"
}
async function login()
{
    usuarios = await (await fetch("http://localhost:3000/usuarios")).json()
    console.log(usuarios)
    usuario = document.getElementById("usuario").value
    senha = document.getElementById("senha").value

    userlogado = usuarios.find((elemento) => elemento.login == usuario && elemento.senha == senha)

    if (userlogado == undefined) 
    {
        alert("Usuario ou senha incorretos.")
        // location.href = "../login.html"
    }
    else
    {
        localStorage.logado = true
        localStorage.idUsuario = userlogado.id
        location.href = "../index.html"
    }
}
