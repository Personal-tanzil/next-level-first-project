import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Academic Department Created Successfully",
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department Fetched Successfuly",
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      req.params.departmentId
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department Fetched Successfully",
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.departmentId;
  const payload = req.body;
  const reuslt =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      id,
      payload
    );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Academic Department Updated Successfully",
    data: reuslt,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
