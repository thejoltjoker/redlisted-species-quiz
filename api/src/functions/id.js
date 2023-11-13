const { app } = require("@azure/functions");
const {
  INaturalistClient,
} = require("../../services/iNaturalist/INaturalistClient.js");
// import TaxonomyClient from "./services/artdatabanken/TaxonomyClient.js";
// import ArtfaktaClient from "./services/artdatabanken/ArtfaktaClient.js";

app.http("id", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`[/id] Getting iNaturalist ID for ${req.params.query}`);
    const client = new INaturalistClient();

    client
      .getIdFromScientificName(request.query.get("id"))
      .then((response) => {
        return response;
      })
      .catch((error) => {
        next(error);
      });
  },
});
