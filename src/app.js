import express from "express";
import router from "./routes/products.routes.js";

const app = express();

app.use(express.json());

app.use(router);

export default app;
