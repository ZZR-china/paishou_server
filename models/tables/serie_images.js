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
        imageUrl                  : {
            type                  : Sequelize.STRING(255),
            allowNull             : false,
            field                 : 'image_url',
        },
        desc                      : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        createdAt                 : {
            type                  : Sequelize.DATE,
            allowNull             : false,
            defaultValue          : Sequelize.NOW,
            field                 : 'created_at',
        },
        updatedAt                 : {
		    type                  : 'TIMESTAMP',
            onUpdate              : Sequelize.NOW,
    	    defaultValue          : Sequelize.NOW,
            field                 : 'updated_at',
        },
        seriesId                  : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            defaultValue          : null,
            field                 : 'series_id',
        },
    }, {
        tableName: 'serie_images',
        freezeTableName: true,
        timestamps: false,
    })
}
