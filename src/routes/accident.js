let express = require("express")
let AccidentMoedel = require("../models/accidents.model")
let router = express.Router()

//http://localhost:5000/api/v1/accident
//http://localhost:5000/api/v1/accident?year=2016
router.get('/', (req, res) => {
    if (req.query.year) {
        findByYear(req, res)
    }
    else if (req.query.gyear) {
        groupByYear(req, res)
    }
    else {
        AccidentMoedel.find({}, { latitude: 1, longitude: 1,accident_year :1 })
            .then(doc => {
                return res.jsonp(doc)
            })
            .catch(err => {
                return res.status(500).jsonp(err)
            })
    }
})

//find accident by post
router.post('/',(req,res) =>{
    if (!req.body)
    {
        return res.status(400).send("request boddy is missing!")
    }
    AccidentMoedel.find(req.body, {})
    .then(doc => {
        return res.jsonp(doc)
    })
    .catch(err => {
        return res.status(500).jsonp(err)
    })
    // .catch(err =>{
    //     return res.status(500).json(err)
    // })
})
//filter+ group by by post
router.post('/agg',(req,res) =>{
    if (!req.body)
    {
        return res.status(400).send("request boddy is missing!")
    }
    AccidentMoedel.aggregate(req.body)
    .then(doc => {
        return res.jsonp(doc)
    })
    .catch(err => {
        return res.status(500).jsonp(err)
    })
})

findByYear = (req, res) => {
    AccidentMoedel.find({ accident_year: req.query.year }, {})
        .then(doc => {
            return res.jsonp(doc)
        })
        .catch(err => {
            return res.status(500).jsonp(err)
        })
}

groupByYear = (req, res) => {
    AccidentMoedel.aggregate([
        {"$group" : {_id:"$accident_year", count:{$sum:1}}}
        ,{"$sort": { _id: 1}}
    ])
        .then(doc => {
            return res.jsonp(doc)
        })
        .catch(err => {
            return res.status(500).jsonp(err)
        })
}


// http://localhost:3000/person/mike
router.get('/person/:name', (req, res) => {
    res.send(`you asked for person ${req.params.name}`)
})

module.exports = router