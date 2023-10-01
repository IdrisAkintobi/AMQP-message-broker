import { AMQPClient } from "@cloudamqp/amqp-client";

export async function startPublisher() {
  //Setup amqp connection to the RabbitMQ server
  const cloudAMQPURL = process.env.CLOUDAMQP_URL as string;
  console.log("[🐇] Connecting to AMQP server...");
  const amqp = new AMQPClient(cloudAMQPURL);
  await amqp.connect();
  const channel = await amqp.channel();

  console.log("[✅] Connection over channel established");

  //Declare the exchange and queue, and create a binding between them
  await channel.exchangeDeclare("emails", "direct");
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
  await q.bind("emails", "notifications");

  //Clean up when we exit the process
  process.on("SIGINT", async () => {
    await q.unbind("emails", "notifications");
    await q.unsubscribe("emails.notifications.stream");
    await q.delete();
    await channel.close();
    await amqp.close();
    console.log("[❎] Connection closed");
    process.exit(0);
  });

  return q;
}
