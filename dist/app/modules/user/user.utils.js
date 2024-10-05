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
const user_model_1 = require("./user.model");
const findLastStudentID = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudentID = yield user_model_1.User.findOne({ role: "student" }, { id: 1, _id: -1 })
        .sort({ createdAt: -1 })
        .lean();
    return (lastStudentID === null || lastStudentID === void 0 ? void 0 : lastStudentID.id) ? lastStudentID === null || lastStudentID === void 0 ? void 0 : lastStudentID.id : undefined;
});
const genarateUserId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudentId = yield findLastStudentID();
    const studentId = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(6);
    let currentId = studentId || (0).toString();
    const lastStudentSemesterCode = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(4, 6);
    const currentStudentSemesterCode = payload.code;
    const lastStudentSemesterYear = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(0, 4);
    const currentStudentSemesterYear = payload.year;
    if (lastStudentId &&
        lastStudentSemesterCode === currentStudentSemesterCode &&
        currentStudentSemesterYear === lastStudentSemesterYear) {
        currentId = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(6);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
});
exports.default = genarateUserId;
