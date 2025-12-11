import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/post", (req, res) => {
  res.sendFile(path.join(__dirname, "post.html"));
});


// Start server
app.listen(PORT, () => {
  console.log(`Public site running at http://localhost:${PORT}`);
});
