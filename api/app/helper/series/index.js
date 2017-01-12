'use script'

const moment = require('moment')
const Sequelize = require('sequelize')
const lightco = require('lightco')
const logger = log4js.getLogger('routes-series')

const toInt = Utils.toInt
const webcache = Services.cache.webcache

const series = {}

const { Countries,
        Cities,
        Casinos,
        Matches,
        MatchTypes,
        Series,
        SerieImages,
        Tours,          } = Models

series.hot = require('./hot')
series.players = require('./players')
series.payInfo = require('./payInfo')

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
                  query.push(S.where(S.fn('PERIOD_DIFF',S.fn('DATE_FORMAT',S.col('startDate'),'%Y'),month),'=',0))
                }
                if (length === 6) {
                  query.push(S.where(S.fn('PERIOD_DIFF',S.fn('DATE_FORMAT',S.col('startDate'),'%Y%m'),month),'=',0))
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

//赛事详情
series.detail = (req, res) => {
    lightco.run(function *($) {
        const id = req.params.id

        try {
            var [err, serie] = yield Series.findById(id)
            if (err) throw err

            if (serie === null) {
                return Handle.error(res, '1030', 400)
            }

            //判断是否热门赛事
            if (serie.isHot == 0) {
                console.log(1);
                const hotOpts = {
                    include: [{
                      model: SerieImages,
                      attributes: [['image_url','url']],
                    }, {
                      model: Casinos,
                      attributes: ['address'],
                    }, {
                      model: Matches,
                      attributes: [
                          'id',
                          'name',
                          'matchDay',
                          'realBuyin',
                          'rakeBuyin',
                          'absDiscount',
                          'relDiscount',
                          'unitPrice',
                      ],
                    }],
                    where: {id: id},
                    attributes: ['name','phone','website','isOneTicket'],
                    order: ['matches.match_day'],
                }

                var [err, hotResult] = yield Series.findOne(hotOpts)
                if (err) throw err

                if (hotResult === null) {
                    return Handle.success(res, 0, 204)
                }
                else {
                    yield webcache.set(req, JSON.stringify(hotResult), $)

                    return Handle.success(res, hotResult)
                }
            }
            else {
                const opts = {
                    include: [{
                        model: Matches,
                        include: [{
                            model: MatchTypes,
                            attributes: ['name'],
                        }],
                        attributes: [
                            'id',
                            'name',
                            'isOneTicketMatch',
                            'matchDay',
                            'startTime',
                            'unitPrice',
                            'playerAmount',
                        ],
                    }],
                    where: {id: id},
                }

                var [err, result] = yield Series.scope('default').findOne(opts)
                if (err) throw err

                if (result === null) {
                    return Handle.success(res, 0, 204)
                }
                else {
                    yield webcache.set(req, JSON.stringify(result), $)

                    return Handle.success(res, result)
                }
            }

        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}


module.exports = series
