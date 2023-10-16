import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connection to the MongoDB is successful');
}).catch((error) => {
  console.error(error);
  throw new Error(`Unable to connect to the database: ${config.mongoUri}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the DressStore application." });
});

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info("Server started on port %s.", config.port);
});
