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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("./student.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const getAllStudentFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.find()
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicfaculty",
        },
    })
        .populate("admissionSemester");
    return result;
});
const getSingleStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findOne({ id })
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicfaculty",
        },
    })
        .populate("admissionSemester");
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.findOne({ id });
    const isStudentExists = yield student_model_1.Student.findOne({ id });
    if (!isUserExists || !isStudentExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Id Not Found");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deleteStudent = yield student_model_1.Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteStudent) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete student");
        }
        const deleteUsers = yield user_model_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteUsers) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete student");
        }
        yield session.commitTransaction();
        yield session.endSession();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete student");
    }
});
const updateStudentIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  destructuring
    const { name, guardian, localGuardian } = payload, remainingStudentInfo = __rest(payload, ["name", "guardian", "localGuardian"]);
    // store the default premetive value in a object
    const modifiedUpdatedData = Object.assign({}, remainingStudentInfo);
    // check non premitive data and if exist then convert it to the object
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }
    // save data in database
    const result = yield student_model_1.Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.StudentServices = {
    getAllStudentFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentIntoDB,
};
