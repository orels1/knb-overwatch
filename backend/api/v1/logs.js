/**
 * Created by orel- on 07/Feb/17.
 */
/**
 * Configuration backend, used to save tokens and other sensitive data
 */

import express from 'express';
let router = express.Router();
import Log from 'models/log';

/**
 * @apiDefine LogRequestSuccess
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {String} results._id Id of the log entry in DB
 * @apiSuccess (200) {String} results.category Log category
 * @apiSuccess (200) {String} results.type Log type
 * @apiSuccess (200) {Number} results.target Log target
 * @apiSuccess (200) {Object} results.knb_user Affected knb user document
 * @apiSuccess (200) {Object} results.mod Responsible mod document
 * @apiSuccess (200) {String} results.reason Log reason
 * @apiSuccess (200) {Object} results.links Relevant links
 * @apiSuccess (200) {String} results.links._self This log entry API url
 * @apiSuccess (200) {String} results.links.self This log entry web url
 * @apiSuccess (200) {String} results.links.parent This log entry parent url
 * @apiSuccess (200) {String} results.links.knb_url This log target knb url
 * @apiSuccess (200) {String} results.uuid Unique id for log manipulation
 * @apiSuccess (200) {String} results.created_at Log creation date
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *                  "_id": "21fsdkg9342ijhgh9sf0234",
 *                  "__v": 0,
 *                  "category": "comments",
 *                  "type": "delete",
 *                  "target": 221548,
 *                  "knb_user": {
 *                      "username": "Darklifeness",
 *                      "knb_id": 546821,
 *                      ...
 *                      "updated_at", "Tue Feb 07 2017 11:35:19 GMT+0300 (Russia TZ 2 Standard Time)"
 *                  },
 *                  "mod": {
 *                      "username": "hard.o",
 *                      "knb_username": "hard.o",
 *                      "knb_id": 546821,
 *                      ...
 *                      "updated_at", "Tue Feb 07 2017 11:35:19 GMT+0300 (Russia TZ 2 Standard Time)"
 *                  },
 *                  "reason": "Time to end this!",
 *                  "links": {
 *                      "_self": "/api/v1/logs/6c84fb90-12c4-11e1-840d-7b25c5ee775a",
 *                      "self": "/logs/6c84fb90-12c4-11e1-840d-7b25c5ee775a",
 *                      "parent": "/news/pora-banit-ih-vseh-665421",
 *                      "knb_url": "/news/pora/banit-ih-vseh-645122/#c548213
 *                  }
 *                  "uuid": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
 *                  "created_at": "Tue Feb 07 2017 11:35:19 GMT+0300 (Russia TZ 2 Standard Time)"
 *              }
 *      }
 */

/**
 * @api {get} /logs/ List all logs
 * @apiVersion 0.1.0
 * @apiName getLogsList
 * @apiGroup logs
 *
 * @apiHeader {string} Authorization JWT-based auth token
 *
 * @apiDescription Supports `limit` and `offset` query parameters. Default values are `limit=20` `offset=0`
 *
 * @apiUse DBError
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {Array} results.list List of entries
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *                  "list": [
 *                      {
 *                          "_id": "21fsdkg9342ijhgh9sf0234",
 *                          "__v": 0,
 *                          "category": "comments",
 *                          "type": "delete",
 *                          "target": 221548,
 *                          "knb_user": {
 *                              "username": "Darklifeness",
 *                              "knb_id": 546821,
 *                              ...
 *                              "updated_at", "Tue Feb 07 2017 11:35:19 GMT+0300 (Russia TZ 2 Standard Time)"
 *                          },
 *                          "mod": {
 *                              "username": "hard.o",
 *                              "knb_username": "hard.o",
 *                              "knb_id": 546821,
 *                              ...
 *                              "updated_at", "Tue Feb 07 2017 11:35:19 GMT+0300 (Russia TZ 2 Standard Time)"
 *                          },
 *                          "reason": "Time to end this!",
 *                          "links": {
 *                              "_self": "/api/v1/logs/6c84fb90-12c4-11e1-840d-7b25c5ee775a",
 *                              "self": "/logs/6c84fb90-12c4-11e1-840d-7b25c5ee775a",
 *                              "parent": "/news/pora-banit-ih-vseh-665421",
 *                              "knb_url": "/news/pora/banit-ih-vseh-645122/#c548213
 *                          }
 *                          "uuid": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
 *                          "created_at": "Tue Feb 07 2017 11:35:19 GMT+0300 (Russia TZ 2 Standard Time)"
 *                      }
 *                  ]
 *              }
 *      }
 */
router.get('/', (req, res) => {
    Log.find({})
        .exec()
        .then((logs) => {
            return res.status(200).send({
                'error': false,
                'results': {
                    'list': logs,
                },
            });
        })
        .catch((err) => {
            throw err;
        });
});

/**
 * @api {post} /logs/ Creates log
 * @apiVersion 0.1.0
 * @apiName postLog
 * @apiGroup logs
 *
 * @apiHeader {string} Authorization JWT-based auth token
 *
 * @apiParam {String} category Log category
 * @apiParam {String} type Log type
 * @apiParam {Number} knb_user KNB user id
 * @apiParam {String} mod Mod db id
 * @apiParam {Number} target Affected object knb id
 * @apiParam {String} reason Log reason
 * @apiParam {String} parent Log parent url
 * @apiParam {String} knb_url Log target knb url
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "category": "comments",
 *          "type": "delete",
 *          "knb_user": 123365,
 *          "mod": "jfu29dsfs3263242fs",
 *          "target": 221548,
 *          "reason": "It was about time",
 *          "parent": "/news/pora-banit-ih-vseh-665421",
 *          "knb_url": "/news/pora/banit-ih-vseh-645122/#c548213,
 *      }
 *
 * @apiUse DBError
 * @apiUse LogRequestSuccess
 * @apiUse IncorrectMongooseId
 *
 */
router.post('/', (req, res) => {
    // Check if we have that entry already
    Log.addLog(req.body)
        .then((log) => {
            return res.status(200).send({
                'error': false,
                'results': log,
            });
        })
        .catch((err) => {
            throw err;
        });
});

/**
 * @api {get} /logs/:uuid Get log by uuid
 * @apiVersion 0.1.0
 * @apiName getLog
 * @apiGroup logs
 *
 * @apiHeader {string} Authorization JWT-based auth token
 *
 * @apiParam {String} uuid Uuid of the log to get
 *
 * @apiUse DBError
 * @apiUse LogRequestSuccess
 * @apiUse EntryNotFound
 */
router.get('/:uuid', (req, res) => {
    Log.findByUuid(req.params.uuid)
        .then((log) => {
            if (!log) throw new Error('EntryNotFound');
            res.status(200).send({
                'error': false,
                'results': log,
            });
        })
        .catch((err) => {
            throw err;
        });
});

/**
 * @api {put} /logs/:uuid Update log
 * @apiVersion 0.1.0
 * @apiName putLog
 * @apiGroup logs
 *
 * @apiHeader {string} Authorization JWT-based auth token
 *
 * @apiParam {String} uuid Uuid of the log to update
 *
 * @apiParam {String} category Log category
 * @apiParam {String} type Log type
 * @apiParam {Number} knb_user KNB user id
 * @apiParam {String} mod Mod db id
 * @apiParam {Number} target Affected object knb id
 * @apiParam {String} reason Log reason
 * @apiParam {String} parent Log parent url
 * @apiParam {String} knb_url Log target knb url
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "category": "comments",
 *          "type": "delete",
 *          "knb_user": 123365,
 *          "mod": "jfu29dsfs3263242fs",
 *          "target": 221548,
 *          "reason": "It was about time",
 *          "parent": "/news/pora-banit-ih-vseh-665421",
 *          "knb_url": "/news/pora/banit-ih-vseh-645122/#c548213,
 *      }
 *
 *
 * @apiUse DBError
 * @apiUse logRequestSuccess
 * @apiUse IncorrectMongooseId
 * @apiUse EntryNotFound
 */
router.put('/:uuid', (req, res) => {
    Log.updateByUuid(req.params.uuid, req.body)
        .then((log) => {
            res.status(200).send({
                'error': false,
                'results': log,
            });
        })
        .catch((err) => {
            throw err;
        });
});

/**
 * @api {delete} /logs/:uuid Delete log entry by id
 * @apiVersion 0.1.0
 * @apiName deleteLog
 * @apiGroup logs
 *
 * @apiHeader {string} Authorization JWT-based auth token
 *
 * @apiParam {String} uuid Uuid of the log to delete
 *
 * @apiUse DBError
 * @apiUse EntryNotFound
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {}
 *      }
 */
router.delete('/:uuid', (req, res) => {
    Log.deleteByUuid(req.params.uuid)
        .then(() => {
            return res.status(200).send({
                'error': false,
                'results': {},
            });
        })
        .catch((err) => {
            throw err;
        });
});

export {router};
