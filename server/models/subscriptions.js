
const mongoose = require('mongoose')

const subscriptionSchema = mongoose.Schema(
  {
    userId: { type: Number, required: true },
    city: { type: String, required: true },
    apiCallCount: { type: Number, default: 0 },
  },
  { timestamps: true } 
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
