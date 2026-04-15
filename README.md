# 🐶 TheDogAPI

Uma API REST desenvolvida em **Node.js** que consome [TheDogAPI](https://thedogapi.com) para buscar raças e informações sobre cães.

---

## 📋 Sobre o Projeto

Este projeto expõe endpoints próprios que consultam a TheDogAPI, permitindo buscar informações detalhadas sobre raças de cães como nome, temperamento, origem, expectativa de vida e muito mais.

---

## 🚀 Tecnologias

- **Node.js**
- **Express** – framework HTTP
- **Axios** – cliente HTTP para consumir a TheDogAPI
- **dotenv** – gerenciamento de variáveis de ambiente

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm ou yarn
- Chave de API gratuita em [thedogapi.com](https://thedogapi.com)

---

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/Yssatha-25/TheDogAPI.git

# Acesse a pasta do projeto
cd TheDogAPI

# Instale as dependências
npm install
```

---

## 🔑 Configuração

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
DOG_API_KEY=sua_chave_aqui
PORT=3000
```

> Você pode obter sua chave gratuita em: https://thedogapi.com

---

## ▶️ Executando

```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

O servidor será iniciado em `http://localhost:3000`.

---

## 📡 Endpoints

### `GET /breeds`
Retorna a lista de todas as raças disponíveis.

**Exemplo de resposta:**
```json
[
  {
    "id": 1,
    "name": "Affenpinscher",
    "origin": "Germany",
    "temperament": "Stubborn, Curious, Playful, Adventurous",
    "life_span": "10 - 12 years"
  }
]
```

---

### `GET /breeds/search?q={nome}`
Busca raças pelo nome.

**Parâmetros:**
| Parâmetro | Tipo   | Descrição              |
|-----------|--------|------------------------|
| `q`       | string | Nome da raça a buscar  |

**Exemplo:**
```
GET /breeds/search?q=labrador
```

---

### `GET /breeds/:id`
Retorna informações detalhadas de uma raça pelo ID.

**Exemplo:**
```
GET /breeds/1
```

---

## 📁 Estrutura do Projeto

```
TheDogAPI/
├── src/
│   ├── routes/        # Definição das rotas
│   ├── controllers/   # Lógica dos endpoints
│   └── services/      # Integração com a TheDogAPI externa
├── .env.example
├── package.json
└── README.md
```

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha nova feature'`
4. Push para a branch: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🔗 Referências

- [TheDogAPI – Documentação oficial](https://docs.thedogapi.com)
- [Express.js](https://expressjs.com)
