import { Student } from "./student.model";
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
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
