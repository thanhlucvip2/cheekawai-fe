export interface HttpResponseModel<T> {
  message: string;
  status: string;
  code: number;
  data: T;
  timeRes: Date;
  method: string;
}
