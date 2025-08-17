// app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRoute from "./routes/userRouter.js";
import orderRoute from "./routes/orderRoutes.js";
import portfolioRoute from "./routes/portFolioRoutes.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./utils/gobalErrorHandler.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(morgan("dev")); // logs incoming requests

// Example route

app.use("/api/v1/users", userRoute);
app.use("/api/v1/stocks", orderRoute);
app.use("/api/v1/portfolio", portfolioRoute);
//fix this ye error derha h
// app.all("/.*/", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);
// Export the app for use in server.js
export default app;
