import "dotenv/config";
import Koa from "koa";
import { startConsumer } from "./ampq-consumer";

const app = new Koa();

const PORT = process.env.PORT || 3000;

startConsumer().catch(console.error);

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}...`));
