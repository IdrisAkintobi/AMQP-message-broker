import { AMQPQueue } from "@cloudamqp/amqp-client";
import { startPublisher } from "./ampq-publisher";

export interface MessageInterface {
  email: string;
  name: string;
  body: string;
  routingKey: string;
}

class Messenger {
  private queue: Promise<AMQPQueue>;

  constructor() {
    this.queue = startPublisher();
  }

  public async sendToQueue(payload: MessageInterface) {
    const { routingKey, ...data } = payload;
    const jsonMessage = JSON.stringify(data);

    const q = await this.queue;
    await q.publish(jsonMessage, { deliveryMode: 2 });
    console.log("[📥] Message sent to queue", data);
  }
}

export default new Messenger();
