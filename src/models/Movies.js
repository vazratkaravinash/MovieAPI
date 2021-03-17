const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name:  {
        unique: true,
        type : String,
        required: [true, 'name is required']
    },
    year: String,
    director: String    
});


module.exports = mongoose.model('movies', movieSchema);