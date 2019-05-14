import { gql } from "apollo-boost";

const signup = gql`
  mutation signup(
    $name: String
    $email: String
    $password: String
    $type: String
  ) {
    signup(name: $name, email: $email, password: $password, type: $type) {
      success
      duplicateUser
    }
  }
`;

const updateProfile = gql`
  mutation updateProfile(
    $name: String
    $email: String
    $phone: String
    $about: String
    $country: String
    $city: String
    $state: String
    $gender: String
    $school: String
    $homeTown: String
    $languages: String
    $company: String
  ) {
    updateProfile(
      name: $name
      email: $email
      phone: $phone
      about: $about
      country: $country
      state: $state
      city: $city
      gender: $gender
      school: $school
      homeTown: $homeTown
      languages: $languages
      company: $company
    ) {
      success
      userData {
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

const addCourse = gql`
  mutation addCourse(
    $id: ID
    $courseName: String
    $courseDept: String
    $courseTerm: String
    $courseDescription: String
    $courseRoom: String
    $courseCapacity: String
    $waitlistCapacity: String
    $lectureTime: String
  ) {
    addCourse(
      id: $id
      courseName: $courseName
      courseTerm: $courseTerm
      courseDept: $courseDept
      courseDescription: $courseDescription
      courseRoom: $courseRoom
      courseCapacity: $courseCapacity
      waitlistCapacity: $waitlistCapacity
      lectureTime: $lectureTime
    ) {
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
const enroll = gql`
  mutation enroll($userId: String, $email: String, $courseId: String) {
    enroll(userId: $userId, email: $email, courseId: $courseId) {
      addCourse
    }
  }
`;
export { signup, addCourse, updateProfile, enroll };
