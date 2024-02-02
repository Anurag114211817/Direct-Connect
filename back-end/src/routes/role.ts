import { Router } from "express";
import { createRole, deleteRole, getAllRoles, updateRole } from "../controllers/role.controller";

const router = Router();

router.get("/get-all-roles", getAllRoles);

router.post("/create", createRole);

router.put("/update/:id", updateRole);

router.delete("/delete/:id", deleteRole);

export default router;
