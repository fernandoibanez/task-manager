const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT
/*
const requestMethodsUnavailable = ['DELETE', 'PATCH', 'POST']

const maintenanceModeMiddleware = (req, res, next) => {
    if(requestMethodsUnavailable.includes(req.method)){
        res.status(503).send('Updating methods are currently unavailable.')
    } else {
        next()
    }
}

app.use(maintenanceModeMiddleware)
*/

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
    console.log('Server is up on port' + port)
})


