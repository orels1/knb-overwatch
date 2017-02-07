/**
 * Created by orel- on 07/Feb/17.
 */
/**
 * Created by orel- on 07/Feb/17.
 */
const mongoose = require('mongoose');

let ModerSchema = new mongoose.Schema({
    'username': String,
    'knb_username': String,
    'knb_id': Number,
    'slack_name': String,
    'email': String,
    'password': String,
    'links': {
        '_self': String,
        'self': String,
        '_logs': String,
        'knb_url': String,
    },
    'roles': [String],
    'created_at': {'type': Date, 'default': Date.now()},
});

module.exports = mongoose.model('Moder', ModerSchema);
