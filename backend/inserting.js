import fs from "fs";
const stocks = JSON.parse(fs.readFileSync("./stocks.json", "utf8"));
const updated = stocks.map((stock) => {
  const totalQuantity = Math.floor(Math.random() * 99001) + 1000; // 1,000 to 100,000
  return {
    ...stock,
    totalQuantity,
    marketCap: Number((stock.currentPrice * totalQuantity).toFixed(2)),
  };
});

fs.writeFileSync("./stocks.json", JSON.stringify(updated, null, 2));
