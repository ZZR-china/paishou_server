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
        openingTime              : {
            type                  : Sequelize.TIME,
            defaultValue          : null,
            field                 : 'opening_time',
        },
        closingTime              : {
            type                  : Sequelize.TIME,
            defaultValue          : null,
            field                 : 'closing_time',
        },
        contactPerson            : {
            type                  : Sequelize.STRING(45),
            defaultValue          : null,
            field                 : 'contact_person',
        },
        phone                     : {
            type                  : Sequelize.STRING(45),
            defaultValue          : null,
        },
        logoUrl                  : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
            field                 : 'logo_url',
        },
        imageUrl                 : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
            field                 : 'image_url',
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
            field                 : 'updatedAt',
        },
        citiesId                 : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
            field                 : 'cities_id',
        },
        countriesId              : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
            field                 : 'countries_id',
        },
    }, {
        tableName: 'casinos',
        freezeTableName: true,
        timestamps: false
    })
}
