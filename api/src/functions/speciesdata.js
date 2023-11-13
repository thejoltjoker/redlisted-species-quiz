const { app } = require("@azure/functions");
const {
  ArtfaktaClient,
} = require("../../services/artdatabanken/ArtfaktaClient.js");

app.http("speciesdata", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "speciesdata/{taxonId}",
  handler: async (request, context) => {
    const taxonId = request.params.taxonId;
    console.log(`[/speciesdata] Getting species data for ${taxonId}`);
    try {
      const client = new ArtfaktaClient(process.env.PRIMARY_KEY);
      const response = await client.getSpeciesData(taxonId);
      return { jsonBody: response };
    } catch (error) {
      context.error(error);
      return { jsonBody: {} };
    }
  },
});
