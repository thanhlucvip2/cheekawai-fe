export interface PaginationModel {
  fromDate?: string;
  toDate?: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface ResponseDataByPagination<T> {
  pageIndex: string;
  pageSize: string;
  total: number;
  items: T[];
}
