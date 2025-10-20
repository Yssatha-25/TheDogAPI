
const urlBase = "https://api.thedogapi.com/v1" 
const chaveAPI = "live_wI4P9KK5UZPUPmZ3uN44sp05bhjLnkCRj9RcthA9D41ugrwz9EFr7wCvmN2p0jkz" 

const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": chaveAPI
}) 

const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow"
} 

// VARIÁVEIS
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [] 
let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || null 

const divLogin = document.getElementById("SecaoLoginDiv") 
const divCadastro = document.getElementById("SecaoCadastroDiv") 
const divDashboard = document.getElementById("SecaoDashboard") 
const dogsContainer = document.getElementById("dogs-container") 
const inputBusca = document.getElementById("search_input") 

// ==> Inputs de cadastro
const emailCadastro = document.getElementById("emailCadastro") 
const usuarioCadastro = document.getElementById("usuarioCadastro") 
const senhaCadastro = document.getElementById("senhaCadastro") 

// ==> Inputs de login
const usuarioLogin = document.getElementById("usuarioLogin")
const senhaLogin = document.getElementById("senhaLogin")

// FUNÇÕES DE NAVEGAÇÃO
function AbrirCadastro() {
    LimparInputs()
    divLogin.classList.add("hidden")
    divCadastro.classList.remove("hidden")
}

function AbrirLogin() {
    LimparInputs()
    divLogin.classList.remove("hidden")
    divCadastro.classList.add("hidden")
}

function AbrirSecaoDashboard() {
    LimparInputs()
    divLogin.classList.add("hidden")
    divCadastro.classList.add("hidden")
    divDashboard.classList.remove("hidden")
}

function LimparInputs(){
    usuarioLogin.value = ""
    senhaLogin.value = ""
    emailCadastro.value = ""
    senhaCadastro.value = ""
    usuarioCadastro.value = ""
}

// CADASTRO
function CamposPreenchidos() {
    return (
        emailCadastro.value.trim() !== "" &&
        usuarioCadastro.value.trim() !== "" &&
        senhaCadastro.value.trim() !== ""
    )
}

function UsuarioExiste() {
    for (let i = 0; i < usuarios.length; i++) {
        if (
            usuarioCadastro.value.trim() === usuarios[i].usuario ||
            emailCadastro.value.trim() === usuarios[i].email
        ) {
            return true 
        }
    }
    return false 
}

function RealizarCadastro() {
    event.preventDefault()

    if (CamposPreenchidos() && !UsuarioExiste()) {
        let novoUsuario = {
            email: emailCadastro.value.trim(),
            usuario: usuarioCadastro.value.trim(),
            senha: senhaCadastro.value.trim(),
            logado: false
        } 

        usuarios.push(novoUsuario) 
        localStorage.setItem("usuarios", JSON.stringify(usuarios)) 
        alert("Usuário cadastrado com sucesso!") 
        AbrirLogin() 
    } else {
        if (!CamposPreenchidos()) {
            alert("Preencha todos os campos para se cadastrar.") 
        } else if (UsuarioExiste()) {
            alert("Já existe um usuário com esse nome ou e-mail.") 
        }
    }
}

// LOGIN E LOGOUT
function FazerLogin() {
    event.preventDefault()  // impede o reload automático do form

    const usuario = usuarioLogin.value.trim() 
    const senha = senhaLogin.value.trim() 

    for (let i = 0; i < usuarios.length; i++) {
        if (usuario === usuarios[i].usuario && senha === usuarios[i].senha) {
            usuarios[i].logado = true 
            localStorage.setItem("usuarios", JSON.stringify(usuarios)) 
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarios[i])) 
            AbrirSecaoDashboard() 
            CarregarRacas() 
            return 
        }
    }
    alert("Usuário ou senha incorretos!") 
}

function FazerLogout() {
    if (usuarioLogado) {
        usuarioLogado.logado = false 
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado)) 
    }
    window.location.href = "index.html" 
}

function VerificarSessao() {
    if (usuarioLogado && usuarioLogado.logado) {
        AbrirSecaoDashboard() 
        CarregarRacas() 
    }
}

// API RAÇAS DE CACHORRO
async function CarregarRacas() {
    try {
        const resposta = await fetch(`${urlBase}/breeds`, requestOptions) 
        const dados = await resposta.json() 
        ExibirRacas(dados) 
    } catch (erro) {
        alert("Erro ao carregar raças: " + erro.message) 
    }
}

async function BuscarRacas() {
    const termo = inputBusca.value.trim() 
    if (termo === "") {
        CarregarRacas() 
        return 
    }

    try {
        const resposta = await fetch(`${urlBase}/breeds/search?q=${termo}`, requestOptions) 
        const dados = await resposta.json() 

        if (dados.length === 0) {
            dogsContainer.innerHTML = "<p>Nenhuma raça encontrada.</p>" 
        } else {
            ExibirRacas(dados) 
        }
    } catch (erro) {
        alert("Erro ao buscar raças: " + erro.message) 
    }
}

function ExibirRacas(racas) {
    dogsContainer.innerHTML = "" 

    for (let i = 0; i < racas.length; i++) {
        const raca = racas[i] 
        const card = document.createElement("div") 
        card.classList.add("dog-card") 

        const imgUrl = raca.image ? raca.image.url : "https://via.placeholder.com/200x150" 

        card.innerHTML = `
            <h2>${raca.name}</h2>
            <img src="${imgUrl}" alt="${raca.name}">
            <p><strong>Temperamento:</strong> ${raca.temperament || "Não informado"}</p>
            <p><strong>Tempo de vida:</strong> ${raca.life_span || "Desconhecida"}</p>
        ` 

        dogsContainer.appendChild(card) 
    }
}

// LIMPAR PESQUISA
inputBusca.addEventListener("input", () => {
    if (inputBusca.value.trim() !== "") {
        botaoLimparPesquisa.classList.remove("hidden");
    } else {
        botaoLimparPesquisa.classList.add("hidden");
        CarregarRacas();
    }
});

function LimparPesquisa() {
    inputBusca.value = "";
    botaoLimparPesquisa.classList.add("hidden");
    CarregarRacas();
}

window.onload = VerificarSessao 
