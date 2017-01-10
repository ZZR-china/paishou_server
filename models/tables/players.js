/*
 * 参赛人员表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('players', {
        id                        : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            primaryKey            : true,
            autoIncrement         : true,
        },
        name                      : {
            type                  : Sequelize.STRING(45),
            allowNull             : false,
        },
        age                       : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            defaultValue          : null,
        },
        id_card                   : {
            type                  : Sequelize.STRING(45),
            defaultValue          : null,
        },
        mobile                    : {
            type                  : Sequelize.STRING(45),
            defaultValue          : null,
        },
        remark                    : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        created_at: {
            type                  : Sequelize.DATE,
            allowNull             : false,
            defaultValue          : Sequelize.NOW,
        },
        updated_at: {
    	    type                  : 'TIMESTAMP',
    		onUpdate              : Sequelize.NOW,
            defaultValue          : Sequelize.NOW,
        },
        countries_id              : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
        },
        cities_id              : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
        },
        users_id                 : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            defaultValue          : null,
        },
    }, {
        tableName: 'players',
        freezeTableName: true,
        timestamps: false
    })
}
