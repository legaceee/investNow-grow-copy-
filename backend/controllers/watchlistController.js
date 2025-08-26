import prisma from "../config/prismaClient.js";
import AppError from "../utils/appError.js";
import { CatchAsync } from "../utils/catchAsync.js";

export const watchList = CatchAsync(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    return next(new AppError("You are not logged in", 404));
  }
  const { stockId } = req.body;
  if (!stockId) {
    return next(new AppError("select a stockid", 404));
  }
  const data = await prisma.watchlist.create({
    data: {
      userId,
      stockId,
    },
  });
  res.status(201).json({
    status: "success",
    data,
  });
});
