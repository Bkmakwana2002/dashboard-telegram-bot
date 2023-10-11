const API = require("../models/api")

require("dotenv").config()

exports.getAPI = async (req, res) => {
    try {
        const doc = await API.find()
        res.json(doc).status(200)
    } catch (error) {
        res.json(error).status(500)
    }
}


exports.updateAPI = async (req, res) => {
    try {
        const { prevKey,key,host,time } = req.body
        await API.findOneAndUpdate({ RapidAPI_Key: prevKey }, { RapidAPI_Key: key, RapidAPI_Host: host,time:time }, { returnOriginal: false })

        const doc = await API.find()
        res.json(doc).status(200)
    } catch (error) {
        res.json(error).status(500)
    }
}