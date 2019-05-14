const graphql = require("graphql");
const mongoose = require("mongoose");
const Course = require("../models/Course");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const _ = require("lodash");
var gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    type: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    avatar: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    gender: { type: GraphQLString },
    languages: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    company: { type: GraphQLString },
    school: { type: GraphQLString },
    about: { type: GraphQLString },
    homeTown: { type: GraphQLString }
    // courses: {
    //   type: new GraphQLList(CourseType),
    //   resolve(parent, args) {
    //     // return _.filter(books, { authorId: parent.id });
    //   }
    // }
  })
});

const course = new GraphQLObjectType({
  name: "course",
  fields: () => ({
    _id: { type: GraphQLID },
    courseName: { type: GraphQLString },
    courseDept: { type: GraphQLString },
    courseTerm: { type: GraphQLString },
    courseDescription: { type: GraphQLString },
    courseRoom: { type: GraphQLString },
    courseCapacity: { type: GraphQLString },
    waitlistCapacity: { type: GraphQLString },
    lectureTime: { type: GraphQLString }
  })
});
const myCourses = new GraphQLObjectType({
  name: "myCourses",
  fields: () => ({
    myCourses: { type: GraphQLList(course) }
  })
});

const loginResult = new GraphQLObjectType({
  name: "loginResult",
  fields: () => ({
    result: { type: GraphQLBoolean },
    userData: { type: UserType }
  })
});

const signupResult = new GraphQLObjectType({
  name: "signupResult",
  fields: () => ({
    success: { type: GraphQLBoolean },
    duplicateUser: { type: GraphQLBoolean }
  })
});
const addCourseResult = new GraphQLObjectType({
  name: "addCourseResult",
  fields: () => ({
    successResult: { type: GraphQLBoolean }
  })
});

const updateProfileResult = new GraphQLObjectType({
  name: "updateProfileResult",
  fields: () => ({
    success: { type: GraphQLBoolean },
    userData: { type: UserType }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    login: {
      type: loginResult,
      args: {
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },
      async resolve(parent, args) {
        console.log("args: ", args);
        var isAuthenticated = false;
        var profileData = {};

        await User.findOne(
          {
            email: args.email
          },
          (err, user) => {
            if (err) {
              isAuthenticated = false;
            } else {
              console.log("result", user.name);
              if (!bcrypt.compareSync(args.password, user.password)) {
                console.log("Invalid Credentials!");
                //callback(null, null);
                isAuthenticated = false;
              } else {
                console.log("Corect creds!");
                isAuthenticated = true;

                profileData = user;
              }
            }
          }
        );

        console.log("isauth", isAuthenticated);
        console.log("Profile Data", profileData);
        if (isAuthenticated == true) {
          var result = {
            result: true,
            userData: profileData
          };
          console.log("UserData", result.userData);
        } else {
          var result = {
            result: false
          };
        }
        return result;
      }
    },
    profile: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        console.log("args: ", args);
        var profileData = {};
        return User.findOne({
          email: args.email
        });
        //   (err, user) => {
        //     if (err) {
        //     } else {
        //       console.log("User details: ", user);
        //       profileData = user;
        //     }
        //   }
        // );

        // return profileData;
      }
    },
    course: {
      type: course,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return
      }
    },
    courses: {
      type: new GraphQLList(course),
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        return Course.find({});
      }
    },
    myCourses: {
      type: new GraphQLList(course),
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        return Course.find({ users: { _id: args._id } });
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    signup: {
      type: signupResult,
      args: {
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        type: {
          type: GraphQLString
        },
        avatar: {
          type: GraphQLString
        }
      },
      resolve: (parent, args) => {
        return new Promise(async (resolve, reject) => {
          var successResult = false;
          var duplicateUserResult = false;
          console.log("called");
          await User.findOne({ email: args.email }).then(user => {
            if (user) {
              duplicateUserResult = true;
              const resultData = {
                success: successResult,
                duplicateUser: duplicateUserResult
              };
              resolve(resultData);
            } else {
              const avatar = gravatar.url(args.emailemail, {
                s: "200", //size
                r: "pg", //rating
                d: "mm" //default
              });

              bcrypt.hash(args.password, 10, (err, hash) => {
                if (err) {
                  throw err;
                }
                const newUser = new User({
                  _id: new mongoose.Types.ObjectId(),
                  name: args.name,
                  email: args.email,
                  type: args.type,
                  avatar,
                  password: hash
                });
                newUser
                  .save()
                  .then(user => {
                    successResult = true;
                    const resultData = {
                      success: successResult,
                      duplicateUser: duplicateUserResult
                    };
                    console.log(resultData);
                    resolve(resultData);
                  })
                  .catch(err => console.log(err));
              });
            }
          });

          //
        });
      }
    },
    updateProfile: {
      type: updateProfileResult,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        gender: { type: GraphQLString },
        languages: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        company: { type: GraphQLString },
        school: { type: GraphQLString },
        about: { type: GraphQLString },
        homeTown: { type: GraphQLString }
      },
      resolve(parent, args) {
        return new Promise(async (resolve, reject) => {
          var successResult = false;
          var profileData = {};
          console.log("args: ", args);
          const user = {
            name: args.name,
            email: args.email,
            phone: args.phone,
            gender: args.gender,
            languages: args.languages,
            city: args.city,
            state: args.state,
            country: args.country,
            company: args.company,
            school: args.school,
            about: args.about,
            homeTown: args.homeTown
          };
          await User.findOneAndUpdate(
            {
              email: args.email
            },
            user,
            { new: true }
          ).then(user => {
            successResult = true;
            profileData = user;
            var result = {
              success: successResult,
              userData: profileData
            };
            console.log(result);
            resolve(result);
          });
        });
      }
    },
    addCourse: {
      type: course,
      args: {
        id: { type: GraphQLID },
        courseName: { type: GraphQLString },
        courseDept: { type: GraphQLString },
        courseTerm: { type: GraphQLString },
        courseDescription: { type: GraphQLString },
        courseRoom: { type: GraphQLString },
        courseCapacity: { type: GraphQLString },
        waitlistCapacity: { type: GraphQLString },
        lectureTime: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        var succcesResult = false;
        return new Promise(async (resolve, reject) => {
          await Course.findOne({ courseName: args.courseName }).then(course => {
            if (course) {
              succcesResult = false;
              var result = {
                successResult: false
              };
              console.log("called");
              resolve(result);
            } else {
              const newCourse = new Course({
                _id: new mongoose.Types.ObjectId(),
                courseName: args.courseName,
                courseDept: args.courseDept,
                courseTerm: args.courseTerm,
                courseDescription: args.courseTerm,
                courseRoom: args.courseRoom,
                courseCapacity: args.courseCapacity,
                waitlistCapacity: args.courseCapacity,
                lectureTime: args.lectureTime
              });
              newCourse.save().then(course => {
                course.users.push(args.id);
                course.save().then(Course => {
                  succcesResult = true;
                  var result = {
                    successResult: true
                  };
                  console.log(course);
                  resolve(Course);
                });
              });
            }
          });
        });
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
