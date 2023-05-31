import { ChildProcess } from "node:child_process";
import { randomUUID } from "node:crypto";
import type { Reply, Request } from "./types.js";

export default function createRequest(channel: ChildProcess) {
  const correlationMap = new Map<string, (message: Reply) => void>();
  const timeoutSeconds = 10e3;

  function request(data: Request["data"]) {
    return new Promise((resolve, reject) => {
      const correlationId = randomUUID();
      const requestMessage: Request = {
        type: "request",
        data,
        correlationId,
      };

      channel.send(requestMessage, (err) => {
        if (err) {
          reject(err);
        }

        // start timer which rejects promise
        const timeout = setTimeout(
          () => reject(new Error("Request timeout")),
          timeoutSeconds
        );

        correlationMap.set(correlationId, (replyMessage: Reply) => {
          correlationMap.delete(correlationId);
          clearTimeout(timeout);
          resolve(replyMessage.data);
        });
      });
    });
  }

  channel.on("message", (replyMessage: Reply) => {
    const replyHandler = correlationMap.get(replyMessage.correlationId);
    if (!replyHandler) {
      console.log("Unknown reply", JSON.stringify(replyMessage, null, 2));
      return;
    }

    replyHandler(replyMessage);
  });

  return request;
}
