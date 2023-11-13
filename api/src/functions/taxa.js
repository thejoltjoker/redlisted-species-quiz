const { app } = require("@azure/functions");
const {
  INaturalistClient,
} = require("../../services/iNaturalist/INaturalistClient.js");

app.http("taxa", {
  methods: ["POST"],
  route: "taxa/{ids}",
  authLevel: "anonymous",
  handler: async (request, context) => {
    const ids = request.params.ids;
    const client = new INaturalistClient();
    context.log(`[/taxa] Getting taxa for ${ids}`);
    try {
      return {
        jsonBody: { data: await client.getTaxa(ids.split(",")) },
      };
    } catch (error) {
      context.error(error);
      return { jsonBody: {} };
    }
  },
});
