const url = "https://docs.thedogapi.com/v1/breeds"
const chaveAPI = "live_wI4P9KK5UZPUPmZ3uN44sp05bhjLnkCRj9RcthA9D41ugrwz9EFr7wCvmN2p0jkz"

const headers = new Headers({
    "Context-type": "application/json",
    "x-api-key": chaveAPI
})

const requestOptions = {
    method: "GET",
    headers: headers,
    readirect: "follow"
}

fetch(url)
    .then(res => res.json())
    .then(dados => console.log(dados))
    .catch(erro => console.log(erro.message))

const divLogin = document.getElementById("SecaoLoginDiv")
const divCadastro = document.getElementById("SecaoCadastroDiv")
const divDashboard = document.getElementById("SecaoDashboard")

function AbrirCadastro() {
    divLogin.classList.add("hidden")
    divCadastro.classList.remove("hidden")
}

function AbrirLogin() {
    divLogin.classList.remove("hidden")
    divCadastro.classList.add("hidden")
}

function AbrirSecaoDashboard() {
    divLogin.classList.add("hidden")
    divCadastro.classList.add("hidden")
    divDashboard.classList.remove("hidden")
}