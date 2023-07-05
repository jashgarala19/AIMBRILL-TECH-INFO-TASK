import { config } from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
config(); // configure env file
const app: Express = express();
const port = process.env.PORT;
const employeesRouter = require("../routes/employee");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
app.use("/api/v1/employee", employeesRouter);
app.listen(port || 8000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log(process.env.DATABASE_URL);
});
