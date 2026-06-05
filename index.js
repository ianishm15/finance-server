import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully 🚀",
  });
});


/* ROUTES */
app.use("/api", kpiRoutes);
app.use("/api", productRoutes);
app.use("/api", transactionRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
console.log(process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME ONLY OR AS NEEDED 
     await mongoose.connection.db.dropDatabase();
    await KPI.insertMany(kpis);
    await Product.insertMany(products);
     await Transaction.insertMany(transactions);*/
  })
  .catch((error) => console.log(`${error} did not connect`));
