import cors from "cors";
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import { createServer } from "http";
// import { Server } from "socket.io";
dotenv.config();

import connectDb from "./db";
import authRouter from "./routes/auth";
import roleRouter from "./routes/role";
import { RaiseError } from "./utils/error";
import { RaiseSuccess } from "./utils/success";

type Data = {
	success: boolean;
	status: number;
	message?: string;
	data?: any;
};

const app: Express = express();

app.use(cors({ origin: "http://localhost:4200", credentials: true }));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/role", roleRouter);

app.use(
	(
		result: RaiseError & RaiseSuccess,
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const data = {} as Data;
		data.success = [200, 201, 204].some(
			(statusCode) => statusCode === result.statusCode
		);
		data.status = result.statusCode;
		if (result.message !== "") data.message = result.message;
		if (result.data) data.data = result.data;
		return res.status(result.statusCode).json(data);
	}
);

const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:4200",
//     methods: ["GET", "PUT", "POST", "DELETE"]
//   }
// });

// io.on("connection", (socket) => {
// 	eventEmitter.on("data_changed", () => {
// 		socket.emit("update");
// 	});
// });

connectDb()
	.then(() => {
		httpServer.listen(3000, (): void => {
			console.log("listening on http://localhost:3000");
		});
	})
	.catch((result) => console.log(result));
