'use strict'

const Sequelize = require('sequelize')

const db = new Sequelize('player', 'root', '123456', Conf.db.mysql)

//const db = new Sequelize('player', 'ssb_admin', '123465', Conf.db.mysql)

/* 导入表格 */
const t = require('./tables')(db)

t.Casinos.belongsTo(t.Countries, {foreignKey: 'countries_id'})
t.Casinos.belongsTo(t.Cities, {foreignKey: 'cities_id'})

t.Matches.belongsTo(t.MatchTypes, {foreignKey: 'match_types_id'})
t.Matches.belongsTo(t.Organizers, {foreignKey: 'organizers_id'})
t.Matches.belongsTo(t.Currencies, {foreignKey: 'currencies_id'})

t.MatchResults.belongsTo(t.Players, {foreignKey: 'players_id'})

t.Organizers.belongsTo(t.Casinos, {foreignKey: 'casinos_id'})

t.Players.belongsTo(t.Countries, {foreignKey: 'countries_id'})

t.PromotionResults.belongsTo(t.Players, {foreignKey: 'players_id'})

t.Series.belongsTo(t.Casinos, {foreignKey: 'casinos_id'})
t.Series.hasMany(t.Matches, {foreignKey: 'series_id'})
t.Series.hasMany(t.SerieImages, {foreignKey: 'series_id'})
t.Series.belongsTo(t.Tours, {foreignKey: 'tours_id'})


/* 数据库鉴权 */
db.authenticate().then(function(err) {
    console.log('Connection has been established successfully.')
}).catch(function (err) {
    console.log('Unable to connect to the database:', err)
})

/* 导入数据库 */
db.sync().then(function() {
  console.log('表创建完成')
}).catch(function(error) {
  console.log(`表创建失败：${error}`)
})

module.exports = {
    t: t,
    db: db
}
