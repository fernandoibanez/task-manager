require('../src/db/mongoose')
const User = require('../src/models/user')

/*
User.findByIdAndUpdate('6362a7e9aad14b3f20275a3f', {age: 22}).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 22})
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})
*/

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('6362a7e9aad14b3f20275a3f', 28).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})