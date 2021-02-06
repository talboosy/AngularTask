const express = require('express')
const Data = require('../models/data')
const router = new express.Router()



router.post('/datas', (req, res) => {
    var timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 
    const data = new Data({procedure: req.body.procedure, timestamp: timestamp, value: req.body.value })
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