const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    otherName: {
        type: String,
        trim: true
    },
    idNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true
    },
    stateOfOrigin: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Student', studentSchema);
