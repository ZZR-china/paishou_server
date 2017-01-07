/*
 * 俱乐部表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('casinos', {
        id                        : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            primaryKey            : true,
            autoIncrement         : true,
        },
        name                      : {
            type                  : Sequelize.STRING(45),
            allowNull             : false,
        },
        address                   : {
            type                  : Sequelize.STRING(255),
            allowNull             : false,
        },
        opening_time              : {
            type                  : Sequelize.TIME,
            defaultValue          : null,
        },
        closing_time              : {
            type                  : Sequelize.TIME,
            defaultValue          : null,
        },
        contact_person            : {
            type                  : Sequelize.STRING(45),
            defaultValue          : null,
        },
        phone                     : {
            type                  : Sequelize.STRING(45),
            defaultValue          : null,
        },
        logo_url                  : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        image_url                 : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        website                   : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        longitude                 : {
            type                  : Sequelize.DECIMAL(10,7),
            defaultValue          : null,
        },
        latitude                  : {
            type                  : Sequelize.DECIMAL(10,7),
            defaultValue          : null,
        },
        created_at: {
            type                  : Sequelize.DATE,
            allowNull             : false,
            defaultValue          : Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
		    type                  : Sequelize.DATE,
    		onUpdate              : Sequelize.NOW,
            defaultValue          : Sequelize.NOW,
        },
        cities_id                 : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
        },
        countries_id              : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
        },
    }, {
        tableName: 'casinos',
        freezeTableName: true,
        timestamps: false
    })
}
