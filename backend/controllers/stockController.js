import { CatchAsync } from "../utils/catchAsync.js";
import prisma from "../config/prismaClient.js"; // Prisma client instance

import Fuse from "fuse.js";
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

export const searchStocks = async (req, res) => {
  try {
    const { search } = req.params;
    if (!search) {
      return res.status(400).json({ message: "Query is required" });
    }

    // 1. Fetch all stocks (cache this in production)
    const stocks = await prisma.stock.findMany({
      select: { id: true, symbol: true, companyName: true },
    });

    // 2. Setup Fuse.js
    const fuse = new Fuse(stocks, {
      keys: ["companyName", "symbol"],
      threshold: 0.3, // lower = stricter matching
    });

    // 3. Search
    const result = fuse.search(search).slice(0, 10); // top 10

    res.json(result.map((r) => r.item));
  } catch (error) {
    res.status(500).json({ message: "Error searching stocks", error });
  }
};
