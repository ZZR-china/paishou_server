'use script'

const lightco = require('lightco')
const moment = require('moment')
const logger = log4js.getLogger('routes-series')

const toInt = Utils.toInt
const webcache = Services.cache.webcache


const series = {}

const { Countries,
        Cities,
        Casinos,
        Matches,
        Series,
        Serie_images, } = Models


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
                  model: Countries,
                  attributes: [sequelize.literal('`casino.country`.`name` AS `country`')],
                }, {
                  model: Cities,
                  attributes: [sequelize.literal('`casino.city`.`name` AS `city`')]
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

            var [err, result] = yield Series.scope('hot').findAll(opts)
            if (err) throw err

            yield webcache.set(req, JSON.stringify(result), $)

            return Handle.success(res, result)

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
                    attributes: ['name','phone','website'],
                    order: ['matches.match_day'],
                    logging: true,
                }

                var [err, hotResult] = yield Series.findOne(hotOpts)
                if (err) throw err

                return Handle.success(res, hotResult)
            }
            else {
                if (serie.is_one_ticket == 1) {
                    const isOneTicketOpts = {
                        include: [{
                            model: Matches,
                            attributes: ['unit_price'],
                        }],
                        where: {id: id},
                        attributes: ['name', 'start_date', 'end_date'],
                    }

                    var [err, isOneTicketResult] = yield Series.findOne(isOneTicketOpts)
                    if (err) throw err

                    return Handle.success(res, isOneTicketResult)
                }
                else {
                    const generalOpts = {
                        include: [{
                            model: Matches,
                            attributes: ['unit_price'],
                        }],
                        where: {id: id},
                        attributes: ['name', 'start_date', 'end_date'],
                    }

                    var [err, isOneTicketResult] = yield Series.findOne(isOneTicketOpts)
                    if (err) throw err

                    return Handle.success(res, isOneTicketResult)
                }
            }

        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}


module.exports = series
