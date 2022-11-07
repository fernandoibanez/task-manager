const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')


router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
        //const tasks = await Task.find({owner: req.user._id})
        //res.send(tasks)
    } catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send(e)
    }
})

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    console.log(task)
    try {
        await task.save()
        res.status(201).send(task)
    } catch(error) {
        res.status(402).send(error)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const keys = Object.keys(req.body)
    const updatableKeys = ['description','completed']
    const isValidOperation = keys.every((update) => updatableKeys.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ 'error': 'Some properties are not allowed to be upadated.'})
    }
    
    try {
        const task = await Task.findOne({ _id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        keys.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send(e)
    }
})

module.exports = router