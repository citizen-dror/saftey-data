import imageModel, { IImage } from './images.model';

const image_get_file = async (filename: string) =>{
    const file: IImage = await imageModel.ImageModel.findOne({ filename }).exec();
    return file;
}

const image_get_list = async (filter: any, projection: any) =>{
    const doc = await imageModel.ImageModel.find(filter, projection).sort({ index: 1 });
    return doc
}

const image_count = (filter: any) => imageModel.ImageModel.countDocuments(filter).exec();

export {image_get_file, image_get_list, image_count}