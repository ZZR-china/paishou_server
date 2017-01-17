'use strict'

/* 一些查询限制和常量 */
const exp = {
    series: {
        isHot: {
            limit_def: 5,
            limit_max: 10,
        },
    },
    /* web缓存默认时效 单位秒 */
    webcache: {
        default_expire: 30,
    },
    order: {
        quantity: {
            max: 100
        },
        amount: {
            max: 15000
        }
    },
}

module.exports = exp
