const { app } = require("@azure/functions");

app.http("ping", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    // return { body: `Hello, ${name}!` };

    return { jsonBody: { response: "I'm awake!" } };
    // res.json({ response: "I'm awake!" });
  },
});
