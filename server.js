import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import hrRoutes from "./routes/hrRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import forumRoutes from "./routes/forumRoute.js";

//configure env
dotenv.config();

//rest object
const app = express();

// //middelwares

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.static("public"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/", forumRoutes);
app.use("/api/v1/hr", hrRoutes);

export var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      partialsDir: path.resolve(`./views`),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".hbs",
  })
);

const port = process.env.PORT || 8080;
//listen port
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server Running in on port ${port}`);
  });
});
