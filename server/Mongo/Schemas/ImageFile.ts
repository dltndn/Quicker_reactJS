import mongoose from "mongoose";

const ImageFileSchema = new mongoose.Schema({
    image : Buffer,    
});

export default ImageFileSchema