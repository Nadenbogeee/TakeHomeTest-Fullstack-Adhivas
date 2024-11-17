import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import sequelize from "./src/config/database.js";
import path from "path";
import { fileURLToPath } from "url";
import courseRoutes from "./src/routes/courseRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// Database sync dan server start
const PORT = process.env.PORT || 3000;

sequelize
  .sync({ force: false }) 
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
