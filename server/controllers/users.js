const Subscription = require("../models/subscriptions")

require("dotenv").config()

exports.getUsers = async (req, res) => {
    try {
        const users = await Subscription.find()
        res.json(users).status(200)
    } catch (error) {
        res.json(error).status(500)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.query
        console.log(id)
        await Subscription.findOneAndDelete({ userId: id })
        //console.log(data)
        const users = await Subscription.find()
        res.json(users).status(200)
    } catch (error) {
        res.json(error).status(500)
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { userId, apiCallCount, city } = req.body
        await Subscription.findOneAndUpdate({ userId: userId }, { apiCallCount: apiCallCount, city: city }, { returnOriginal: false })
        //console.log(data)
        const users = await Subscription.find()
        res.json(users).status(200)
    } catch (error) {
        res.json(error).status(500)
    }
}