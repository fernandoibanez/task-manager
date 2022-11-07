const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    dbName: process.env.MONGODB_DB_NAME
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
