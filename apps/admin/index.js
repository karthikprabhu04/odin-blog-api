import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// When user visits /admin → show login.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

const port = 3001;
app.listen(port, () => console.log("Admin running on port", port));
