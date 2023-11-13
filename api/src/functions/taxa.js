const { app } = require("@azure/functions");
const {
  INaturalistClient,
} = require("../../services/iNaturalist/INaturalistClient.js");

app.http("taxa", {
  methods: ["POST"],
  route: "taxa/{ids}",
  authLevel: "anonymous",
  handler: async (request, context) => {
    // context.log(`Http function processed request for url "${request.url}"`);
    // context.log(request.params.query);

    const ids = request.params.ids;
    context.log(ids);
    // return { body: `Hello, ${name}!` };

    const client = new INaturalistClient();
    context.log(ids.split(","));
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
