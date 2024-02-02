import { Document, Schema, model } from "mongoose";

export interface RoleSchema extends Document {
	_id?: string;
	role: string;
}

const RoleSchema = new Schema<RoleSchema>(
	{
		role: { type: String, required: true },
	},
	{ timestamps: true }
);

export default model<RoleSchema>("Role", RoleSchema);
