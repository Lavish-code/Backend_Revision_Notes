import mongoose from "mongoose";
import { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    subscriber :{
        type: Schema.Types.ObjectId, //one who is susbcribing
        ref:"User"
    },
    channel :{
        type :Schema.Types.ObjectId, //one to whom subscribing
        ref : "User"
    }
},{
    timestamps:true
})

 
export const Subscription = mongoose.model("Subscription",subscriptionSchema )