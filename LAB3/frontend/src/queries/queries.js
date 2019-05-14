import { gql } from "apollo-boost";
const login = gql`
  query login($email: String, $password: String) {
    login(email: $email, password: $password) {
      result
      userData {
        _id
        name
        email
        avatar
        phone
        about
        country
        city
        state
        gender
        homeTown
        school
        company
        languages
        type
      }
    }
  }
`;

const profile = gql`
  query profile($email: String) {
    profile(email: $email) {
      name
      email
      avatar
      about
      country
      city
      gender
      homeTown
      school
      company
      languages
      phone
      state
      type
    }
  }
`;

const myCourses = gql`
  query myCourses($_id: ID) {
    myCourses(_id: $_id) {
      _id
      courseName
      courseDept
      courseTerm
      courseDescription
      courseRoom
      courseCapacity
      waitlistCapacity
      lectureTime
    }
  }
`;
const courses = gql`
  query courses($email: String) {
    courses(email: $email) {
      id
      courseName
      courseDept
      courseTerm
      courseDescription
      courseRoom
      courseCapacity
      waitlistCapacity
      lectureTime
    }
  }
`;
export { login, profile, myCourses, courses };
