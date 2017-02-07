/**
 * Created by orel- on 07/Feb/17.
 */
const mongoose = require('mongoose');
import KnbUser from './knb_user';
import Moder from './moder';
import uuidV1  from 'uuid/v1';
let LogSchema = new mongoose.Schema({
    'category': String,
    'type': String,
    'target': Number,
    'knb_user': {'type': Number, 'ref': 'KnbUser'},
    'moder': {'type': Number, 'ref': 'Moder'},
    'reason': String,
    'links': {
        '_self': String,
        'self': String,
        'parent': String,
        'knb_url': String,
    },
    'uuid': String,
    'created_at': {'type': Date, 'default': Date.now()},
});

var Log = mongoose.model('Log', LogSchema);

LogSchema.statics.addLog = Promise.method((logData) => {
    return KnbUser.findOne({'knb_id': logData.knb_user})
        .exec()
        .then((knb_user) => {
            if (!knb_user) {
                return new KnbUser({
                    'knb_id': logData.knb_user,
                }).save();
            }

            return knb_user;
        })
        .then((knb_user) => {
            if (!mongoose.Types.ObjectId.isValid(logData.moder)) {
                throw new Error('IncorrectMongooseId');
            }
            let uuid = uuidV1();

            let log = new Log({
                'category': logData.category,
                'type': logData.type,
                'target': logData.target,
                'knb_user': knb_user._id,
                'moder': logData.moder,
                'reason': logData.reason || null,
                'links': {
                    '_self': `/api/v1/logs/${uuid}`,
                    'self': `/logs/${uuid}`,
                    'parent': logData.parent,
                    'knb_url': logData.knb_url,
                },
                'uuid': uuid,
            });
            return log.save();
        });
});

module.exports = Log;
