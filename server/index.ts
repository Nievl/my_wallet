import express from "express";
import morgan from "morgan";
const port = 3000;

const app = express();

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("this is server");
});
app.use((req, res) => {
  res.status(404);
  res.send("unknown address");
});

app.listen(port || 3000, () => console.log(`server start on ${port}`));
