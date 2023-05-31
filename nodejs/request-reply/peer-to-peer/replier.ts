import createReply from "./create-reply.js";
import type { Request } from "./types.js";

const registerReplyHandler = createReply(process);
registerReplyHandler(
  (data: Request["data"]) =>
    new Promise((resolve) => {
      setTimeout(() => resolve({ sum: data.a + data.b }), data.delayMs);
    })
);

// event is awaited by 'once' to make sure child process ready to handle messages
process.send!("ready");

export { };

