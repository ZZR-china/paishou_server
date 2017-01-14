'use script'

const lightco = require('lightco')
const logger = log4js.getLogger('routes-series-payInfo')

const toInt = Utils.toInt
const webcache = Services.cache.webcache


const { Casinos,
        Matches,
        MatchTypes,
        Organizers,
        Series, } = Models

//一票通付款信息
exports.oneTicket = (req, res) => {
    lightco.run(function *($) {
        const id = req.params.id

        try {
            const opts = {
                include: [{
                    model: Casinos,
                    attributes: ['address'],
                }, {
                    model: Matches,
                    attributes: [
                        'rakeBuyin',
                        'realBuyin',
                        'absDiscount',
                        'relDiscount',
                        'unitPrice',
                    ],
                    where: {isOneTicketMatch: 1}
                }],
                where: {id: id},
            }

            var [err, oneTicketInfo] = yield Series.scope('default').findOne(opts)
            if (err) throw err

            if (oneTicketInfo === null) {
                return Handle.error(res, '0', 403)
            }
            else {
                yield webcache.set(req, JSON.stringify(oneTicketInfo), $)

                return Handle.success(res, oneTicketInfo)
            }
        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}

//常规付款信息
exports.regular = (req, res) => {
    lightco.run(function *($) {
        const id = req.params.id

        try {
            const opts = {
                include: [{
                    model: Organizers,
                    attributes: [],
                    include: [{
                        model: Casinos,
                        attributes: [
                            sequelize.literal('`organizer.casino`.`address` AS `address`'),
                        ],
                    }]
                }],
                where: {id: id},
                raw: true,
            }

            var [err, regularInfo] = yield Matches.scope('regular').findOne(opts)
            if (err) throw err

            delete regularInfo['organizer.casino.id']

            if (regularInfo === null) {
                return Handle.error(res, '0', 403)
            }
            else {
                yield webcache.set(req, JSON.stringify(regularInfo), $)

                return Handle.success(res, regularInfo)
            }
        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}
