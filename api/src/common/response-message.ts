export class ResponseMessage {
  statusCode: number;
  message: string | Array<string>;
  error?: string;
  data?: object;
}