# coamo test 

## 🛠️ Tecnologias

- [TypesScript](https://www.typescriptlang.org/) `v5.0.2`
- [Knex](https://knexjs.org/) `v2.4.2`
- [Express](https://expressjs.com/pt-br/) `v4.18.2`
- [Axios](https://axios-http.com/ptbr/docs/intro) `v1.3.4`

## 📋 Pré-requisitos

- Docker e Docker Compose

## 🎲 Rodando o Back-end

### Configurando o DB
- Copie o conteudo do arquivo dbConfig.sql
- Rode em seu banco local - de preferencia postgres 

### 🐋 Docker

- Clone o repositório e acesse a pasta
- Configure o seu `.env` seguindo o `.env.example`
- Rode o comando `docker-compose up` (com `-d` se preferir) na raiz do projeto; após a instalação e o build, o servidor iniciará na porta `:3000`

### Sem Docker

- Clone o repositório e acesse a pasta
- Configure o seu `.env`
- Instale as dependencias com o comando `npm install` ou `npm i`
- Rode o comando `npm run dev` ou `yarn dev` para iniciar o servidor na porta `:3000`



## Casos de teste

# Teste PJ com ICMS 12 PRAZO
**POST** - http://localhost:3000/sale
**BODY** :
```
{
    "cooperated": {
        "name": "Empresa teste2",
        "cpfCnpj": "106.048.039-58",
        "category": 2,
        "openingDate": "1997-11-09",
        "typePerson": 2,
        "partners": [
            {
                "cpf": "106.048.039-58",
                "name": "Felipe2",
                "rg": "12.420.042-3"
            }
        ]
    },
    "products": [
        {
            "id": 1,
            "productPurpose": "APLICACAO",
            "quantity": 2
        }
    ],
    "consumptionState": 1,
    "saleUnit": 1,
    "paymentType": "prazo",
    "buyDate": "2023-08-09",
    "dueDate": "2023-08-19"
}
```

**Retorno esperado**

```
{
    "data": {
        "status": "venda gerada",
        "totalVenda": 267.44,
        "produtos": [
            {
                "produto": 1,
                "valorTotal": 268.8
            }
        ]
    }
}
```
# Teste PF com ICMS 18
**POST** - http://localhost:3000/sale
**BODY** :

```
{
    "cooperated": {
        "name":"Felipe",
        "cpfCnpj":"106.048.039-58",
        "rg":"12.420.042-3",
        "category":1,
        "maritalStatus":"Solteiro",
        "birthDate":"1997-11-09",
        "typePerson":1
    },
    "products": [
        {
            "id":3,
            "productPurpose":"APLICACAO",
            "quantity":2
        }
    ],
    "consumptionState": 3,
    "saleUnit": 1,
    "paymentType": "aVista"
}
```

**Retorno esperado**

```
{
    "data": {
        "status": "venda gerada",
        "totalVenda": 150.93,
        "produtos": [
            {
                "produto": 3,
                "valorTotal": 160.48
            }
        ]
    }
}
```

# Teste PF Sem ICMS criado
**POST** - http://localhost:3000/sale
**BODY** :

```
{
    "cooperated": {
        "name":"Felipe",
        "cpfCnpj":"106.048.039-58",
        "rg":"12.420.042-3",
        "category":1,
        "maritalStatus":"Solteiro",
        "birthDate":"1997-11-09",
        "typePerson":1
    },
    "products": [
        {
            "id":1,
            "productPurpose":"APLICACAO",
            "quantity":3
        }
    ],
    "consumptionState": 1,
    "saleUnit": 1,
    "paymentType": "aVista"
}
```

**Retorno esperado**

```
{
    "error": "TaxNotFound - Não é possivel dar sequencia na venda pois não existe uma taxa tributária criada para este cenário"
}
```
