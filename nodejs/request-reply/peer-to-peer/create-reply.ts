import type { Reply, Request } from "./types.js";

export default function createReply(channel: NodeJS.Process) {
  return function registerHandler(
    handler: (data: Request["data"]) => Promise<Reply["data"]>
  ) {
    channel.on("message", async (requestMessage: Request) => {
      if (requestMessage.type !== "request") {
        console.log("Unknown request", JSON.stringify(requestMessage, null, 2));
        return;
      }

      const data = await handler(requestMessage.data);
      const replyMessage: Reply = {
        type: "reply",
        correlationId: requestMessage.correlationId,
        data,
      };

      // we use child_process so send is defined
      channel.send!(replyMessage);
    });
  };
}
