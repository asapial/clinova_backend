import { Router } from "express";
import { specialtiesController } from "./specialties.controller";

const router=Router();



router.get("/",specialtiesController.getAllSpecialties)
router.post("/",specialtiesController.createSpecialty);
router.put("/:id",specialtiesController.updateSpecialty);
router.delete("/:id",specialtiesController.deleteSpecialty);





export const specialtiesRoute=router;