const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://fibanez:cEpYfVNmVnB7@cluster43611.hla2ngx.mongodb.net', {
    useNewUrlParser: true,
    dbName: 'task-manager'
})

//console.log(mongoose.Connection)


/*
const me = new User({
    name: 'Fer',
    age: 46
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('error: ' + error)
})
*/
