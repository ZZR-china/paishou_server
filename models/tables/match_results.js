/*
 * 赛事结果表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('match_results', {
        id                        : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            primaryKey            : true,
            autoIncrement         : true,
        },
        rank                      : {
            type                  : Sequelize.INTEGER,
            allowNull             : false,
        },
        name                      : {
            type                  : Sequelize.STRING(45),
            allowNull             : false,
        },
        bonus                     : {
            type                  : Sequelize.INTEGER,
            allowNull             : false,
        },
        remark                    : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        createdAt: {
            type                  : Sequelize.DATE,
            allowNull             : false,
            defaultValue          : Sequelize.NOW,
            field                 : 'created_at',
        },
        updatedAt: {
    	    type                  : 'TIMESTAMP',
    		onUpdate              : Sequelize.NOW,
            defaultValue          : Sequelize.NOW,
            field                 : 'updated_at',
        },
        matches_id                : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
        },
        players_id                 : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            defaultValue          : null,
        },
    }, {
        tableName: 'match_results',
        freezeTableName: true,
        timestamps: false
    })
}
