import mongoose, { Mongoose, Schema } from "mongoose";

const Productschema = new Schema (
    {
    title : { type: String, required: true, unique: true },
    desc : { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
},
{ timestamps : true }
);

export default mongoose.model('Product', Productschema)