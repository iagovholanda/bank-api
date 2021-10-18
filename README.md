<h1 align="center">
  Finance Aplication
</h1>
<h3 align="center"> Simple API for control financial transactions 🏛💲 </h3>


## Starting application

1. Clone this repo using `https://github.com/iagovholanda/bank-api`
2. Move to the appropriate directory: `cd bank-api`.<br />
3. Run `yarn` to install dependencies.<br />
6. Run `yarn start` and `yarn queue` to run the servers at `http://localhost:3333`.


## FinAPI - Financeira

### Requisitos: 

- [x] Deve ser possível criar uma conta
- [x] Deve ser possível buscar o extrato bancário do cliete
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível realizar um saque
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [x] Deve ser possível atualizar dados da conta bancária do cliente
- [x] Deve ser possível obter dados da conta do cliente
- [x] Deve ser possível deletar uma conta
- [x] Deve ser possível retornar o saldo da conta

## Regras de negócio: 

- [x] Não deve ser possível cadastrar uma conta com cpf já existente
- [x] Não deve ser possível fazer depósito em uma conta não existente
- [x] Não deve ser possível buscar extrato em uma conta não existente
- [x] Nõa deve ser possível fazer saque em uma conta não existente
- [x] Não deve ser possível excluir uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente 
