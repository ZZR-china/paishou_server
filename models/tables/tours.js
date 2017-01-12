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
        imageUrl                  : {
            type                  : Sequelize.STRING(45),
            defaultValue          : null,
            field                 : 'image_url',
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
        tableName: 'tours',
        freezeTableName: true,
        timestamps: false,
    })
}
