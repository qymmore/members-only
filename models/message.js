const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {DateTime} = require('luxon');

const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: "User", required: true
    },
    text: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 200
    },
    time: {
        type: Date,
        default: Date.now,
        required: true
    }
});

MessageSchema.virtual('date').get(function() {
    return DateTime.fromJSDate(this.time).toFormat("yyyy-MM-dd, HH:mm");
});

module.exports = mongoose.model('Message', MessageSchema);
