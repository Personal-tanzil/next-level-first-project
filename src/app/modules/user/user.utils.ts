import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";
const findLastStudentID = async () => {
  const lastStudentID = await User.findOne(
    { role: "student" },
    { id: 1, _id: -1 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudentID?.id ? lastStudentID?.id : undefined;
};

const genarateUserId = async (payload: TAcademicSemester) => {
  const lastStudentId = await findLastStudentID();
  const studentId = lastStudentId?.substring(6);
  let currentId = studentId || (0).toString();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const currentStudentSemesterCode = payload.code;
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const currentStudentSemesterYear = payload.year;
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentStudentSemesterCode &&
    currentStudentSemesterYear === lastStudentSemesterYear
  ) {
    currentId = lastStudentId?.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

export default genarateUserId;
