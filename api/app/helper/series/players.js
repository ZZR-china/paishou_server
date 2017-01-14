'use script'

const lightco = require('lightco')
const logger = log4js.getLogger('routes-series-players')

const toInt = Utils.toInt
const webcache = Services.cache.webcache


const { Countries,
        MatchResults,
        PromotionResults,
        Players, } = Models


//晋级人员名单
exports.promotion = (req, res) => {
    lightco.run(function *($) {
        const id = req.params.id

        try {
            const opts = {
                include: [{
                    model: Players, required: true,
                    attributes: [],
                    include: [{
                        model: Countries,
                        attributes: [
                            sequelize.literal('`player.country`.`name` AS `country`'),
                        ],
                    }],
                }],
                attributes: ['name', 'stack', 'table', 'seat'],
                order: [['seat', req.query.order || 'DESC']],
                where: {matches_id: id},
                raw: true,
            }

            var [err, result] = yield PromotionResults.findAndCountAll(opts)
            if (err) throw err

            result.rows.forEach(function(item) {
                 delete item['player.country.id']
            })

            yield webcache.set(req, JSON.stringify(result), $)

            return Handle.success(res, result)

        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}

//结果人员名单
exports.result = (req, res) => {
    lightco.run(function *($) {
        const id = req.params.id

        try {
            const opts = {
                include: [{
                    model: Players, required: true,
                    attributes: [],
                    include: [{
                        model: Countries,
                        attributes: [
                            sequelize.literal('`player.country`.`name` AS `country`'),
                        ],
                    }],
                }],
                attributes: ['rank', 'name', 'bonus'],
                order: [['rank', req.query.order || 'DESC']],
                where: {matches_id: id},
                raw: true,
            }

            var [err, result] = yield MatchResults.findAndCountAll(opts)
            if (err) throw err

            result.rows.forEach(function(item) {
                 delete item['player.country.id']
            })

            yield webcache.set(req, JSON.stringify(result), $)

            return Handle.success(res, result)

        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}
