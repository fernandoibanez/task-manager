require('../src/db/mongoose')
const Task = require('../src/models/task')

const findByIdAndUpdate = async (id) => {
    await Task.findByIdAndUpdate(id, {completed: true})
    const count = await Task.countDocuments({completed: false})
    return count
}

findByIdAndUpdate('63639a23c1653bcdb7ac0850').then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})