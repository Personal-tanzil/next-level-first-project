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
    const newUser = yield user_model_1.User.create(userData);
    //   create student
    if (Object.keys(newUser).length) {
        payload.id = newUser.id;
        payload.user = newUser._id; // reference id
        const newStudent = yield student_model_1.Student.create(payload);
        return newStudent;
    }
    return newUser;
});
exports.UserService = {
    createStudentIntoDB,
};
