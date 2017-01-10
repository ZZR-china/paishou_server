/*
 * 国家表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('countries', {
        id                        : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            primaryKey            : true,
            autoIncrement         : true,
        },
        name                      : {
            type                  : Sequelize.STRING(45),
            allowNull             : false,
            unique                : true,
        },
        image_url                 : {
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
        }
    }, {
        tableName: 'countries',
        freezeTableName: true,
        timestamps: false,
    })
}
