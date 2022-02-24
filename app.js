const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// const mongoConnectionString = process.env.DB_URI;
const mongoConnectionString =
  "mongodb+srv://john:john@cluster0.a0fgx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  //"mongodb://localhost:27017/schoolbag";
//should change the database name
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

// cors
app.use(cors());
app.use(express.json());

//mongoose connecting
mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const con = mongoose.connection;

con.on("open", () => {
  console.log("Database connected");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const instituteRouter = require("./QuizService/routes/institute");
const subjectRouter = require("./QuizService/routes/subject");
const quizRouter = require("./QuizService/routes/examPaper");
const streamRouter = require("./QuizService/routes/stream");
const userRoutes = require("./AuthService/routes/userRoutes");
const resetPassword = require("./AuthService/routes/resetRoutes");
const forgetPasswordRoutes = require("./AuthService/routes/forgetPasswordRoutes");
const checkIdentity = require("./AuthService/routes/checkIdentity");
app.use("/institute", instituteRouter);
app.use("/subject", subjectRouter);
app.use("/quiz", quizRouter);
app.use("/stream",streamRouter);
app.use("/auth", userRoutes);
app.use("/account", resetPassword);
app.use("/forget-password", forgetPasswordRoutes);
app.use("/check-identity", checkIdentity);

app.listen(9000, () => {
  console.log("Server started at 9000");
});
