const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'submission', {
        userId: {
            type: Sequelize.INTEGER
        },
        submissionDetail: {
            type: Sequelize.STRING
        },
        courseId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        assignmentId: {
            type: Sequelize.INTEGER,
        },
        submissionDate: {
            type: Sequelize.DATE
        },

    }, {
        timestamps: false
    }
)