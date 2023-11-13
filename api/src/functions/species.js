const { app } = require("@azure/functions");
const {
  TaxonomyClient,
} = require("../../services/artdatabanken/TaxonomyClient.js");

app.http("species", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "species/{taxonId}",
  handler: async (request, context) => {
    const taxonId = request.params.taxonId;
    const taxonCategories = request.query.get("taxonCategories");
    context.log(taxonCategories);
    const client = new TaxonomyClient(process.env.TAXON_PRIMARY);

    let response;
    if (taxonCategories) {
      // Fetch all species based on the specified taxonId and taxonCategories
      response = await client.getFilteredSelectedTaxa(
        taxonId,
        taxonCategories.split(",")
      );
    } else {
      response = await client.getChildIds(taxonId);
    }

    return { jsonBody: response };
  },
});
