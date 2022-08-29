export interface MockResponseBase {
  code: number;
  message: string;
  data?: {
    [key: string]: any;
  };
}