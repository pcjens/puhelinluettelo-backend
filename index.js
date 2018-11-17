const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
const API_PREFIX = '/api'

let db = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Martti Tienari',
    number: '040-123456',
    id: 2
  },
  {
    name: 'Arto Järvinen',
    number: '040-123456',
    id: 3
  },
  {
    name: 'Lea Kutvonen',
    number: '040-123456',
    id: 4
  }
]

app.get('/info', (req, res) => {
  res.type('text/html').send(`<p>Puhelinluettelossa ${db.length} henkilön tiedot.</p><p>${new Date()}</p>`)
})

app.get(API_PREFIX + '/persons', (req, res) => {
  res.json(db)
})

app.get(API_PREFIX + '/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = db.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete(API_PREFIX + '/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  db = db.filter(person => person.id !== id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
