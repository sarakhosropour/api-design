import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "hello from server" });
});

app.get("/somepage", (req, res, next) => {
  setTimeout(() => {
    res.status(404);
    next(new Error("Page not found"));
  }, 1000);
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signin);

app.use((err: any, req: any, res: any, next: any) => {
console.log('error:', err);
  res.json({ error: err });
});
export default app;
