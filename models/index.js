'use strict'

const Sequelize = require('sequelize')

const db = new Sequelize('player', 'root', '123456', Conf.db.mysql)

/* 导入表格 */
const t = require('./tables')(db)

t.Casinos.belongsTo(t.Countries, {foreignKey: 'countries_id'})
t.Casinos.belongsTo(t.Cities, {foreignKey: 'cities_id'})

t.Matches.belongsTo(t.Match_types, {foreignKey: 'match_types_id'})

t.Series.belongsTo(t.Casinos, {foreignKey: 'casinos_id'})
t.Series.hasMany(t.Matches, {foreignKey: 'series_id'})
t.Series.hasMany(t.Serie_images, {foreignKey: 'series_id'})



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
