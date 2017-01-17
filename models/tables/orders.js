/*
 * 订单表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('orders', {
        id                        : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            primaryKey            : true,
            autoIncrement         : true,
        },
        orderNumber               : {
            type                  : Sequelize.STRING(45),
            allowNull             : false,
            field                 : 'order_number',
        },
        quantity                  : {
            type                  : Sequelize.INTEGER,
            allowNull             : false,
        },
        amount                    : {
            type                  : Sequelize.DECIMAL(10,2),
            allowNull             : false,
        },
        havePayed                 : {
            type                  : Sequelize.STRING(45),
            allowNull             : false,
            defaultValue          : 0,
            field                 : 'have_payed',
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
        updatedAt: {
    	    type                  : 'TIMESTAMP',
    		onUpdate              : Sequelize.NOW,
            defaultValue          : Sequelize.NOW,
            field                 : 'updated_at',
        },
        matchesId                 : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
            field                 : 'matches_id',
        },
        organizersId                : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
            field                 : 'organizers_id',
        },
        usersId                : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
            field                 : 'users_id',
        },
    }, {
        tableName: 'orders',
        freezeTableName: true,
        timestamps: false
    })
}
