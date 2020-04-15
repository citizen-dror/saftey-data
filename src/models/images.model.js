let mongoose  = require ('mongoose')

let ImageSchema = mongoose.Schema(
    { img: { data: Buffer, contentType: String }
    }
)
module.exports = mongoose.model('Image', ImageSchema)