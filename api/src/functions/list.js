const { app } = require("@azure/functions");
const {
  TaxonomyClient,
} = require("../../services/artdatabanken/TaxonomyClient.js");

app.http("list", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "list/{conservationListId}",
  handler: async (request, context) => {
    const outputFields =
      request.query.get("outputFields") ||
      "id,scientificname,swedishname,englishname";
    const conservationListId = request.params.conservationListId;
    const client = new TaxonomyClient(process.env.TAXON_PRIMARY);
    const response = await client.getTaxonList(
      conservationListId,
      outputFields.split(",")
    );
    return { jsonBody: response };
  },
});
