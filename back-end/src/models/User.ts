import { Document, Schema, model } from "mongoose";

export interface UserSchema extends Document {
	_id?: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	profileImg: string;
	isAdmin: boolean;
	roles: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<UserSchema>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	profileImg: {
		type: String,
		default:
			"https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
	},
	isAdmin: { type: Boolean, default: false },
	roles: {
		type: [Schema.Types.ObjectId],
		required: true,
		ref: 'Role'
	}
}, {timestamps: true});

export default model<UserSchema>("User", UserSchema);
