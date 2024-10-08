import { RequestHandler } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is Retrived Succesfully",
    data: result,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is Retrived Succesfully",
    data: result,
  });
});

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is deleted Succesfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.updateStudentIntoDB(
    studentId,
    req.body.student
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
