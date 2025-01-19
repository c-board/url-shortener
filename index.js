import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes.js";

dotenv.config();
const app = express();

// Debugging middleware
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.options("*", cors()); // Handle preflight

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
