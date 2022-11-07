const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(e){
        res.status(401).send(e)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const keys = Object.keys(req.body)
    const updatableKeys = ['name','age','password']
    const isValidOperation = keys.every((update) => updatableKeys.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ 'error': 'Some properties are not allowed to be upadated.'})
    }
    
    try {
        keys.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(e){
        res.status(500).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        //console.log(req.user.tokens)
        req.user.tokens = req.user.tokens.filter((blabla) => {
            //console.log(blabla)
            return blabla.token !== req.token
        })

        await req.user.save()

        res.send()

    } catch(e){
        //console.log(e)
        res.status(505).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e){
        res.status(505).send(e)
    }
})

const upload = multer({
    dest: 'avatars'
})

router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send()
})

module.exports = router