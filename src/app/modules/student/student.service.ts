import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";
const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicfaculty",
      },
    })
    .populate("admissionSemester");
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicfaculty",
      },
    })
    .populate("admissionSemester");
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const isUserExists = await User.findOne({ id });
  const isStudentExists = await Student.findOne({ id });
  if (!isUserExists || !isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Id Not Found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }
    const deleteUsers = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteUsers) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    await session.commitTransaction();
    await session.endSession();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
  }
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  //  destructuring

  const { name, guardian, localGuardian, ...remainingStudentInfo } = payload;

  // store the default premetive value in a object

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentInfo,
  };

  // check non premitive data and if exist then convert it to the object

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  // save data in database
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
