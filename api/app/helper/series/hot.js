'use script'

const lightco = require('lightco')
const moment = require('moment')
const logger = log4js.getLogger('routes-series-hot')

const toInt = Utils.toInt
const webcache = Services.cache.webcache


const { Countries,
        Cities,
        Casinos,
        Series,
        Serie_images, } = Models


//热门赛事列表
exports.list = (req, res) => {
    lightco.run(function *($) {
        const DEF = Conf.const.series.isHot.limit_def
        const MAX = Conf.const.series.isHot.limit_max
        const timeline = new Date(moment().subtract(3, 'days'))

        try {
            const opts = {
              include: [{
                model: Casinos, required: true,
                attributes: [],
                include: [{
                  model: Countries, required: true,
                  attributes: [
                      sequelize.literal('`casino.country`.`name` AS `country`'),
                  ],
                }, {
                  model: Cities, required: true,
                  attributes: [
                      sequelize.literal('`casino.city`.`name` AS `city`'),
                  ]
                }]
              }],
              order: [['hot_level', 'ASC'], ['start_date', 'ASC']],
              offset: toInt(req.query.offset, 0),
              limit: toInt(req.query.limit, DEF),
              where: {
                  is_hot: 1,
                  end_date: {$gte: timeline},
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

            if (result.count === 0) {
                return Handle.success(res, 0, 204)
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

//热门赛事介绍
exports.introduce = (req, res) => {
    lightco.run(function *($) {
        const id = req.params.id
        console.log(1);
        try {
            const opts = {
                include: [{
                  model: Casinos,
                  attributes: ['address'],
                }, {
                  model: Serie_images,
                  attributes: ['image_url']
                }],
                where: {
                    id: id,
                },
                //raw: true,
            }

            var [err, result] = yield Series.scope('introduce').findOne(opts)
            if (err) throw err

            //yield webcache.set(req, JSON.stringify(result), $)

            return Handle.success(res, result)

        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}
