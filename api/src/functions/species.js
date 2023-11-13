const { app } = require("@azure/functions");

app.http("species", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "species/{taxonId}",
  handler: async (request, context) => {
    const taxonId = request.params.taxonId;
    const taxonCategories = request.query.get("taxonCategories");
    const client = new TaxonomyClient(process.env.TAXON_PRIMARY);
    // Fetch all species based on the specified taxonId and taxonCategories
    // let response;
    // if (taxonCategories) {
    //   response = await client.getFilteredSelectedTaxa(
    //     taxonId,
    //     taxonCategories.split(",")
    //   )else{

    //   }
    // }
  },
});
