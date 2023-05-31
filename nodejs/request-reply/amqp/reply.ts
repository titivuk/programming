import amqp from "amqplib";
import { Reply, Request } from "./types.js";

export class AMQPReply {
  private channel: amqp.Channel | null = null;
  private queue: string = "";

  constructor(private requestsQueueName: string) {}

  async init() {
    const connection = await amqp.connect("amqp://localhost");
    this.channel = await connection.createChannel();

    // get or create queue for incoming requests
    const { queue } = await this.channel.assertQueue(this.requestsQueueName);
    this.queue = queue;
  }

  async handleRequests(
    handler: (data: Request["data"]) => Promise<Reply["data"]>
  ) {
    this.channel?.consume(this.queue, async (message) => {
      if (!message) {
        console.log("Unknown request", JSON.stringify(message, null, 2));
        return;
      }

      const request: Request = JSON.parse(message.content.toString());
      console.log("Request received", JSON.stringify(request, null, 2));
      // call handler
      const data = await handler(request.data);

      const replyMessage: Reply = {
        data,
      };
      this.channel?.sendToQueue(
        // send message to queue that associated with the requester
        message.properties.replyTo,
        Buffer.from(JSON.stringify(replyMessage)),
        // pass correlationId so requester can map response with request
        { correlationId: message.properties.correlationId }
      );

      this.channel?.ack(message);
    });
  }
}
