const mongoose = require('mongoose');
/* Define Fields that schema has */
const ListSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

const List = mongoose.model('List', ListSchema);

module.exports = { List }