declare global {
  namespace Express {
    export interface Request {
      auth?: { id: string; exp: Date; iat: Date };
    }
  }
}

export {};
