import { TAcademicSemester } from "./../academicSemester/academicSemester.interface";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import genarateUserId from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object

  const userData: Partial<TUser> = {};
  //  if password not givent then use default password
  userData.password = password || (config.default_password as string);
  //   set student role
  userData.role = "student";
  // get semester
  const academicSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );
  // set userid dynamicly
  userData.id = await genarateUserId(academicSemester as TAcademicSemester);
  const newUser = await User.create(userData);
  //   create student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; // reference id

    const newStudent = await Student.create(payload);
    return newStudent;
  }

  return newUser;
};

export const UserService = {
  createStudentIntoDB,
};
