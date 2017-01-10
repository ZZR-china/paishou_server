/*
 * 系列赛图集表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('serie_images', {
        id                        : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            primaryKey            : true,
            autoIncrement         : true,
        },
        image_url                 : {
            type                  : Sequelize.STRING(255),
            allowNull             : false,
        },
        desc                      : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        created_at                : {
            type                  : Sequelize.DATE,
            allowNull             : false,
            defaultValue          : Sequelize.NOW,
        },
        updated_at                : {
		    type                  : 'TIMESTAMP',
            onUpdate              : Sequelize.NOW,
    	    defaultValue          : Sequelize.NOW,
        },
        series_id                 : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            defaultValue          : null,
        },
    }, {
        tableName: 'serie_images',
        freezeTableName: true,
        timestamps: false,
    })
}
