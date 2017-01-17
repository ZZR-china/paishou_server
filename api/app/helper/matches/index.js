'use script'

const lightco = require('lightco')
const logger = log4js.getLogger('routes-matches')

const toInt = Utils.toInt
const invalidDate = Utils.invalidDate

const matches = {}

const { Matches,
        Orders,
        Organizers, } = Models


//参加赛事
matches.join = (req, res) => {
    lightco.run(function *($) {
        const id = toInt(req.params.id)
        const quantity = toInt(req.body.quantity)
        const user = req.user

        const ORDER_QUANTITY_MAX = Conf.const.order.quantity.max
        const ORDER_AMOUNT_MAX = Conf.const.order.amount.max

        try {
            if (!quantity) {
                return Handle.error(res, '1030', 400)
            }

            if (!user.realName || !user.idCard) {
                return Handle.error(res, '2000', 403)
            }

            if (quantity === 0) {
                return Handle.error(res, '2001', 400)
            }

            if (quantity > ORDER_QUANTITY_MAX) {
                return Handle.error(res, '2002', 403)
            }

            let matchOpts = {
                attributes: ['publishState','name','unitPrice','matchDay','closeRegTime','organizersId'],
                include: [{
                    model: Organizers,
                    attributes: ['id','name'],
                }],
                where: {id: id},
            }

            var [err, match] = yield Matches.findOne(matchOpts)
            if (err) throw err

            if (match === null) {
                return Handle.error(res, '2003', 400)
            }

            if (match.publishState !== 2) {
                return Handle.error(res, '2003', 403)
            }

            //单价
            const unitPrice = match.unitPrice

            if (unitPrice === null) {
                throw new Error(`matchesId:${id} 无效的价格!`)
            }

            //比赛日期
            const day = match.matchDay
            //结束时间
            const close = match.closeRegTime
            //停止售票时间
            let end = new Date(`${day} ${close}`)

            if (invalidDate(end)) {
                return Handle.error(res, '2003', 403)
            }

            let now = new Date()
            if (now.getTime() > end.getTime()) {
                return Handle.error(res, '2003', 403)
            }

            //商品总价
            const amount = unitPrice * quantity

            if (amount > ORDER_AMOUNT_MAX) {
                return Handle.error(res, '2004', 403)
            }
            //商品描述
            const desc = `${match.organizer.name} <${match.name}> * ${quantity}`

            const orderInfo = {
                orderNumber: Utils.orderId(),
                quantity: quantity,
                amount: amount,
                havePayed: false,
                desc: desc,
                matchesId: id,
                organizersId: match.organizer.id,
                usersId: user.id,
            }

            var [err, order] = yield Orders.create(orderInfo)
            if (err) throw err

            let json = {
                orderId: order.id
            }

            return Handle.success(res, json)

        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}


module.exports = matches
