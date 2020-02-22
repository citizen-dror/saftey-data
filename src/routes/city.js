let express = require("express")
let CityModel = require("../models/cities.model")
let router = express.Router()

//http://localhost:5000/api/v1/city
//http://localhost:5000/api/v1/city?name_he=חיפה
//http://localhost:5000/api/v1/city?name_en=Rehovot
router.get('/', (req, res) => {
    if (req.query.name_he) {
        findByNameHe(req, res)
    }
    else if (req.query.name_en) {
        findByNameEn(req, res)
    }
    else {
        findAll(req,res)
    }
    
})

findByNameHe = (req, res) => {
    console.log("name_he")
    CityModel.find({ name_he: req.query.name_he }, {})
        .then(doc => {
            return res.jsonp(doc)
        })
        .catch(err => {
            return res.status(500).jsonp(err)
        })
}
findByNameEn = (req, res) => {
    console.log("name_en")
    console.log(req.query.name_en)
    CityModel.find({ name_en: req.query.name_en }, {})
        .then(doc => {
            return res.jsonp(doc)
        })
        .catch(err => {
            return res.status(500).jsonp(err)
        })
}

findAll = (req, res) => {
    CityModel.find({}, {})
        .then(doc => {
            return res.jsonp(doc)
        })
        .catch(err => {
            return res.status(500).jsonp(err)
        })
}


//find city by post
router.post('/', (req, res) => {
    if (!req.body) {
        return res.status(400).send("request boddy is missing!")
    }
    CityModel.find(req.body, {})
        .then(doc => {
            return res.jsonp(doc)
        })
        .catch(err => {
            return res.status(500).jsonp(err)
        })
})


// http://localhost:3000/person/mike
router.get('/:name-he', (req, res) => {
    res.send(`you asked for city ${req.params.name}`)
})

module.exports = router