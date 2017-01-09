/*
 * 用户表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('users', {
        id                      : {
            type                : Sequelize.INTEGER.UNSIGNED,
            primaryKey          : true,
            autoIncrement       : true,
        },
        user                    : {
            type                : Sequelize.STRING(45),
            allowNull           : false,
            unique              : true,
        },
        password                : {
            type                : Sequelize.STRING(45),
            allowNull           : false,
        },
        real_name               : {
            type                : Sequelize.STRING(45),
            defaultValue        : null,
        },
        nike_name               : {
            type                : Sequelize.STRING(45),
            defaultValue        : null,
        },
        id_card                 : {
            type                : Sequelize.STRING(45),
            defaultValue        : null,
        },
        passport_id             : {
            type                : Sequelize.STRING(45),
            defaultValue        : null,
        },
        one_way_permit          : {
            type                : Sequelize.STRING(45),
            defaultValue        : null,
        },
        wechat_unionid          : {
            type                : Sequelize.STRING(255),
            unique              : true,
            defaultValue        : null,
        },
        point                   : {
            type                : Sequelize.INTEGER(11),
            defaultValue        : null,
        },
        name_spell              : {
            type                : Sequelize.STRING(45),
            defaultValue        : null,
        },
        mobile                  : {
            type                : Sequelize.STRING(45),
            unique              : true,
            defaultValue        : null,
        },
        created_at: {
            type                : Sequelize.DATE,
            allowNull           : false,
            defaultValue        : Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
		    type                : Sequelize.DATE,
            onUpdate            : Sequelize.NOW,
    		defaultValue        : Sequelize.NOW,
        }
    }, {
        tableName: 'users',
        freezeTableName: true,
        timestamps: false
    })
}
