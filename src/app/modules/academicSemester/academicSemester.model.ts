import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constant";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExist) {
    throw new AppError(httpStatus.CONFLICT, "Semester Is Already Exist");
  } else {
    next();
  }
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
