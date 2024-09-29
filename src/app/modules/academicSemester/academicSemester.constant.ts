import {
  TAcademicSemeseterCode,
  TAcademicSemeseterName,
  TAcademicSemesterCodeMaper,
  TMonths,
} from "./academicSemester.interface";

export const Months: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const AcademicSemesterName: TAcademicSemeseterName[] = [
  "Autumn",
  "Summar",
  "Fall",
];
export const AcademicSemesterCode: TAcademicSemeseterCode[] = [
  "01",
  "02",
  "03",
];

export const academicSemesterCodeMaper: TAcademicSemesterCodeMaper = {
  Autumn: "01",
  Summar: "02",
  Fall: "03",
};
