import { connect } from "mongoose";

const dbUri = process.env.MONGO_URL;

const connectToDB = async () => {
	try {
		await connect(dbUri!);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", (error as Error).message);
	}
};

export default connectToDB;
