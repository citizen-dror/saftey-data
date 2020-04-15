let express = require("express")
let AccidentMoedel = require("../models/accidents.model")
const cache = require('../middlewares/cache')
let router = express.Router()
const isUseCache = false

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
router.post('/',  (req, res, next) => { controller(req, res, next, "all") }
)
router.post('/latlon',  (req, res, next) => { controller(req, res, next, "latlon") }
    )

router.post('/main',
    (req, res, next) => { controller(req, res, next, "main") }
)

controller = async (req, res, next, type) => {
    inputValidations(req, res, next);
    let data = null;
    if (isUseCache) 
        data = await cache.getRes(req)
    if (data === null) {
        const proj = getProjByType(type)
        data = await queryDB(res, req.body, proj, type)
    }
    if (data !== null && isUseCache) {
        cache.setRes(req, data);
    }
    responseHandler(res, data);
}
getProjByType = (type) =>{
    let proj = {}
    if (type === "main")
        proj ={
            latitude: 1, longitude: 1,
            accident_timestamp: 1, day_in_week_hebrew: 1, day_night_hebrew: 1, accident_year: 1,
            injured_type_hebrew: 1, injury_severity_hebrew: 1, vehicle_vehicle_type_hebrew: 1, sex_hebrew: 1, age_group_hebrew: 1, population_type_hebrew: 1,
            accident_yishuv_name: 1, street1_hebrew: 1, street2_hebrew: 1, road_segment_name: 1, road_type_hebrew: 1, accident_type_hebrew: 1,
            speed_limit_hebrew: 1, multi_lane_hebrew: 1, one_lane_hebrew: 1, road_width_hebrew: 1
        }
    else if (type === "latlon") 
        proj ={ latitude: 1, longitude: 1, injury_severity_hebrew: 1 }  
    return proj;    
}
inputValidations = (req, res, next) => {
    if (!req.body) {
        return res.status(400).send("request boddy is missing!")
    }
}
queryDB = async (res, conditions, proj, label) => {
    try {
        console.time(label)
        const data = await AccidentMoedel.find(conditions, proj)
        console.timeEnd(label);
        return data;
    }
    catch (e) {
        res.status(500).jsonp(err)
    }
}

findByFilter_old = (req, res, next, proj, label) => {
    if (!req.body) {
        return res.status(400).send("request boddy is missing!")
    }
    console.time(label)
    AccidentMoedel.find(req.body, proj)
        .then(doc => {
            cache.set1(req, doc);
            console.timeEnd(label);
            return res.jsonp(doc)
        })
        .catch(err => {
            return res.status(500).jsonp(err)
        })
}

findByFilter = async (req, res, next, proj, label) => {
    if (!req.body) {
        return res.status(400).send("request boddy is missing!")
    }
    try {
        console.time(label)
        const data = await AccidentMoedel.find(req.body, proj)
        cache.set1(req, data);
        console.timeEnd(label);
        res.jsonp(data)
    }
    catch (e) {
        res.status(500).jsonp(err)
    }
    // finally{
    //     next()
    // }
}
responseHandler = (res, data) => {
    res.status(200).jsonp(data)
}

//count by query
router.post('/count', (req, res) => {
    if (!req.body) {
        return res.status(400).send("request boddy is missing!")
    }
    AccidentMoedel.countDocuments(req.body)
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