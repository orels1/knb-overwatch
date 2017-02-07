/**
 * Created by orel- on 07/Feb/17.
 */
const mongoose = require('mongoose');
import KnbUser from './knb_user';
import Mod from './mod';
import uuidV1  from 'uuid/v1';
import {extend} from 'underscore';
import Promise from 'bluebird';

let LogSchema = new mongoose.Schema({
    'category': String,
    'type': String,
    'target': Number,
    'knb_user': {'type': mongoose.Schema.Types.ObjectId, 'ref': 'KnbUser'},
    'mod': {'type': mongoose.Schema.Types.ObjectId, 'ref': 'Mod'},
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


LogSchema.statics.addLog = Promise.method(function(logData) {
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
            if (!mongoose.Types.ObjectId.isValid(logData.mod)) {
                throw new Error('IncorrectMongooseId');
            }
            let uuid = uuidV1();

            return new this({
                'category': logData.category,
                'type': logData.type,
                'target': logData.target,
                'knb_user': knb_user._id,
                'mod': logData.mod,
                'reason': logData.reason || null,
                'links': {
                    '_self': `/api/v1/logs/${uuid}`,
                    'self': `/logs/${uuid}`,
                    'parent': logData.parent,
                    'knb_url': logData.knb_url,
                },
                'uuid': uuid,
            }).save();
        });
});

LogSchema.statics.findByUuid = Promise.method(function(uuid) {
    return this.findOne({'uuid': uuid}).populate('knb_user mod').exec();
});

LogSchema.statics.updateByUuid = Promise.method(function(uuid, data) {
    return this.findOne({'uuid': uuid})
        .exec()
        .then((log) => {
            if (!log) throw new Error('EntryNotFound');
            extend(log, data);
            return log.save();
        });
});

LogSchema.statics.deleteByUuid = Promise.method(function(uuid) {
    return this.findOne({'uuid': uuid}).exec()
        .then((log) => {
            if (!log) throw new Error('EntryNotFound');
            return log.remove();
        });
});

export default mongoose.model('Log', LogSchema);
