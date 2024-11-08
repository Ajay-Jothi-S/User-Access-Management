const mongoose = require('mongoose');

const SoftwareSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    accessLevels: [String]
});

module.exports = mongoose.model('Software', SoftwareSchema);
