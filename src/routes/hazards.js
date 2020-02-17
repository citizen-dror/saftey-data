let express = require ("express")
let HazardModel = require ("../models/hazard.model")
let router = express.Router()

//post new hazard
router.post('/',(req,res) =>{
    if (!req.body)
    {
        return res.status(400).send("request boddy is missing!")
    }
    let model = new HazardModel(req.body)
    model.save()
    .then (doc =>{
        if (!doc || doc.length === 0){
            return res.status(500).send(doc)
        }
        return res.status(200).send(doc)
    })
    .catch(err =>{
        return res.status(500).json(err)
    })
})

router.get ('/',(req,res) =>{
    HazardModel.find().limit(4)
    .then ( doc => {
        return res.jsonp(doc)
    })
    .catch (err => {
        return res.status(500).jsonp(err)
    })   
})

module.exports = router