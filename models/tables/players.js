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
        idCard                   : {
            type                  : Sequelize.STRING(45),
            defaultValue          : null,
            field                 : 'id_card',
        },
        mobile                    : {
            type                  : Sequelize.STRING(45),
            defaultValue          : null,
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
        countriesId              : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
            field                 : 'countries_id',
        },
        citiesId                 : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
            field                 : 'cities_id',
        },
        usersId                  : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            defaultValue          : null,
            field                 : 'users_id',
        },
    }, {
        tableName: 'players',
        freezeTableName: true,
        timestamps: false
    })
}
