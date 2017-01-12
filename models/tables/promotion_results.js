/*
 * 晋级人员表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('promotion_results', {
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
        stack                     : {
            type                  : Sequelize.INTEGER,
            allowNull             : false,
        },
        table                     : {
            type                  : Sequelize.STRING(45),
            allowNull             : false,
        },
        seat                      : {
            type                  : Sequelize.STRING(45),
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
        matchesId                : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
            field                 : 'matches_id',
        },
        playersId                 : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            defaultValue          : null,
            field                 : 'players_id',
        },
    }, {
        tableName: 'promotion_results',
        freezeTableName: true,
        timestamps: false
    })
}
