import { CatchAsync } from "../utils/catchAsync.js";
import prisma from "../config/prismaClient.js"; // Prisma client instance

// Get all stocks
export const getAllStocks = CatchAsync(async (req, res, next) => {
  const stocks = await prisma.stock.findMany({
    orderBy: { id: "asc" },
  });

  res.status(200).json({
    status: "success",
    results: stocks.length,
    data: {
      stocks,
    },
  });
});

// Get a stock by symbol
export const getStockBySymbol = CatchAsync(async (req, res, next) => {
  const { symbol } = req.params;

  if (!symbol) {
    return res.status(400).json({
      status: "fail",
      message: "Stock symbol is required",
    });
  }

  const stock = await prisma.stock.findUnique({
    where: { symbol: symbol.toUpperCase() },
  });

  if (!stock) {
    return res.status(404).json({
      status: "fail",
      message: `Stock with symbol '${symbol}' not found`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      stock,
    },
  });
});
