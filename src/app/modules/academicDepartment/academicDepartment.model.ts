import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicfaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
  }
);

academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentAlreadyExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentAlreadyExist) {
    throw new AppError(httpStatus.CONFLICT, "This department is already exist");
  }
  next();
});

// query middleware

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentAlreadyExist = await AcademicDepartment.findOne(query);
  if (!isDepartmentAlreadyExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Department id not found !!");
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
