export interface RaiseSuccess {
	statusCode: number;
	message: string;
	data: any;
}

export const raiseSuccess = (statusCode: number, message: string, data: any = null) => {
	return { statusCode, message, data } as RaiseSuccess;
};
