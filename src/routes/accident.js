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
        AccidentMoedel.find({}, { latitude: 1, longitude: 1, accident_year: 1 })
            .then(doc => {
                return res.jsonp(doc)
            })
            .catch(err => {
                return res.status(500).jsonp(err)
            })
    }
})

//find accident by post
router.post('/', (req, res) => {
    findByFilter(req, res, {})
})
router.post('/latlon', (req, res) => {
    findByFilter(req, res, { latitude: 1, longitude: 1 , injury_severity_hebrew: 1})
})
router.post('/main', (req, res) => {
    const proj = {
        latitude: 1, longitude: 1,
        accident_timestamp: 1, day_in_week_hebrew: 1, day_night_hebrew: 1, accident_year: 1,
        injured_type_hebrew: 1, injury_severity_hebrew: 1, vehicle_vehicle_type_hebrew: 1, sex_hebrew: 1, age_group_hebrew: 1, population_type_hebrew: 1,
        accident_yishuv_name: 1, street1_hebrew: 1, street2_hebrew: 1, road_segment_name: 1, road_type_hebrew: 1, accident_type_hebrew: 1,
        speed_limit_hebrew: 1, multi_lane_hebrew: 1, one_lane_hebrew: 1, road_width_hebrew: 1
    }
    findByFilter(req, res, proj)
})

findByFilter = (req, res, proj) => {
    if (!req.body) {
        return res.status(400).send("request boddy is missing!")
    }
    AccidentMoedel.find(req.body, proj)
        .then(doc => {
            return res.jsonp(doc)
        })
        .catch(err => {
            return res.status(500).jsonp(err)
        })
}
//count by query
router.post('/count', (req, res) => {
    if (!req.body) {
        return res.status(400).send("request boddy is missing!")
    }
    AccidentMoedel.count(req.body)
        .then(doc => {
            return res.jsonp(doc)
        })
        .catch(err => {
            return res.status(500).jsonp(err)
        })
})

//filter+ group by by post
router.post('/agg', (req, res) => {
    if (!req.body) {
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
        { "$group": { _id: "$accident_year", count: { $sum: 1 } } }
        , { "$sort": { _id: 1 } }
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