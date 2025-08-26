import { subscriber } from "./utils/redisClient.js";

async function consumeStockUpdates() {
  await subscriber.subscribe("stock-prices", (message) => {
    try {
      const data = JSON.parse(message);

      //  Case 1: Batch (Array of stocks)
      if (Array.isArray(data)) {
        data.forEach((stock) => {
          handleStockUpdate(stock);
        });
      } 
      //  Case 2: Single stock object
      else {
        handleStockUpdate(data);
      }

    } catch (err) {
      console.error("Error parsing stock update:", err);
    }
  });

  console.log(" Subscribed to stock-prices channel");
}

function handleStockUpdate(stock) {
  console.log(
    `🔔 ${stock.symbol} | Price: ${stock.price} | Time: ${stock.timeStamp}`
  );

 


consumeStockUpdates();
