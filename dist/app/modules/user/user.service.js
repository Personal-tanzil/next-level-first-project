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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const config_1 = __importDefault(require("../../config"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = __importDefault(require("./user.utils"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const createStudentIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    //  if password not givent then use default password
    userData.password = password || config_1.default.default_password;
    //   set student role
    userData.role = "student";
    // get semester
    const academicSemester = yield academicSemester_model_1.AcademicSemester.findById(payload.admissionSemester);
    // set userid dynamicly
    userData.id = yield (0, user_utils_1.default)(academicSemester);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield user_model_1.User.create([userData], { session });
        //   create student
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Faield To Create User");
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; // reference id
        const newStudent = yield student_model_1.Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Faield To Create Student");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Faield To Create Student");
    }
});
exports.UserService = {
    createStudentIntoDB,
};
