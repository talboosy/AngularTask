const express = require('express')
const Data = require('../models/data')
const router = new express.Router()



router.post('/datas', (req, res) => {
    const data = new Data(req.body)
    data.save().then(() => {
        res.status(201).send(data)
    }).catch((e) => {
        res.status(400).send(E)
    })
})

router.get('/datas', (req,res) => {
    Data.find({}).then((data) => {
        res.send(data)
    }).catch(() => {
        res.status(500).send()
    })
})

router.get('/datas/:id', (req,res) => {
    const _id = req.params.id

    Data.findById(_id).then((data) => {
        if(!data) {
            return res.status(404).send()
        }
        res.send(data)
    }).catch((e) => {
        res.status(500).send()
    })
})

router.get('/getData', (req,res) => {
    res.json({
        "statusCode":200,
        "statusMessage": "SUCCESS"
    })
})

module.exports = router