import sj from "stream-json";
import { streamValues } from "stream-json/streamers/StreamValues.js";
import Batch from "stream-json/utils/Batch.js";
import StreamArray from "stream-json/streamers/StreamArray.js";
import { Readable, Transform, TransformCallback } from "stream";
import { pipeline } from "stream/promises";
import { fstat } from "fs";
async function getCars() {
  const r = fetch("https://cars-base.ru/api/cars");
  return r;
}

async function main() {
  const r = await getCars();

  const result = await pipeline(
    Readable.fromWeb(r.body!),
    sj.parser(),
    // StreamValues.streamValues(),
    new StreamArray(),
    new Batch({ batchSize: 5 }),
    new JsonStream()
    // createWriteStream("./ouput.txt")
  );

  console.log(result);
}

class JsonStream extends Transform {
  private len = 0;

  constructor() {
    super({
      objectMode: true,
      //   encoding: "utf-8",
    });
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    this.len += 1;
    console.log(typeof chunk);
    console.log(chunk);
    callback();
  }

  _flush(callback: TransformCallback): void {
    console.log("total objects", this.len);
    callback();
  }
}

main();
