import { ZodError } from "zod";

const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "fail",
      message: "Validation error",
      errors: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Handle your AppError
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      details: err.details || null,
    });
  }

  // For programming or unknown errors
  console.error("ERROR 💥", err);
  res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

export default globalErrorHandler;
