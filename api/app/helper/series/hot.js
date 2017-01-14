'use script'

const moment = require('moment')
const lightco = require('lightco')
const logger = log4js.getLogger('routes-series-hot')

const toInt = Utils.toInt
const webcache = Services.cache.webcache


const { Countries,
        Cities,
        Casinos,
        Series,
        SerieImages, } = Models


//热门赛事列表
exports.list = (req, res) => {
    lightco.run(function *($) {
        const DEF = Conf.const.series.isHot.limit_def
        const MAX = Conf.const.series.isHot.limit_max
        const timeline = new Date(moment().subtract(3, 'days'))

        try {
            const opts = {
              include: [{
                model: Casinos,
                attributes: [],
                include: [{
                  model: Countries,
                  attributes: [
                      sequelize.literal('`casino.country`.`name` AS `country`'),
                  ],
                }, {
                  model: Cities,
                  attributes: [
                      sequelize.literal('`casino.city`.`name` AS `city`'),
                  ]
                }]
              }],
              order: [['hotLevel', 'ASC'], ['startDate', 'ASC']],
              offset: toInt(req.query.offset, 0),
              limit: toInt(req.query.limit, DEF),
              where: {
                  is_hot: 1,
                  end_date: {$gte: timeline},
                  publish_state: {$ne: 0},
              },
              raw: true,
            }

            opts.limit = opts.limit > MAX ? MAX : opts.limit

            var [err, result] = yield Series.scope('hot').findAndCountAll(opts)
            if (err) throw err

            result.rows.forEach(function(item) {
                 delete item['casino.city.id']
                 delete item['casino.country.id']
            })


            yield webcache.set(req, JSON.stringify(result), $)

            return Handle.success(res, result)

        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}

//热门赛事介绍
exports.introduce = (req, res) => {
    lightco.run(function *($) {
        const id = req.params.id

        try {
            const opts = {
                include: [{
                  model: Casinos,
                  attributes: ['address'],
                }, {
                  model: SerieImages,
                  attributes: [['image_url', 'url']],
                }],
                where: {id: id},
            }

            var [err, result] = yield Series.scope('introduce').findOne(opts)
            if (err) throw err

            if (result === null) {
                return Handle.error(res, '0', 403)
            }
            else {
                yield webcache.set(req, JSON.stringify(result), $)

                return Handle.success(res, result)
            }
        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}
