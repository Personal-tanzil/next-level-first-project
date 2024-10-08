import { TAcademicSemester } from "./../academicSemester/academicSemester.interface";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import genarateUserId from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import mongoose from "mongoose";

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
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newUser = await User.create([userData], { session });
    //   create student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faield To Create User");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference id
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faield To Create Student");
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Faield To Create Student");
  }
};

export const UserService = {
  createStudentIntoDB,
};
