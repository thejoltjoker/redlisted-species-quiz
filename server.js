import express from "express";
import cors from "cors";
import INaturalistClient from "./src/js/services/iNaturalist/INaturalistClient.js";
// Initialize the express app
const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to search for animals
app.get("/inid/:query", (req, res) => {
  const inat = new INaturalistClient();
  inat
    .getIdFromScientificName(req.query)
    .then((response) => {
      res.json({ result: response });
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
});

app.listen(8080, () => console.log("Listening on port http://localhost:8080"));
