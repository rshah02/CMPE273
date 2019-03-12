const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'assignment', {
        assignmentTitle: {
            type: Sequelize.STRING
        },
        assignmentDetail: {
            type: Sequelize.STRING
        },
        courseId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        assignmentId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        assignmentType: {
            type: Sequelize.STRING
        },
        points: {
            type: Sequelize.INTEGER
        },
        dueDate: {
            type: Sequelize.DATE
        },

    }, {
        timestamps: false
    }
)