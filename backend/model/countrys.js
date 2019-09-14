const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
    name: { type: String },
    photos: [{ url: String }],
    description: { type: String }
});

module.exports = mongoose.model('country', CountrySchema);