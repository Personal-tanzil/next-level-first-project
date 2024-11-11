import { TErrorSources, TGenericErrorResponse } from "../interface/error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const regex = /name:\s*"([^"]*)"/;

  // Match the regular expression against the error message
  const match = err.message.match(regex);
  const extractedMessage = match && match[1];

  const statusCode = 400;
  const errorSources: TErrorSources = [
    {
      path: "",
      message: `Duplicate ${extractedMessage}`,
    },
  ];

  return {
    statusCode,
    errorSources,
    message: "Validation Error",
  };
};

export default handleDuplicateError;
