import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IImage extends Document {
  filename: string;
  contentType: string;
  titlehe: string;
  texthe: string;
  titleen: string;
  texten: string;
  titlear: string;
  textar: string;
  place: string;
  tags: string[];
  index: number;
  createdAt: any;
  data: any;
}

const ImageSchema: Schema = new Schema({
  filename: { type: String, required: true, unique: true },
  contentType: { type: String, required: true },
  titlehe: { type: String },
  texthe: { type: String },
  titleen: { type: String },
  texten: { type: String },
  titlear: { type: String },
  textar: { type: String },
  place: { type: String },
  tags: { type: Array },
  index: { type: Number },
  createdAt: { type: Date, required: true, default: Date.now },
  data: { type: Buffer, required: true },
});
// Create the model
const ImageModel: Model<IImage> = mongoose.model<IImage>('Image', ImageSchema);
export default {ImageModel};
