/*
 * 城市表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('cities', {
        id                        : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            primaryKey            : true,
            autoIncrement         : true,
        },
        name                      : {
            type                  : Sequelize.STRING(255),
            allowNull             : false,
            unique                : true,
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
        }
    }, {
        tableName: 'cities',
        freezeTableName: true,
        timestamps: false
    })
}
