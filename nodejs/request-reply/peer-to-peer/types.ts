export interface Request {
  type: "request";
  data: { a: number; b: number; delayMs: number };
  correlationId: string;
}

export interface Reply {
  type: "reply";
  data: {
    sum: number;
  };
  correlationId: string;
}
