import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import RateLimit from "express-rate-limit";
import INaturalistClient from "./services/iNaturalist/INaturalistClient.js";
import TaxonomyClient from "./services/artdatabanken/TaxonomyClient.js";
import ArtfaktaClient from "./services/artdatabanken/ArtfaktaClient.js";

dotenv.config();

// Initialize the express app
const app = express();
const port = process.env.PORT;

// Set up rate limiter: maximum of twenty requests per minute
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
});
// Apply rate limiter to all requests
// app.use(limiter);
// Setup cors and helmet
app.use(cors());
app.use(helmet());

// Use JSON
app.use(express.json());

// Ping api
app.get("/ping", (req, res) => {
  res.json({ response: "I'm awake!" });
});

// Get iNaturalist ID
app.get("/id/:query", async (req, res) => {
  const inat = new INaturalistClient();
  console.log(`[/id] Getting iNaturalist ID for ${req.params.query}`);
  inat
    .getIdFromScientificName(req.params.query)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      next(error);
    });
});
// Get iNaturalist ID
app.get("/taxa/:ids", async (req, res) => {
  const client = new INaturalistClient();
  console.log(req.params.ids.split(","));
  console.log(`[/taxa] Getting taxa for ${req.params.ids}`);
  client
    .getTaxa(req.params.ids.split(","))
    .then((response) => {
      res.json({ data: response });
    })
    .catch((error) => {
      next(error);
    });
});

// Get species
app.get("/species/:taxonId", async (req, res) => {
  console.log(
    `[/species] Getting species that are children of ${req.params.taxonId}`
  );
  // Extract taxonId from request parameters
  const taxonId = req.params.taxonId;

  // Create a new instance of TaxonomyClient
  const client = new TaxonomyClient(process.env.TAXON_PRIMARY);

  // Fetch all species based on the specified taxonId and taxonCategories
  const allSpecies = await client.getFilteredSelectedTaxa(taxonId, [17]); // 17 = Art

  // Filter out species without Swedish names
  const allSpeciesSwedishNames = allSpecies.filter(
    (species) => species.swedishName
  );

  // Extract all species IDs with Swedish names
  const allIds = allSpeciesSwedishNames.map((i) => i.id);

  // Fetch redlisted species based on the conservation list ID and output fields
  const redlistedTaxonResponse = await client.getTaxonList(
    227, // 227 = Rödlistade arter
    ["id", "scientificname", "swedishname"]
  );

  // Extract taxon information for redlisted species
  const redlistedSpecies =
    redlistedTaxonResponse.natureConservationListTaxa[0].taxonInformation;

  // Filter redlisted species based on the IDs of all species with Swedish names
  const filteredRedlistSpecies = redlistedSpecies.filter((item) =>
    allIds.includes(item.id)
  );

  // Extract IDs of redlisted species
  const redlistedIds = redlistedSpecies.map((i) => i.id);

  // Separate species into redlisted and not redlisted categories
  const redlisted = filteredRedlistSpecies;
  const notRedlisted = allSpeciesSwedishNames.filter(
    (item) => !redlistedIds.includes(item.id)
  );

  // Return an array containing not redlisted and redlisted species
  res.json({ redlisted: redlisted, notRedlisted: notRedlisted });
});

// Get species data
app.get("/speciesdata/:taxonId", async (req, res) => {
  console.log(`[/speciesdata] Getting species data for ${req.params.taxonId}`);
  const taxonId = req.params.taxonId;
  try {
    const client = new ArtfaktaClient(process.env.PRIMARY_KEY);
    const response = await client.getSpeciesData(taxonId);
    res.json({ data: response });
  } catch (error) {
    next(error);
  }
});

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
export const { ping } = require("./src/functions/ping");
