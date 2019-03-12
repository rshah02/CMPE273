const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'course', {
        courseId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
        announcementId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        announcementDetail: {
            type: Sequelize.STRING
        },
        announcementDate: {
            type: Sequelize.DATE
        }

    }, {
        timestamps: false
    }
)