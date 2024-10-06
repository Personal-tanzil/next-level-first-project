import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate("academicfaculty");
  return result;
};

const getSingleAcademicDepartmentFromDB = async (payload: string) => {
  const result = await AcademicDepartment.findById(payload).populate(
    "academicfaculty"
  );
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const result = AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
