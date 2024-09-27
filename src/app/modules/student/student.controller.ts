import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is Retrived Succesfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is Retrived Succesfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is deleted Succesfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
