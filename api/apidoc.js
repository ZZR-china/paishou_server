/**
 * @apiDefine Error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500
 *     {
 *       "error": "系统繁忙，请稍后再试"
 *     }
 */


 /**
  * @apiDefine Success
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "message": '请求成功',
  *     }
  */


/**
 * @apiDefine Header
 *
 * @apiHeader {String} authorization 用户标识
 *
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      'authorization': 'Bearer {token}'
 *    }
 */
