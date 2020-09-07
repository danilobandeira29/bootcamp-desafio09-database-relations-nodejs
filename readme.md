# Documentation/Documentação
- [English](#-Summary)
- [Português - Brasil](#-Sumário)

# Summary
- [About](#-About)
- [Challenges](#-Challenges)
- [Techs](#-Techs)
- [Code formatters](#-Code-formatters)
- [Required Programs](#-Required-Programs)
- [Clone the repository](#-Clone-the-repository)
- [Tests](#-Tests)


## 📝 About
This application will allow the creation of customers, products and orders, where the customer can generate new purchase orders for certain products, such as a small e-commerce.

---

## 🏆 Challenges
- [x] Put in pratice what I learned in the Rockeseat's Bootcamp GoStack.

---

## 💻 Techs
- NodeJS
- SOLID
- TDD
- DDD
- API REST/Restful
- Typescript
- Docker
- PostgreSQL
- Axios

## 💅 Code formatters
- ESLint
- Prettier
- EditorConfig

---

## 🛑 Required Programs
- Docker
- Create a database called *gostack_desafio09* and *gostack_desafio09_tests*, both with the username *postgres* and password *docker*.

> Or just edit *ormconfig.ts* (found at the root of the project) according to your need.

Your *ormconfig.ts* file must match the port on which PostgreSQL was installed on your computer, which by default is *5432*.

```typescript
{
  "type": "postgres",
  "host": "localhost",
  "port": 5434,
  "username": "postgres",
  "password": "docker",
  "database": "gostack_desafio09",
  "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
  "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}

```

> In my case is *5434*
---

## 👇 Clone the repository
- Open your terminal to write theses lines:
```bash
  ## clone repository
  $ git clone https://github.com/danilobandeira29/bootcamp-desafio09-database-relations-nodejs.git

  ## access project directory
  $ cd bootcamp-desafio09-database-relations-nodejs

  ## install all dependencies (or you can use 'npm install')
  $ yarn

  ## opens another terminal and inicialize the project (or you can use 'npm start')
  $ yarn dev:server
```
---

## 🧪 Tests
With your database running, open your terminal and execute
```bash
$ yarn tests

```

---

# Sumário
- [Sobre](#-Sobre)
- [Desafios](#-Desafios)
- [Tecnologias](#-Tecnologias)
- [Formatadores de Código](#-Formatadores-de-Código)
- [Programas necessários](#-Programas-necessários)
- [Clonar o Projeto](#-Clonar-o-Projeto)
- [Testes](#-Testes)


## 📝 Sobre
Essa será aplicação permite a criação de clientes, produtos e pedidos, onde o cliente pode gerar novos pedidos de compra de certos produtos, como um pequeno e-commerce.

---

## 🏆 Desafios
- [x] Por em prática o que eu aprendi com o Bootcamp da Rockeseat

---

## 💻 Tecnologias
- NodeJS
- SOLID
- TDD
- DDD
- API REST/Restful
- Typescript
- Docker
- PostgreSQL
- Axios

## 💅 Formatadores de código
- ESLint
- Prettier
- EditorConfig

---

## 🛑 Programas necessários
- Docker
- Fazer a criação de um banco de dados chamado *gostack_desafio09* e *gostack_desafio09_tests*, ambos com o usuário *postgres* e senha *docker*.
> Ou basta editar o *ormconfig.ts*(encontrado na raíz do projeto) de acordo com a sua necessidade.

Seu arquivo *ormconfig.ts* deve está de acordo com a porta em que o PostgreSQL foi instalada no seu computador, que por padrão é *5432*.

```typescript
{
  "type": "postgres",
  "host": "localhost",
  "port": 5434,
  "username": "postgres",
  "password": "docker",
  "database": "gostack_desafio09",
  "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
  "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}

```
> mas no meu caso é *5434*

___

## 👇 Clonar o Projeto
- Abra o seu terminal para escrever essas linhas:
```bash
  ## clonar repositório
  $ git clone https://github.com/danilobandeira29/bootcamp-desafio09-database-relations-nodejs.git

  ## acessar o diretório do projeto
  $ cd bootcamp-desafio09-database-relations-nodejs

  ## instalar todas as dependências (ou você pode executar 'npm install')
  $ yarn

  ## inicializar o projeto (ou você pode executar 'npm start')
  $ yarn dev:server
```
---

## 🧪 Testes
Com o banco de dados executando, abra o seu terminal e execute
```bash
$ yarn tests

```
---

**Developed by/Desenvolvido por**👻
<a href="https://www.linkedin.com/in/danilo-bandeira-4411851a4/">**Danilo Bandeira</a>**
