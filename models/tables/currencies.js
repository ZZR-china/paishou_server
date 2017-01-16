/*
 * 货币表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('currencies', {
        id                        : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            primaryKey            : true,
            autoIncrement         : true,
        },
        name                      : {
            type                  : Sequelize.STRING(45),
            allowNull             : false,
        },
        code                      : {
            type                  : Sequelize.STRING(255),
            allowNull             : false,
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
        tableName: 'currencies',
        freezeTableName: true,
        timestamps: false,
    })
}
