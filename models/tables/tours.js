/*
 * 巡回赛表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('tours', {
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
            type                  : Sequelize.STRING(45),
            defaultValue          : null,
        },
        desc                      : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        created_at: {
            type                  : Sequelize.DATE,
            allowNull             : false,
            defaultValue          : Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
			type                  : 'TIMESTAMP',
            onUpdate              : Sequelize.NOW,
    	    defaultValue          : Sequelize.NOW,
        }
    }, {
        tableName: 'tours',
        freezeTableName: true,
        timestamps: false,
    })
}
