/*
 * 赛事类型表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('match_types', {
        id                        : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            primaryKey            : true,
            autoIncrement         : true,
        },
        name                      : {
            type                  : Sequelize.STRING(255),
            allowNull             : false,
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
        tableName: 'match_types',
        freezeTableName: true,
        timestamps: false,
    })
}
