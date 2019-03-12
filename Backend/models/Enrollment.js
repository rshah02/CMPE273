const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'enrollment', {
        userId: {
            type: Sequelize.STRING
        },

        courseId: {
            type: Sequelize.INTEGER

        },
        type: {
            type: Sequelize.STRING
        },
        enrollmentId: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    }
)