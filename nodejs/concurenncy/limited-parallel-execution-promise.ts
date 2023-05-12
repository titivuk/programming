type Task<T = any> = (...args: unknown[]) => Promise<T>;

// Concurrency queue runs tasks in parallel and returns result independently
class ConcurrencyQueue {
  private concurrency: number;
  private _running: number = 0;
  private tasks: Task[] = [];

  constructor(concurrency: number) {
    if (!Number.isInteger(concurrency) || concurrency < 1) {
      throw new Error("Concurrency must be at least 1");
    }

    this.concurrency = concurrency;
  }

  // Setters and getters are used only for debug purposes
  private set running(value: number) {
    this._running = value;
    console.log(this._running);
  }

  // Setters and getters are used only for debug purposes
  private get running() {
    return this._running;
  }

  public runTask<T>(task: Task<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const taskWrapper = () => {
        this.running++;
        return task()
          .then(resolve, reject)
          .finally(() => {
            this.running--;
            this.checkQueue();
          });
      };

      // If we have capacity to run a task, run it immediately
      if (this.running < this.concurrency) {
        return taskWrapper();
      }

      // Otherwise, add it to the queue
      return this.tasks.push(taskWrapper);
    });
  }

  private checkQueue() {
    if (this.tasks.length === 0 || this.running === this.concurrency) {
      return;
    }

    this.tasks.shift()!();
  }
}

// const q = new ConcurrencyQueue(2);

// q.runTask(
//   () => new Promise((resolve) => setTimeout(() => resolve("Task 1"), 1000))
// ).then((result) => console.log(`${result} finished`));
// q.runTask(
//   () => new Promise((resolve) => setTimeout(() => resolve("Task 2"), 1000))
// ).then((result) => console.log(`${result} finished`));
// q.runTask(
//   () => new Promise((resolve) => setTimeout(() => resolve("Task 3"), 1000))
// ).then((result) => console.log(`${result} finished`));
// q.runTask(
//   () => new Promise((resolve) => setTimeout(() => resolve("Task 4"), 1000))
// ).then((result) => console.log(`${result} finished`));
// q.runTask(
//   () => new Promise((resolve) => setTimeout(() => resolve("Task 5"), 1000))
// ).then((result) => console.log(`${result} finished`));
// q.runTask(
//   () => new Promise((resolve) => setTimeout(() => resolve("Task 6"), 1000))
// ).then((result) => {
//   console.log(`${result} finished`);

//   // let queue another task when everything is done

//   setTimeout(() => {
//     console.log("super long task enqueued");
//     q.runTask(
//       () =>
//         new Promise<string>((resolve) => setTimeout(() => resolve("Task 7")))
//     ).then((result) => {
//       console.log("super long task enqueued");
//       console.log(`${result} finished`);
//     });
//   }, 5e3);
// });

// q.runTask(
//   () =>
//     new Promise((resolve, reject) =>
//       setTimeout(() => reject(new Error("Task 1")), 5000)
//     )
// )
//   .then((result) => console.log(`${result} finished`))
//   .catch((err) => console.log(`${err.message} failed`));
// q.runTask(
//   () =>
//     new Promise((resolve, reject) =>
//       setTimeout(() => reject(new Error("Task 2")), 1000)
//     )
// )
//   .then((result) => console.log(`${result} finished`))
//   .catch((err) => console.log(`${err.message} failed`));
// q.runTask(
//   () =>
//     new Promise((resolve, reject) =>
//       setTimeout(() => reject(new Error("Task 3")), 1000)
//     )
// )
//   .then((result) => console.log(`${result} finished`))
//   .catch((err) => console.log(`${err.message} failed`));
// q.runTask(
//   () =>
//     new Promise((resolve, reject) =>
//       setTimeout(() => reject(new Error("Task 4")), 1000)
//     )
// )
//   .then((result) => console.log(`${result} finished`))
//   .catch((err) => console.log(`${err.message} failed`));
// q.runTask(
//   () =>
//     new Promise((resolve, reject) =>
//       setTimeout(() => reject(new Error("Task 5")), 1000)
//     )
// )
//   .then((result) => console.log(`${result} finished`))
//   .catch((err) => console.log(`${err.message} failed`));
