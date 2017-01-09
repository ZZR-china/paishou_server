'use strict'

/* 一些查询限制和常量 */
const exp = {
    series: {
        isHot: {
            limit_def: 5,
            limit_max: 10,
        },
        calendar: {
            limit_def: 10,
            limit_max: 15,
        }
    },
    /* web缓存默认时效 单位秒 */
    webcache: {
        default_expire: 30,
    },
    big: {
        tour: {
            limit_def: 5,
			limit_max: 10
        },
        serie: {
			limit_def: 5,
			limit_max: 15
		},
        match: {
            limit_def: 5,
			limit_max: 10,
            order_amount_max: 100,
            order_total_max: 15000
        }
    },
    daily: {
        serie: {
			limit_def: 5,
			limit_max: 10
		},
        match: {
            limit_def: 5,
			limit_max: 10,
            order_amount_max: 100,
            order_total_max: 10000
        }
    },
    order: {
        limit_def: 5,
        limit_max: 10
    },
    ticket: {
        limit_def: 5,
        limit_max: 10
    },
    business: {
        limit_def: 8,
        limit_max: 15
    }
}

module.exports = exp
