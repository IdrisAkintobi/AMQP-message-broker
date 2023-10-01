import "dotenv/config";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import messenger, { MessageInterface } from "./messenger";

const app = new Koa();
app.use(bodyParser());

app.use(async function publishMessage(ctx: Koa.Context) {
  if ("POST" === ctx.method && ctx.path === "/publish") {
    const payload = ctx.request.body as MessageInterface;
    await messenger.sendToQueue(payload);
    ctx.body = "Message sent to queue";
  } else {
    ctx.body = "Hello World";
  }
});

app.listen(3003, () => console.log("🚀 Server listening on port 3003..."));
