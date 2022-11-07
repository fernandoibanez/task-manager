// CRUD create read update delete

const mongodb = require('mongodb')
const MongoCliente = mongodb.MongoClient

const connectionURL = 'mongodb+srv://fibanez:cEpYfVNmVnB7@cluster43611.hla2ngx.mongodb.net/test'
const database = 'task-manager'

mongodb.MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if(error){
        return console.log('Unable to connect.')
    } 

    console.log('Connected!')
    const db = client.db(database)

    db.collection('users').insertOne({
        name: 'Fer',
        age: 46
    })


})