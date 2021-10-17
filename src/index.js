const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(express.json())

const customers = []

/* Middleware */
function verifyIfExistAccount(request, response, next) {
  const { cpf } = request.headers

  const customer = customers.find(customer => customer.cpf === cpf)

  if(!customer) {
    return response.status(400).json({ error: "Customer not found."})
  }

  /* Access to other routes */
  request.customer = customer
  return next()
}

/* Balance control function. */ 
function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if(operation.type === 'credit'){
      return acc + operation.amount
    }else {
      return acc - operation.amount
    }

  }, 0) /* Initial value of reduce. */

  return balance

}

/* Acoount creation. */
app.post('/account', (request, response) => {
  const { cpf, name } = request.body

  /* Validation CPF */
  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)
  if(customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exist."})
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  })

  return response.status(201).json(customers) 

})

/* Return list in account. */
app.get('/account', (request, response) => {
  return response.status(201).json(customers)
})

/* Update account. */
app.put('/account/', verifyIfExistAccount, (request, response) => {
  const { name } = request.body

  const { customer } = request

  customer.name = name

  return response.status(201).json(customer)
})

app.delete('/account/', verifyIfExistAccount, (request, response) => {
  const { customer } = request

  customers.splice(customer, 1)

  return response.status(200).json(customers)
})


/* Return extract of the account. */
app.get('/statement/', verifyIfExistAccount, (request, response) => {
  /* Access to information returned from middleware */ 
  const { customer } = request
  return response.json(customer.statement)
})

/* Statement listing by date. */
app.get('/statement/date', verifyIfExistAccount, (request, response) => {
  const { customer } = request
  const { date } = request.query

  const dateFormat = new Date(date + " 00:00")

  /* Extract for the specific day. */
  const statement = customer.statement.filter(
    (statement) => 
      statement.created_at.toDateString() === new Date(dateFormat).toDateString()
  )
  
  return response.json(statement)
})

/* Account deposit inclusion. */
app.post('/deposit', verifyIfExistAccount, (request, response) => {
  const { amount , description } = request.body

  const { customer } = request

  const statementOperation = {
    amount,
    description,
    created_at: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
})

/* Account withdraw inclusion. */
app.post('/withdraw', verifyIfExistAccount, (request, response) => {
  const { amount } = request.body
  
  const { customer } = request

  const balance = getBalance(customer.statement)

  if(balance < amount ){
     return response.status(400).json({ message: 'Insufficient balance.'})
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit'
  }

  customer.statement.push(statementOperation)
  
  return response.status(201).send()

})

/* Return balance in account*/
app.get('/balance', verifyIfExistAccount, (request, response) => {
  const { customer } = request

  const balance = getBalance(customer.statement)

  return response.json(balance)
})
app.listen(3333)