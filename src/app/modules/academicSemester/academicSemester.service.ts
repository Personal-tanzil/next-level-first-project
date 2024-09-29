import { academicSemesterCodeMaper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterCodeMaper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromBD = async () => {
  const result = await AcademicSemester.find({});
  return result;
};

const getSingleAcademicSemesterFromDB = async (payload: string) => {
  const result = await AcademicSemester.findById(payload);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: TAcademicSemester
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterCodeMaper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const AcademisSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromBD,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
