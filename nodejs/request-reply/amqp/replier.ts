import { Request } from "./types.js";
import { AMQPReply } from "./reply.js";

try {
  const reply = new AMQPReply("requests_queue");
  await reply.init();
  await reply.handleRequests((data: Request["data"]) =>
    Promise.resolve({ sum: data.a + data.b })
  );
} catch (err) {
  console.error("replier err", err);
}
