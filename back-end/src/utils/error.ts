export interface RaiseError extends Error {
	statusCode: number;
	message: string;
}

export const raiseError = (errorCode: number, errorMessage: string) => {
	const err = new Error() as RaiseError;
	err.statusCode = errorCode;
	err.message = errorMessage;
  return err;
};
