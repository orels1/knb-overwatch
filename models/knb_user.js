/**
 * Created by orel- on 07/Feb/17.
 */
/**
 * Created by orel- on 07/Feb/17.
 */
const mongoose = require('mongoose');

let KnbUserSchema = new mongoose.Schema({
    'username': String,
    'knb_username': String,
    'knb_id': Number,
    'links': {
        '_self': String,
        'self': String,
        '_logs': String,
        'knb_url': String,
    },
    'names': [String],
    'parsed': {'type': Boolean, 'default': false},
    'created_at': {'type': Date, 'default': new Date()},
    'updated_at': {'type': Date, 'default': new Date()},
});

module.exports = mongoose.model('KnbUser', KnbUserSchema);
