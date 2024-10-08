import express from "express";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

router.post(
  "/create-acadeic-faculty",
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.createAcademicFaculty
);

router.get("/:facultyId", AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.updateAcademicFaculty
);

router.get("/", AcademicFacultyControllers.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;
