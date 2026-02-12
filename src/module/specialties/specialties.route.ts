import { Router } from "express";
import { specialtiesController } from "./specialties.controller";

const router=Router();



router.get("/",specialtiesController.getAllSpecialties)
router.post("/",specialtiesController.createSpecialty);





export const specialtiesRoute=router;