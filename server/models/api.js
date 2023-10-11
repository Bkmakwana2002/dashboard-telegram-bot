
const mongoose = require('mongoose')

const apiSchema = mongoose.Schema(
    {
        RapidAPI_Key: { type: String, required: true },
        RapidAPI_Host: { type: String, required: true },
        time : {type : String, default : '30 2 * * *'}
    },
    { timestamps: true }
);

const API = mongoose.model("API", apiSchema);
module.exports = API;
