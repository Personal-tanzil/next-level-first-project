export type TMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TAcademicSemeseterName = "Autumn" | "Summar" | "Fall";
export type TAcademicSemeseterCode = "01" | "02" | "03";

export type TAcademicSemester = {
  name: TAcademicSemeseterName;
  code: TAcademicSemeseterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};

export type TAcademicSemesterCodeMaper = {
  [key: string]: string;
};
