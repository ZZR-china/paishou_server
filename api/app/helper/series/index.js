'use script'

const lightco = require('lightco')
const moment = require('moment')
const Sequelize = require('sequelize')
const logger = log4js.getLogger('routes-series')

const toInt = Utils.toInt
const webcache = Services.cache.webcache

const series = {}

const { Countries,
        Cities,
        Casinos,
        Matches,
        Match_types,
        Series,
        Serie_images,
        Tours,          } = Models

series.hot = require('./hot')

//赛事日历
series.calendar = (req, res) => {
    lightco.run(function *($) {
        const S = Sequelize

        const DEF = Conf.const.series.calendar.limit_def
        const MAX = Conf.const.series.calendar.limit_max

        let query = []

        try {
            // 按月查询
            if (req.query.month) {
                const month = req.query.month
                const length = month.length
                if (length === 4) {
                  query.push(S.where(S.fn('PERIOD_DIFF',S.fn('DATE_FORMAT',S.col('start_date'),'%Y'),month),'=',0))
                }
                if (length === 6) {
                  query.push(S.where(S.fn('PERIOD_DIFF',S.fn('DATE_FORMAT',S.col('start_date'),'%Y%m'),month),'=',0))
                }
            }

            // 国家
            if (req.query.country) {
                var country = {name: req.query.country}
            }

            const include = [{
                model: Casinos,
                attributes: [],
                include: [{
                    model: Countries,
                    attributes: [
                        sequelize.literal('`casino.country`.`name` AS `country`'),
                    ],
                    where: country || {},
                }, {
                    model: Cities,
                    attributes: [
                        sequelize.literal('`casino.city`.`name` AS `city`'),
                    ],
                }],
            }]

            // 巡回赛查询
            if (req.query.tour) {
              var tour = {name: req.query.tour}

              include.push({
                model: Tours,
                attributes: [],
                where: tour || {}
              })
            }

            let opts = {
                include: include,
                order: [['start_date', req.query.order || 'ASC']],
                offset: toInt(req.query.offset, 0),
                limit: toInt(req.query.limit, DEF),
                where: {$and: query},
                raw: true,
            }

            opts.limit = opts.limit > MAX ? MAX : opts.limit

            var [err, result] = yield Series.scope('default').findAndCountAll(opts)
            if (err) throw err

            result.rows.forEach(function(item) {
                 delete item['casino.city.id']
                 delete item['casino.country.id']
            })

            if (result.count === 0) {
                  return Handle.success(res, 0, 204)
            } else {
                  yield webcache.set(req, JSON.stringify(result), $)

                  return Handle.success(res, result)
            }

        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}

//热门赛事列表
series.is_hot = (req, res) => {
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

//赛事详情
series.detail = (req, res) => {
    lightco.run(function *($) {
        const id = req.params.id

        try {
            var [err, serie] = yield Series.findById(id)
            if (err) throw err

            //判断是否热门赛事
            if (serie.is_hot == 0) {
                const hotOpts = {
                    include: [{
                      model: Serie_images,
                      attributes: [['image_url','url']],
                    }, {
                      model: Casinos,
                      attributes: ['address'],
                    }, {
                      model: Matches,
                      attributes: ['name','match_day','real_buyin','rake_buyin','abs_discount','rel_discount','unit_price'],
                    }],
                    where: {id: id},
                    attributes: ['name','phone','website','is_one_ticket'],
                    order: ['matches.match_day'],
                    logging: true,
                }

                var [err, hotResult] = yield Series.findOne(hotOpts)
                if (err) throw err

                yield webcache.set(req, JSON.stringify(hotResult), $)

                return Handle.success(res, hotResult)
            }
            else {
                const opts = {
                    include: [{
                        model: Matches,
                        include: [{
                            model: Match_types,
                            attributes: ['name'],
                        }],
                        attributes: ['name', 'is_one_ticket_match', 'match_day', 'start_time', 'unit_price', 'player_amount'],
                    }],
                    where: {id: id},
                }

                var [err, result] = yield Series.scope('default').findOne(opts)
                if (err) throw err

                yield webcache.set(req, JSON.stringify(result), $)

                return Handle.success(res, result)
            }

        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}


module.exports = series
