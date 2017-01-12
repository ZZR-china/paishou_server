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
            unique              : true,
        },
        password                : {
            type                : Sequelize.STRING(45),
            defaultValue        : null,
        },
        realName                : {
            type                : Sequelize.STRING(45),
            defaultValue        : null,
            field               : 'real_name',
        },
        nickName                : {
            type                : Sequelize.STRING(45),
            defaultValue        : null,
            field               : 'nick_name',
        },
        headImg                : {
            type                : Sequelize.STRING(255),
            defaultValue        : null,
            field               : 'head_img',
        },
        idCard                  : {
            type                : Sequelize.STRING(45),
            defaultValue        : null,
            field               : 'id_card',
        },
        passportId              : {
            type                : Sequelize.STRING(45),
            defaultValue        : null,
            field               : 'passport_id',
        },
        oneWayPermit            : {
            type                : Sequelize.STRING(45),
            defaultValue        : null,
            field               : 'one_way_permit',
        },
        wechatUnionid           : {
            type                : Sequelize.STRING(255),
            unique              : true,
            defaultValue        : null,
            field               : 'wechat_unionid',
        },
        point                   : {
            type                : Sequelize.INTEGER(11),
            defaultValue        : null,
        },
        nameSpell               : {
            type                : Sequelize.STRING(45),
            defaultValue        : null,
            field               : 'name_spell',
        },
        mobile                  : {
            type                : Sequelize.STRING(45),
            unique              : true,
            defaultValue        : null,
        },
        createdAt: {
            type                : Sequelize.DATE,
            allowNull           : false,
            defaultValue        : Sequelize.NOW,
            field               : 'created_at',
        },
        updatedAt: {
		    type                : 'TIMESTAMP',
            onUpdate            : Sequelize.NOW,
    		defaultValue        : Sequelize.NOW,
            field               : 'updated_at',
        }
    }, {
        tableName: 'users',
        freezeTableName: true,
        timestamps: false
    })
}
