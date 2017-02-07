/**
 * Created by orel- on 07/Feb/17.
 */
/**
 * @apiDefine EntryNotFound
 *
 * @apiError (404) {Object} EntryNotFound
 *
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 NotFound
 *      {
 *          "error": "EntryNotFound",
 *          "error_details": "Requested entry is not found",
 *          "results": {}
 *      }
 */

/**
 * @apiDefine EntryExists
 * @apiError (400) {Object} EntryExists entry is already in DB
 * @apiVersion 0.2.0
 *
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 400 BadRequest
 *      {
 *          "error": "ExtryExists",
 *          "error_details": "This db entry already exists",
 *          "results": {"link": "/api/v1/repo/orels1/ORELS-Cogs"}
 *      }
 */

/**
 * @apiDefine DBError
 *
 * @apiError (500) {Object} DBError
 *
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 500 InternalServerError
 *      {
 *          "error": "DBError",
 *          "error_details": "some DBError description",
 *          "error_id": "sdf49824651dfs4rf9283",
 *          "results": {}
 *      }
 */

/**
 * @apiDefine IncorrectMongooseId
 *
 * @apiError (400) {Object} IncorrectMongooseId
 *
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 400 BadRequest
 *      {
 *          "error": "IncorrectMongooseId",
 *          "error_details": "Provided database ID is mailformed",
 *          "error_id": "sdf49824651dfs4rf9283",
 *          "results": {}
 *      }
 */


