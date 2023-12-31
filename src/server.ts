import fastify from "fastify";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";

const app = fastify();

app.register(transactionsRoutes, {
  prefix: "transact",
});

app.listen({ port: env.PORT }).then(() => {
  console.log("Http Server running on port: 3333");
});
