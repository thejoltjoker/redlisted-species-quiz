const { app } = require("@azure/functions");
const {
  INaturalistClient,
} = require("../../services/iNaturalist/INaturalistClient.js");

app.http("id", {
  methods: ["GET"],
  route: "id/{query}",
  authLevel: "anonymous",
  handler: async (request, context) => {
    // context.log(`Http function processed request for url "${request.url}"`);
    // context.log(request.params.query);

    const query = request.params.query;
    // return { body: `Hello, ${name}!` };
    const inat = new INaturalistClient();
    context.log(`[/id] Getting iNaturalist ID for ${query}`);
    try {
      return { jsonBody: await inat.getIdFromScientificName(query) };
    } catch (error) {
      context.error(error);
      return { jsonBody: {} };
    }

    //   .then((response) => {
    //     console.log(response);
    //     return { body: { response } };
    //   })
    //   .catch((error) => {
    //     // context.error(error);
    //     // return { body: error };
    //   });
  },
});
