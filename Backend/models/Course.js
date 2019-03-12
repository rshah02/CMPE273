const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'course', {
        courseName: {
            type: Sequelize.STRING
        },
        courseDept: {
            type: Sequelize.STRING
        },
        CourseDescrption: {
            type: Sequelize.STRING
        },
        room: {
            type: Sequelize.STRING
        },
        capacity: {
            type: Sequelize.STRING
        },
        waitlistCapacity: {
            type: Sequelize.STRING
        },
        term: {
            type: Sequelize.STRING
        },
        courseId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        facultyId: {
            type: Sequelize.STRING
        },
        lectureTime: {
            type: Sequelize.STRING
        },

    }, {
        timestamps: false
    }
)