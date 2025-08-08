import { CatchAsync } from "../utils/catchAsync.js"; // fixed typo in filename
import pool from "../config/db.js"; // PostgreSQL pool instance

export const getAllStocks = CatchAsync(async (req, res, next) => {
  // Query all stocks from DB
  const result = await pool.query('SELECT * FROM "Stock" ORDER BY id ASC');

  res.status(200).json({
    status: "success",
    results: result.rows.length,
    data: {
      stocks: result.rows,
    },
  });
});

export const getStockBySymbol = CatchAsync(async (req, res, next) => {
  const { symbol } = req.params;

  // Ensure symbol is provided
  if (!symbol) {
    return res.status(400).json({
      status: "fail",
      message: "Stock symbol is required",
    });
  }

  // Query the Stock table
  const result = await pool.query(`SELECT * FROM "Stock" WHERE "symbol" = $1`, [
    symbol.toUpperCase(),
  ]);

  if (result.rows.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: `No stock found with symbol: ${symbol}`,
    });
  }

  res.status(200).json({
    status: "success",
    data: result.rows[0],
  });
});
