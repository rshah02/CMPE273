const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'grades', {
        userId: {
            type: Sequelize.STRING
        },
        assignmentId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        score: {
            type: Sequelize.INTEGER
        },
        courseId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    }, {
        timestamps: false
    }
)