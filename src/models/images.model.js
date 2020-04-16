let mongoose  = require ('mongoose')

let ImageSchema = mongoose.Schema({ 
    filename:String,
    contentType: String,
    title: String,
    data: Buffer
})
module.exports = mongoose.model('Image', ImageSchema)