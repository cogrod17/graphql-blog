import { Request } from "express";

export interface ReqWithBody<T> extends Request {
  body: T;
}
