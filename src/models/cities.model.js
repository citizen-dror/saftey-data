let mongoose  = require ('mongoose')

let CitySchema = mongoose.Schema({
    _id: String, 
    id_osm:String,
    lat:String,
    lon:String,
    name:String,
    name_he:String,
    name_en:String,
    name_ar:String
})
module.exports = mongoose.model('City', CitySchema)