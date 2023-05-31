import { AMQPRequest } from "./request.js";

const request = new AMQPRequest();

try {
  await request.init();

  const r1 = request
    .send("requests_queue", { data: { a: 1, b: 2 } })
    .then((result) => console.log("Reply:", result));
  const r2 = request
    .send("requests_queue", { data: { a: 3, b: 4 } })
    .then((result) => console.log("Reply:", result));

  await Promise.all([r1, r2]);
} catch (error) {
} finally {
  await request.destroy();
}
