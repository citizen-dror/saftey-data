let express = require("express")
let CityModel = require("../models/cities.model")
let router = express.Router()

//http://localhost:5000/api/v1/city
//http://localhost:5000/api/v1/city?name_he=חיפה
//http://localhost:5000/api/v1/city?name_en=Rehovot
//http://localhost:5000/api/v1/city?lang=he
router.get('/', (req, res) => {
    if (req.query.lang) {
        findFilterBylang(req, res)
    }
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

findFilterBylang = (req, res) => {
    let proj ={};
    if(req.query.lang == "he")
         proj= {name_he: 1}
    else if(req.query.lang == "ar")
         proj= {name_ar: 1}
    else
         proj= {name_en: 1}    
    CityModel.find({}, proj)
        .then(doc => {
            // let arr = doc.map(x =>  {return ("\"" + x.name_he + "\"" )})
            // saveAsfile(arr)
            return res.jsonp(doc)
        })
        .catch(err => {
            return res.status(500).jsonp(err)
        })
}

findByNameHe = (req, res) => {
    CityModel.find({ name_he: req.query.name_he }, {})
        .then(doc => {
            return res.jsonp(doc)
        })
        .catch(err => {
            return res.status(500).jsonp(err)
        })
}
findByNameEn = (req, res) => {
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
//helper function to save json to json file
saveAsfile = (jsonData) =>{
    var fs = require('fs');
    fs.writeFile("test.txt", jsonData, function(err) {
        if (err) {
            console.log(err);
        }
    });
}


// http://localhost:3000/person/mike
router.get('/:name-he', (req, res) => {
    res.send(`you asked for city ${req.params.name}`)
})

module.exports = router