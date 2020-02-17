let mongoose = require ("mongoose")

let HazardSchema = mongoose.Schema({ 
    name: String, 
    status: String,
    // type: String,
    lat: Number, 
    lon:Number 
})

module.exports = mongoose.model('Hazard', HazardSchema)