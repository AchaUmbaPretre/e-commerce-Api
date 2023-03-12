import mongoose, { Mongoose, Schema } from "mongoose";

const Cartschema = new Schema (
    {
    userId : { type: String, required: true },
    products: [{
        productId: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1,
        }
    }]
},
{ timestamps : true}
);

export default mongoose.model('Cart', Cartschema)