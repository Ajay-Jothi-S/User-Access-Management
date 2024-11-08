const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    softwareId: { type: mongoose.Schema.Types.ObjectId, ref: 'Software', required: true },
    accessType: { type: String },
    reason: String,
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
});

module.exports = mongoose.model('Request', RequestSchema);
