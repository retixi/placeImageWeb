/**
 * Created by renxi on 2016/11/19.
 */
var mongojs = require('mongojs');
var db = mongojs('placeImage:p821161102@happyCoupon.zhihuazhang.net/placeImage',
    ['users', 'counters', 'posts','facilities']);

module.exports = {
    db: db,
    mongojs: mongojs
}
