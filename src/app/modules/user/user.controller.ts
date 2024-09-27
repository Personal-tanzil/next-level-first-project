import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  // zod validation
  // const zodPerseData = studentValidationSchema.parse(studentData);
  const result = await UserService.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is Created Succesfully",
    data: result,
  });
});

export const UserController = {
  createStudent,
};
