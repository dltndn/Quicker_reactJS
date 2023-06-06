import mongoose from "mongoose";

const ImageFileSchema = new mongoose.Schema({
    image : Buffer,    
    reason : String
});

export default ImageFileSchema