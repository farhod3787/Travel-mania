const mongoose = require('mongoose');

const HotelsSchema = mongoose.Schema({
    name: { type: String },
    photos: [{ url: String }],
    description: { type: String }
});

module.exports = mongoose.model('hotels', HotelsSchema);