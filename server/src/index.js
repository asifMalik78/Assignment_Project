const {config} = require("dotenv");
const connectDB = require("./db");
const {app} = require("./app");

config({ path: "./.env" });


const port = process.env.PORT || 8000;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err.message);
  });
