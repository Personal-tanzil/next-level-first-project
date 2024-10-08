"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        maxlength: [20, "First name can not be more then 20 chracters"],
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Last name is required"],
    },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        trim: true,
        required: [true, "Father's name is required"],
    },
    fatherOccupation: {
        type: String,
        trim: true,
        required: [true, "Father's occupation is required"],
    },
    fatherContactNo: {
        type: String,
        trim: true,
        required: [true, "Father's contact number is required"],
    },
    motherName: {
        type: String,
        trim: true,
        required: [true, "Mother's name is required"],
    },
    motherOccupation: {
        type: String,
        trim: true,
        required: [true, "Mother's occupation is required"],
    },
    motherContactNo: {
        type: String,
        trim: true,
        required: [true, "Mother's contact number is required"],
    },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Local guardian's name is required"],
    },
    occupation: {
        type: String,
        trim: true,
        required: [true, "Local guardian's occupation is required"],
    },
    contactNo: {
        type: String,
        trim: true,
        required: [true, "Local guardian's contact number is required"],
    },
    address: {
        type: String,
        trim: true,
        required: [true, "Local guardian's address is required"],
    },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, "Student ID is required"],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User Id  is required"],
        unique: true,
        ref: "User",
    },
    name: {
        type: userNameSchema,
        required: [true, "Student's name is required"],
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "{VALUE} is not a valid gender option",
        },
        required: [true, "Gender is required"],
    },
    dateOfBirth: {
        type: Date,
        trim: true,
        required: [true, "Date of birth is required"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true,
    },
    contactNo: {
        type: String,
        trim: true,
        required: [true, "Contact number is required"],
    },
    emergencyContactNo: {
        type: String,
        trim: true,
        required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            message: "{VALUE} is not a valid blood group",
        },
        required: [true, "Blood group is required"],
    },
    presentAddress: {
        type: String,
        trim: true,
        required: [true, "Present address is required"],
    },
    permanentAddress: {
        type: String,
        trim: true,
        required: [true, "Permanent address is required"],
    },
    guardian: {
        type: guardianSchema,
        required: [true, "Guardian details are required"],
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, "Local guardian details are required"],
    },
    profileImg: {
        trim: true,
        type: String,
    },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicSemester",
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicDepartment",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
        virtuals: true,
    },
});
// vartual
studentSchema.virtual("fullName").get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
// creating custom statics
// query mddleware
studentSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// aggregarion
studentSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
studentSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Student.findOne({ id });
        return existingUser;
    });
};
exports.Student = (0, mongoose_1.model)("Student", studentSchema);
