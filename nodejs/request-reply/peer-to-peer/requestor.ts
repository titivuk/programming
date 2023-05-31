import { fork } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import createRequest from "./create-request.js";
import { once } from "events";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const channel = fork(join(__dirname, "replier.ts"));

  try {
    const [message] = await once(channel, "message");
    console.log("Child process initialized", message);

    const request = createRequest(channel);

    const r1 = request({ a: 1, b: 2, delayMs: 2e3 }).then((result) =>
      console.log("Reply:", result)
    );
    const r2 = request({ a: 3, b: 4, delayMs: 5e3 }).then((result) =>
      console.log("Reply:", result)
    );

    await Promise.all([r1, r2]);
  } catch (err) {
  } finally {
    channel.disconnect();
  }
}

main().catch(console.error);

export {};
