import { FastifyInstance } from "fastify";
import { knexClient } from "../database";
import { z } from "zod";

export async function transactionsRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const createTransactionBody = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });
    const { amount, title, type } = createTransactionBody.parse(request.body);
    await knexClient("transactions").insert({
      id: crypto.randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
    });

    return reply.status(201).send();
  });
}
