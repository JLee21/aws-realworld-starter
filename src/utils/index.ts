import * as Errors from "./errors";
import * as Dynamo from "./dynamo-table";
import * as Logging from "./logging";

function getEnvVar(name: string, defaults?: any): string {
  let value = defaults ? defaults[name] : "";
  if (process.env[name]) {
    let msg = `Getting key, ${name}, from environmental variable with value, ${process.env[name]}`;
    if (value) {
      msg += `; overriding ${value}`;
    }
    Logging.Logger.info(msg);
    value = process.env[name];
  }
  return value;
}

function safeJsonParse<T>(input: string): T | undefined {
  try {
    return JSON.parse(input);
  } catch (err) {
    Logging.Logger.error(`[Utils.safeJsonParse] error - ${err}`);
  }
  return undefined;
}

const ErrorGenerators = {
  requestValidation: Errors.LambdaError.requestValidationError,
  requestUnauthorizedError: Errors.LambdaError.requestUnauthorizedError,
  requestForbiddenError: Errors.LambdaError.requestForbiddenError,
  notFound: Errors.LambdaError.notFound,
  internalError: Errors.LambdaError.internalError,
  putDataFailed: Errors.LambdaError.putDataFailed,
  deleteDataFailed: Errors.LambdaError.deleteDataFailed
};

export { ErrorGenerators, Errors, Dynamo, getEnvVar, safeJsonParse };
