import amqp from "amqplib";
import { randomUUID } from "crypto";
import { Reply, Request } from "./types.js";

export class AMQPRequest {
  private correlationMap = new Map<string, any>();
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private replyQueue: string = "";

  async init() {
    this.connection = await amqp.connect("amqp://localhost");
    this.channel = await this.connection.createChannel();

    // create queue which will be destroyed when connection is closed
    const { queue } = await this.channel.assertQueue("", { exclusive: true });
    this.replyQueue = queue;

    this.channel.consume(
      this.replyQueue,
      (message) => {
        if (!message) {
          console.log("Unknown reply", JSON.stringify(message, null, 2));
          return;
        }

        const correlationId = message.properties.correlationId;

        const handler = this.correlationMap.get(correlationId);
        if (handler) {
          handler(JSON.parse(message.content.toString()));
        }
      },
      { noAck: true }
    );
  }

  send(queue: string, message: Request) {
    return new Promise((resolve, reject) => {
      const correlationId = randomUUID();
      const timeout = setTimeout(() => {
        this.correlationMap.delete(correlationId);
        reject(new Error("Request timeout"));
      }, 10e3);

      this.correlationMap.set(correlationId, (replyMessage: Reply) => {
        this.correlationMap.delete(correlationId);
        clearTimeout(timeout);
        resolve(replyMessage.data);
      });

      // we send directly to queue because we expect the message to be consumes only once
      this.channel?.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(message)),
        // AMQP provides request/reply out of the box
        {
          correlationId,
          replyTo: this.replyQueue,
        }
      );
    });
  }

  async destroy() {
    await this.channel?.close();
    await this.connection?.close();
  }
}
