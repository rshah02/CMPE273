const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db
/*module.exports = db.sequelize.define(
    'user', {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.INTEGER
        },
        city: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN
        },
        type: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company: {
            type: Sequelize.STRING
        },
        school: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        languages: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.STRING
        }

    }, {
        timestamps: false
    }
) */