import { AMQPClient } from "@cloudamqp/amqp-client";

export async function startConsumer() {
  //Setup a connection to the RabbitMQ server
  const cloudAMQPURL = process.env.CLOUDAMQP_URL as string;
  const amqp = new AMQPClient(cloudAMQPURL);
  console.log("[🐇] Connecting to AMQP server");
  await amqp.connect();
  const channel = await amqp.channel();

  console.log("[✅] Connection over channel established");

  const q = await channel.queue(
    "emails.notifications.stream",
    { durable: true },
    {
      "x-queue-type": "stream",
      "x-max-length-bytes": 10000000,
      "x-stream-max-segment-size-bytes": 1000000,
      "x-initial-cluster-size": 3,
    }
  );

  let counter = 0;

  await channel.basicQos(1, undefined, false);

  const consumer = await q.subscribe(
    { noAck: false, args: { "x-stream-offset": "last" } },
    async (msg) => {
      try {
        console.log(
          `[📤] Message (${++counter}) received at ${new Date().toLocaleString(
            "en-gb"
          )}`,
          JSON.parse(msg.bodyToString()!)
        );
        await new Promise((res) =>
          setTimeout(() => {
            msg.ack();
            res;
          }, 20000)
        );
      } catch (error) {
        console.error(error);
      }
    }
  );

  //When the process is interrupted, close the connection
  process.on("SIGINT", async () => {
    await consumer.cancel();
    await channel.close();
    await amqp.close();
    console.log("[❎] Connection closed");
    process.exit(0);
  });
}
