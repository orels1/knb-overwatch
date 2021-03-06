/**
 * Created by orel- on 07/Feb/17.
 */
/**
 * Created by orel- on 07/Feb/17.
 */
const mongoose = require('mongoose');
import * as jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import passportLocalMongoose from 'passport-local-mongoose';

let ModSchema = new mongoose.Schema({
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
    'token': String,
});

ModSchema.statics.sign = Promise.method(function(user) {
    user.token = jwt.sign({'id': user._id, 'roles': user.roles}, process.env.JWT_SECRET, {'expiresIn': '365d'});
    return user.save();
});

ModSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Mod', ModSchema);
