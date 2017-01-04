/*
 * 用户表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('user', {
        id                : {
            type          : Sequelize.INTEGER,
            primaryKey    : true,
            autoIncrement : true,
        },
        user              : {
            type          : Sequelize.STRING(45),
            allowNull     : false,
            unique        : true,
        },
        password          : {
            type          : Sequelize.STRING(45),
            allowNull     : false,
        },
        real_name         : {
            type          : Sequelize.STRING(45),
            defaultValue  : null,
        },
        nike_name         : {
            type          : Sequelize.STRING(45),
            defaultValue  : null,
        },
        id_card           : {
            type          : Sequelize.STRING(45),
            defaultValue  : null,
        },
        passport_id       : {
            type          : Sequelize.STRING(45),
            defaultValue  : null,
        },
        one_way_permit    : {
            type          : Sequelize.STRING(45),
            defaultValue  : null,
        },
        wechat_unionid    : {
            type          : Sequelize.STRING(255),
            defaultValue  : null,
            unique        : true,
        },
        point             : {
            type          : Sequelize.INTEGER(11),
            defaultValue  : null,
        },
        name_spell        : {
            type          : Sequelize.STRING(45),
            defaultValue  : null,
        },
        mobile            : {
            type          : Sequelize.STRING(45),
            defaultValue  : null,
        },
        created_time: {
            type          : Sequelize.DATE,
            allowNull     : false,
            defaultValue  : Sequelize.NOW,
        },
        updated_time: {
			      type          : Sequelize.DATE,
    			  defaultValue  : Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        }
    }, {
        tableName: 'user',
        freezeTableName: true,
        timestamps: false
    })
}
