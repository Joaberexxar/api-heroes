// docker exec -it 0a82ad632f37 mongo -u joabe -p 1234567 --authenticationDatabase heroes

// databases
// show dbs

// mudar o contexto para uma db específica
// use herois

// collections
// show collections

// inserir um item
db.heroes.insert({
  nome: 'Mulher Maravilha',
  poder: 'Laço',
  dataNascimento: '01/01/1970'
})
db.heroes.insert({
  nome: 'Lanterna Verde',
  poder: 'Anel',
  dataNascimento: '01/01/1970'
})
db.heroes.find()
db.heroes.find().pretty() // formatar o resultado

for(let i = 0; i <= 100000; i++) {
  db.heroes.insert({
    nome: `Clone-${i}`,
    poder: 'Anel',
    dataNascimento: '01/01/1970'
  })
}
db.heroes.count()
db.heroes.findOne()
db.heroes.find().limit(1000).sort({nome: -1})
db.heroes.find({}, {_id: 0, nome: 1, poder: 1})

// create
db.heroes.insert({
  nome: 'Lanterna Verde',
  poder: 'Anel',
  dataNascimento: '01/01/1970'
})

// read 
db.heroes.find()

// update
db.heroes.update({ _id: ObjectId("668c7e6f1855b589d9938bdb")}, {nome: 'Lanterna Azulzulzul'})
db.heroes.update({nome: 'Lanterna Verde'}, {$set: {poder: 'Anel de Prata'}})

db.heroes.update({ _id: ObjectId("668c7e6f1855b589d9938bdb")},
                  {nome }  )
