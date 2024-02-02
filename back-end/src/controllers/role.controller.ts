import { NextFunction, Request, Response } from "express";
import Role, { RoleSchema } from "../models/Role";
import { raiseError } from "../utils/error";
import { raiseSuccess } from "../utils/success";

export const createRole = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		if (req.body.role && req.body.role !== "") {
			const newRole = new Role(req.body);
			await newRole.save();
			return next(raiseSuccess(200, "Role created!!"));
		} else {
			return next(raiseError(400, "Bad Request!!"));
		}
	} catch (error) {
		    return next(raiseError(500, 'Internal Server Error'))
	}
};

export const updateRole = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const role: RoleSchema | null = await Role.findById({ _id: req.params.id });
		if (role) {
			const newRole = Role.findByIdAndUpdate(
				req.params.id,
				{ $set: req.body },
				{ new: true }
			);
			return next(raiseSuccess(200, "Role Updated!!"));
		} else {
			return next(raiseError(404, "Role Not Found!!"));
		}
	} catch (error) {
		    return next(raiseError(500, 'Internal Server Error'))
	}
};

export const getAllRoles = async (
	_req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const roles: RoleSchema[] | null = await Role.find();
		return next(raiseSuccess(200, "", { count: roles.length, roles }));
	} catch (error) {
		    return next(raiseError(500, 'Internal Server Error'))
	}
};

export const deleteRole = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const role: RoleSchema | null = await Role.findById({ _id: req.params.id });
		if (role) {
			await Role.findByIdAndDelete({ _id: req.params.id });
			return next(raiseSuccess(200, "Role Deleted!!"));
		} else {
			return next(raiseError(404, "Role Not Found!!"));
		}
	} catch (error) {
		    return next(raiseError(500, 'Internal Server Error'))
	}
};
