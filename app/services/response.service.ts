import Express from 'express';

const _sendResponse = (res: Express.Response, status: number, code: string, data: any) => {
  return res
    .status(status)
    .set('CODE', code)
    .json(data)
};

export class Response {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string) {
    this.status = status;
    this.code = code;
  }

  send = (res: Express.Response, data?: any,) => _sendResponse(
    res,
    this.status,
    this.code,
    data,
  );
}

export class ResponseError extends Error {
  readonly response: Response;
  readonly data: any;
  constructor(response: Response, data?: any, stack?: string) {
    super('ResponseError occured');
    super.stack = stack;
    this.data = data;
    this.response = response;
  }
}

export const genericResponse = {
  success: new Response(200, 'Success'),
  created: new Response(201, 'Created'),
  badRequest: new Response(400, 'Bad-Request'),
  unauthorized: new Response(401, 'Unauthorized'),
  forbidden: new Response(403, 'Forbidden'),
  notFound: new Response(404, 'Not-Found'),
  conflict: new Response(409, 'Conflict'),
  internalServerError: new Response(500, 'Internal-Server-Error'),
}

export const userResponse = {
  created: new Response(201, 'Created'),
  usernameAlreadyExists: new Response(409, 'Username-Already-Exists'),
  invalidPassword: new Response(400, 'Invalid-Password'),
  notFound: new Response(404, 'Not-Found'),
  invalidToken: new Response(404, 'Not-Found'),
}

export const otherResponse = {
  noEndPoint: new Response(404, 'No-End-Point'),
  badData: new Response(400, 'Bad-Data'),
}