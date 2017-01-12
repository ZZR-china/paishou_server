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
        }
    }, {
        tableName: 'match_types',
        freezeTableName: true,
        timestamps: false,
    })
}
