export interface HttpResponseModel<T> {
  message: string;
  status: string;
  code: 200;
  data: T;
  timeRes: Date;
  method: string;
}
