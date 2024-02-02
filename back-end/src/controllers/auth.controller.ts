import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import Role from "../models/Role";
import User from "../models/User";
import { raiseError } from "../utils/error";

export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const role = await Role.find({ role: "User" });
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		const newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			email: req.body.email,
			password: hashPassword,
			isAdmin: false,
			roles: role,
		});
		await newUser.save();
		return next(raiseError(200, "User Created!!"));
	} catch (error) {
		return next(raiseError(500, "Internal Server Error"));
	}
};

export const loginUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await User.findOne({ email: req.body.email }).populate(
			"roles",
			"role"
		);
		if (!user) return next(raiseError(404, "No User Found!!"));
		const check = await bcrypt.compare(req.body.password, user.password);
		if (!check) return next(raiseError(403, "Password is Incorrect!!"));
		const jwtSecret = process.env.JWT_SECRET;
		const refreshSecret = process.env.JWT_REFRESH_SECRET;

		const token = sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
				roles: user.roles,
			},
			jwtSecret!,
			{
				expiresIn: "24h",
			}
		);

		const refreshToken = sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
				roles: user.roles,
			},
			refreshSecret!,
			{
				expiresIn: "1y",
			}
		);

		return res
			.cookie("access_token", token, { httpOnly: true })
			.cookie("refresh_token", refreshToken, { httpOnly: true })
			.status(200)
			.json({
				success: true,
				message: "Login Successful",
				data: {
					_id: user._id
				},
			});
	} catch (error) {
		return next(raiseError(500, "Internal Server Error"));
	}
};

export const refreshAuthToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await User.findOne({ email: req.body.email }).populate(
			"roles",
			"role"
		);
		if (!user) return next(raiseError(404, "No User Found!!"));
		const jwtSecret = process.env.JWT_SECRET;
		const refreshSecret = process.env.JWT_REFRESH_SECRET;

		const token = sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
				roles: user.roles,
			},
			jwtSecret!,
			{
				expiresIn: "24h",
			}
		);

		const refreshToken = sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
				roles: user.roles,
			},
			refreshSecret!,
			{
				expiresIn: "1y",
			}
		);

		return res
			.cookie("access_token", token, { httpOnly: true })
			.cookie("refresh_token", refreshToken, { httpOnly: true })
			.status(200)
			.json({
				success: true,
				message: "Login Successful",
				data: {
					_id: user._id
				},
			});
	} catch (error) {
		return next(raiseError(500, "Internal Server Error"));
	}
};
