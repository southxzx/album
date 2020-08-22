const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
});

const Material = mongoose.model('Material', materialSchema);

module.exports = { Material }