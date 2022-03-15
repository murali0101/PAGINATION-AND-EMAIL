const app = require("./index");
const connect = require("./configs/db");
app.listen(4500, async () => {
  try {
    await connect();
    console.log("listening port 4500")
  } catch (error) {
    console.log("error:", error.message);
  }
});
